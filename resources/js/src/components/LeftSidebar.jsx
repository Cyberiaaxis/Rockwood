import React from "react";
// import { Link } from "react-router-dom";

export default function LeftSidebar({ setPage }) {
  function selectPage(event) {
    setPage(event.target.innerText);
  }

  return (
    <React.Fragment>
      <span>
        <ol>
          <li onClick={selectPage}>
            home
            {/* <Link to="#">Home</Link> */}
          </li>
          <li onClick={selectPage}>
            profile
            {/* <Link to="#">Stats</Link> */}
          </li>
          <li onClick={selectPage}>
            chat
            {/* <Link to="#">Profile</Link> */}
          </li>
          <li onClick={selectPage}>
            crimes
            {/* <Link to="#">Profile</Link> */}
          </li>
        </ol>
      </span>
    </React.Fragment>
  );
}
