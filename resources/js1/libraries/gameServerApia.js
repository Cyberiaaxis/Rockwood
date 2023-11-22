import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

const gameServerApi = async (endpoint = 'ping', requestType = 'GET', contentType = true, body) => {
    // if the cookie isn't set, then let's get a csrf token.
    if (!Cookies.get('XSRF-TOKEN')) {
        await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
    }
    // console.log(body instanceof FormData);
    const options = {

        headers: {
            // we're required to send a header containing the csrf token
            'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
            Accept: 'application/json',
            'Content-Type': (contentType ? 'application/json' : '')
        },
        // the data we send to the game server
        body: body instanceof FormData ? body : JSON.stringify(body),
        method: requestType,
        credentials: 'include'
    }

    const response = await fetch('/api/' + endpoint, options)
    // console.log("response", response);
    if (response.status >= 400 && response.status <= 599) {

        toast.error(response.message, {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored'
        });

        throw new HttpStatusError(response.status)
    }
    return await response.json();
}
export default gameServerApi;

class HttpStatusError extends Error {
    constructor(statusCode) {
        super('HTTP ' + statusCode);
        this.name = 'HttpStatusError'
        this.statusCode = statusCode
    }
}
//https://gist.github.com/Cyberiaaxis/79381ef863b6b3b21635cc2913c2e81a#file-gameserverapi-js-L6
