import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "./components/common/Error";
import Loader from "./components/common/Loader";
import UserCard from "./components/UserCard";
import { commonSelector } from "./store/slice/commonSlice";
import { fetchUserList } from "./store/slice/commonSlice";
import ReactPaginate from "react-paginate";

function App() {
  const { isLoading, isError, userList } = useSelector(commonSelector);
  const [userDataSet, setUserDataSet] = useState([]);
  const [filterSeach, setFilterSeach] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [filterSelectOption, setFilterSelectOption] = useState("Country");
  const dispatch = useDispatch();
  console.log(userList);

  useEffect(() => {
    dispatch(fetchUserList(pageNumber));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    setUserDataSet(userList);
  }, [userList]);

  useEffect(() => {
    if (filterSeach) {
      const data = userDataSet.filter((x) =>
        x[filterSelectOption].toLowerCase().includes(filterSeach)
      );
      setUserDataSet(data);
    } else {
      setUserDataSet(userList);
    }
  }, [filterSelectOption, filterSeach]);

  return (
    <div className="App">
      <div className="main-title">Users List</div>
      <div className="user-list">
        <div className="filter-wrapper">
          <div className="filter_dropdown">
            <select
              value={filterSelectOption}
              onChange={(e) => setFilterSelectOption(e.target.value)}
            >
              <option value="Full Name">Name</option>
              <option value="Date of birth">DOB</option>
              <option value="Country">Country</option>
            </select>
          </div>

          <div className="filter_search">
            <input
              type="text"
              placeholder="search here.."
              onChange={(e) => setFilterSeach(e.target.value.toLowerCase())}
            />
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error errorMsg={isError} />
        ) : userDataSet.length === 0 ? (
          "No usersAvailable"
        ) : (
          <div className="cards_wrapper">
            {React.Children.toArray(
              userDataSet.map((user) => <UserCard {...user} />)
            )}
          </div>
        )}
        {userDataSet.length !== 0 ? (
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={100}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={(e) => {
              setPageNumber(e.selected + 1);
            }}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
