import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routerList from "./src/libraries/Router";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

// console.log("*** Route list ***", routerList);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ToastContainer />
        <RouterProvider router={routerList} />
    </React.StrictMode>
);
