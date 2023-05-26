import { createBrowserRouter, Link } from "react-router-dom";
import Welcome from "../components/Welcome";
import CurrentUserGuard from "./CurrentUserGuard";

const RouterList = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />
    },
    {
        path: "dashboard",
        element: <CurrentUserGuard>hi</CurrentUserGuard>
    }
]);

export default RouterList;
