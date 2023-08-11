import React from "react";
import { Link } from "react-router-dom";

export default function RightSidebar({ setPage }) {
  function selectPage(event) {
    setPage(event.target.innerText);
  }

  const menuItems = [
    {
      text: 'Recovery',
      url: 'recovery',
      icon: ''
    },
    {
      text: 'Travel',
      url: 'travel',
      icon: ''
    },
    {
      text: 'Gang',
      url: 'gang',
      icon: ''
    },
  ]

  return (
    <React.Fragment>
      <ul>
        {menuItems.map((x, i) => <li key={i} onClick={() => setPage(x.url)}>
          {x.text}
        </li>)}
      </ul>
    </React.Fragment>
  );
}