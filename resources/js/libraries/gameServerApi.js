import Cookies from 'js-cookie'
import ky from 'ky';

const gameServerApi = async (endpoint = 'ping', requestType = 'GET', body) => {
    // if the cookie isn't set, then let's get a csrf token.
    if (!Cookies.get('XSRF-TOKEN')) 
    {
        await ky.get('/sanctum/csrf-cookie');
    }
    // console.log(Cookies.get());
    const options = {
        headers: {
            // we're required to send a header containing the csrf token
            'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
        },
        // the data we send to the game server
        json: body,
        method: requestType,
    }
    return await ky('/api/' + endpoint, options).json();
}

export default gameServerApi;


//https://gist.github.com/Cyberiaaxis/79381ef863b6b3b21635cc2913c2e81a#file-gameserverapi-js-L6