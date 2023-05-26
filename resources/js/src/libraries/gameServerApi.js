
"use strict";
import Axios from "axios";
import { toast } from "react-toastify";

let config = {
    //    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    baseURL: 'http://localhost/api/',
    timeout: 60 * 1000, // Timeout,
    withCredentials: true,
    //  authorization: accessToken,
};

const axios = Axios.create(config);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (err) {
        if (err.response && [419, 422].includes(err.response.status)) {

            const statusCode = err.response.status
            const error = err.response.data

            const errorMessage = statusCode === 419 ? error : Object.values(error.errors).flat()

            const errResponse = error || err

            return Promise.reject(errResponse)

        } else if (err.response && err.response.status >= 400 && err.response.status <= 504) {
            // this will trigger the `handleError` function in the promise chain
            return Promise.reject(new Error(`${err.response.status} - ${err.response.statusText}`))
        } else if (err.code === 'ECONNREFUSED' || err?.message === 'Network Error') {
            // this will trigger the `handlerResponse` function in the promise chain
            // bacause we are not returning a rejection! Just an example
            return Promise.reject(new Error('Unable to Connect maybe host down'))
        } else {
            // this will trigger the `handleError` function in the promise chain
            return Promise.reject(err)
        }
    }
);

export default async function gameServerApi(endpoint, method = 'get', data = {}, options = {}) {


    let response = '';

    const defaultOptions = {
        method: method,
        data: data,
        ...options,
    }

    try {

        const result = await axios(endpoint, defaultOptions);

        response = result?.data

    } catch (error) {

        toast.error(error.message, {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored'
        });

        throw new Error(error.message)
    }

    return response;
}