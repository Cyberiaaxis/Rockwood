import React from "react";
import { Link } from "react-router-dom";

export default function RightSidebar({ setPage }) {
  function selectPage(event) {
    setPage(event.target.innerText);
  }
  return (
    <React.Fragment>
      <span>
        <ol>
          <li>
            <p onClick={selectPage}>recovery</p>
          </li>
          <li>
            <p onClick={selectPage}>travel</p>
          </li>
          <li>
            <p onClick={selectPage}>gang</p>
          </li>
        </ol>
      </span>
    </React.Fragment>
  );
}
