import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routerList from "../src/libraries/Router";

// console.log("*** Route list ***", routerList);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routerList} />
  </React.StrictMode>
);
