import React from "react";
// import { Link } from "react-router-dom";

export default function Header({ setPage }) {
  function selectPage(event) {
    setPage(event.target.innerText);
  }
  return (
    <React.Fragment>
      <button>Start</button>
      <span>
        <progress id="progress1" max="100" value="70">
          60%
        </progress>
        <progress id="progress2" max="100" value="70">
          80%
        </progress>
        <progress id="progress3" max="100" value="70">
          40%
        </progress>
        <progress id="progress4" max="100" value="70">
          50%
        </progress>
      </span>
      <span>
        <ul>
          <li>
            <p onClick={selectPage}>One</p>
          </li>
          <li>
            <p>two</p>

            <ul className="dropdown">
              <li>
                <p onClick={selectPage}>Sub-One</p>
              </li>
              <li>
                <p onClick={selectPage}>Sub-Two</p>
              </li>
              <li>
                <p onClick={selectPage}>Sub-Three</p>
              </li>
            </ul>
          </li>
        </ul>
      </span>
    </React.Fragment>
  );
}
