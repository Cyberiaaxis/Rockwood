import React from 'react';
import {useNavigate} from 'react-router-dom';
import { AuthContext} from './AuthContext';
import gameServerApi from './gameServerApi';

// this will make sure there is a logged in user after refresh
const AuthenticationGuard = ({ children }) => {
    const [state, setState] = React.useState('initial')
    const { user, loggedIn, setUser } = React.useContext(AuthContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function run() {
            // only execute if state is initial
            if (state !== 'initial') return;
            
            try {
                const response = await gameServerApi('ping');
                console.log('ping response: ', response);
                // TODO: if ping request says authenticated, call setUser to store username/id in context
                setUser({ userId: response.userId, userName: response.userName, loggedIn: true })
            }
            catch(err) {
                console.log('error: ', err)
                // TODO probably unauthenticated, redirect to login form
                navigate('/login')
            }

            setState('after-auth')
        }
        run();
    }, [state]);

    if (state === 'initial')
        return (<div>Checking user...</div>);

    if (loggedIn)
        return children
    else
        return navigate("/");;
}

export default AuthenticationGuard