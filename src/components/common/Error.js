import React from "react";

function Error({ errorMsg }) {
  return (
    <div className="loader-wrapper">
      <div className="loading-text">{errorMsg}</div>
    </div>
  );
}

export default Error;
