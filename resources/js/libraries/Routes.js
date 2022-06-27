import React, { useState, useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from "../libraries/AuthContext";
import CurrentUserGuard from '../libraries/CurrentUserGuard';
import AuthenticationGuard from "../libraries/AuthenticationGuard";
import Login from "../components/Login";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import StaffApp from "../staffPages/StaffApp";
import Attack from "../pages/Attack";
import App from "../pages/App";
// import Chat from "../components/Chat";

const UserRoutes = () => {
    const [user, setUser] = useState(null);

    // basically what authenticationguard will do is:
    // if there is no authcontext (=aftr refresh) it will do the 'ping' call to get username/password
    // if there is an authcontext but not logged in, it will redirect to login form
    // if there is an authcontext AND logged in, it will display the children (Routes)
    console.log('Routes.js rendering')
    return (
        <Router>
            <AuthContextProvider>
                <CurrentUserGuard>

                        <Switch>
                            {/* these routes are available for everyone, should NOT be a child of authenticationguard */}
                            <Route exact path="/" component={App} />
                            <Route exact path="/staff/" component={StaffApp} />
                            <Route>
                                <AuthenticationGuard>
                                    <Switch>
                                        {/* these routes are protected by the authentication guard */}
                                        <Route path={"/dashboard"} component={Dashboard} />
                                    </Switch>
                                </AuthenticationGuard>
                            </Route>
                        </Switch>

                        <ToastContainer />
                </CurrentUserGuard>
            </AuthContextProvider>
        </Router>
    );
};

export default UserRoutes;
