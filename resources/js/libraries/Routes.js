import React, {useState, useMemo} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Outlet,
    Route,
    Link
  } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Attack from "../pages/Attack";
import App from "../pages/App";
// import Chat from "../components/Chat";

const UserRoutes = () => {
  const [user, setUser] = useState(null);

  // console.log(AuthenticationGuard);
  return (
    <Router>
        <Routes> 
          <Route path="/" element={<App />}/>
          <Route path={"/dashboard"} element={<Dashboard />} />
        </Routes>
    </Router>
  );
};
export default UserRoutes;