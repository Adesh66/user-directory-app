import React from "react";

function UserCard(props) {
  const { key, Country, Email } = props;
  const renderDate = (date) => {
    const formatedDate = new Date(date).toDateString().split(" ");
    return `${formatedDate[2]} ${formatedDate[1]} ${formatedDate[3]}`;
  };
  const renderNameIcon = (name) => {
    const splitedName = name.split(" ");
    return splitedName[0][0] + splitedName[1][0];
  };
  return (
    <div key={key} className="user_card_wrapper">
      <div className="user_name_icon">{renderNameIcon(props["Full Name"])}</div>
      <div className="user_details">
        <div className="title">
          <b>Name:</b> {props["Full Name"]}
        </div>
        <div className="title">
          <b>Email:</b> {Email}
        </div>
        <div className="title">
          <b>Date of birth:</b> {renderDate(props["Date of birth"])}
        </div>
        <div className="title">
          <b>Country:</b> {Country}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
