import React, { useState, useMemo } from "react";
import { AuthContextProvider } from "../libraries/AuthContext";
import AuthenticationGuard from "../libraries/AuthenticationGuard";
import Login from "../components/Login";

import { BrowserRouter as Router, Routes, Outlet, Route, Switch, Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Attack from "../pages/Attack";
import App from "../pages/App";
// import Chat from "../components/Chat";

const UserRoutes = () => {
    const [user, setUser] = useState(null);

    // basically what authenticationguard will do is:
    // if there is no authcontext (=aftr refresh) it will do the 'ping' call to get username/password
    // if there is an authcontext but not logged in, it will redirect to login form
    // if there is an authcontext AND logged in, it will display the children (Routes)
    return (
        <Router>
            <AuthContextProvider>
                <AuthenticationGuard>
                    <Routes>
                        {/* these routes are protected by the authentication guard */}
                        <Route path="/" element={<App />} />
                    </Routes>
                    <Routes>
                        {/* these routes are available for everyone */}
                        <Route path="/login" component={Login} />
                    </Routes>
                    <Routes>
                        <Route path={"/dashboard"} element={<Dashboard />} />
                    </Routes>
                </AuthenticationGuard>
            </AuthContextProvider>
        </Router>
    );
};

export default UserRoutes;
