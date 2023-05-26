import React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import gameServerApi from './gameServerApi';

// this will make sure there is a logged in user
const AuthenticationGuard = ({ children }) => {
    const { user, loggedIn, setUser } = React.useContext(AuthContext);
    const navigate = useHistory()
    // console.log('AuthGuard.js rendering')

    React.useEffect(() => {
        if (!loggedIn) {
            // console.log('AuthGuard: not logged in, redirecting')
            navigate('/')
        } else {
            // console.log('AuthGuard: logged in')
        }
    }, [loggedIn])

    if (loggedIn)
        return children

    // this is not allowed directly in your render method
    //return navigate("/");;
    return <div>Not logged in, redirecting</div>
}

export default AuthenticationGuard