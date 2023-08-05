import { createBrowserRouter, Link } from "react-router-dom";
import Welcome from "../components/Welcome";
import CurrentUserGuard from "./CurrentUserGuard";
import Dashboard from "../components/Dashboard";
import StaffApp from "../components/staff/StaffApp";

const RouterList = createBrowserRouter([
    {
        path: "/",
        element: <CurrentUserGuard><Welcome /></CurrentUserGuard>
    },
    {
        path: "dashboard",
        element: <CurrentUserGuard><Dashboard /></CurrentUserGuard>
    },
    {
        path: "/staff",
        element: <StaffApp />,
    }
]);

export default RouterList;
