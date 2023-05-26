import React from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext';
import gameServerApi from './gameServerApi';

// this checks for a current user when the app is loading
const CurrentUserGuard = ({ children }) => {
    const [state, setState] = React.useState('initial')
    const { user, loggedIn, setUser, unsetUser } = React.useContext(AuthContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function run() {
            // only execute if state is initial
            if (state !== 'initial') return;

            try {
                const response = await gameServerApi('ping');
                // TODO: if ping request says authenticated, call setUser to store username/id/type in context
                setUser({ userId: response.userId, userName: response.userName, userRole: response.userRoles })

                if (response.status === "staff") {
                    navigate('/staff/');
                } else {
                    navigate('/Dashboard/');
                }

            }
            catch (err) {
                // console.log('CurrentUserGuard: unauthorized')
                unsetUser();
                // TODO probably unauthenticated, redirect to login form
                navigate('/');
            }

            setState('after-auth')
        }
        run();
    }, [state]);

    // console.log('CurrentUserGuard.js rendering - state:', state)
    if (state === 'initial')
        return (<div>Checking user...</div>);

    return children
}

export default CurrentUserGuard;