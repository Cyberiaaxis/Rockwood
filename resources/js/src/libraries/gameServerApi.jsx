
"use strict";
import Axios from "axios";
import { toast } from "react-toastify";

let config = {
    //    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    baseURL: '/api/',
    timeout: 60 * 1000, // Timeout,
    withCredentials: true,
    //  authorization: accessToken,
};

export const gameApi = Axios.create(config);

// Add a response interceptor
gameApi.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response.data;
    },
    function (err) {

        const { status, data } = err.response;

        if (err.response && [419, 422].includes(status)) {

            const statusCode = status;
            const error = data;

            const inputErrors = Array.isArray(data) ? data : Object.values(error.errors).flat() || [];

            const errorMessage = statusCode === 419 ? error : inputErrors;

            const errResponse = errorMessage || error || err

            return Promise.reject(errResponse);

        } else if (err.response && err.response.status >= 400 && err.response.status <= 504) {
            // this will trigger the `handleError` function in the promise chain
            return Promise.reject(new Error(`${err.response.status} - ${err.response.statusText}`))
        } else if (err.code === 'ECONNREFUSED' || err?.message === 'Network Error') {
            // this will trigger the `handlerResponse` function in the promise chain
            // because we are not returning a rejection! Just an example
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

        response = await gameApi(endpoint, defaultOptions);

    } catch (error) {
        toast.error(error.message, {
            theme: 'colored'
        });

        return Promise.reject(error);
    }

    return response;
}
