import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateLoading(state, { payload }) {
      state.isLoading = payload;
    },
    updateError(state, { payload }) {
      state.isError = payload;
    },
    updateUserList(state, { payload }) {
      state.userList = payload;
    },
  },
});

export default commonSlice.reducer;
export const { updateLoading, updateError, updateUserList } =
  commonSlice.actions;
export const commonSelector = (state) => state.commonSlice;

export function fetchUserList(pageNumber) {
  return async (dispatch) => {
    dispatch(updateLoading(true));
    try {
      let requestOptions = {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };
      let response = await fetch(`http://localhost:5000/users?_page=${pageNumber}`, requestOptions);
      const data = await response.json();
      if(data.length){
        dispatch(updateUserList(data));
      }
    } catch (error) {
      dispatch(updateError("Something went Wrong!! Please try again."));
    } finally {
      dispatch(updateLoading(false));
    }
  };
}
