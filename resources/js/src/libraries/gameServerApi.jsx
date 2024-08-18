"use strict";

import Axios from "axios";

/**
 * Axios configuration for the game API.
 */
const gameApi = Axios.create({
    baseURL: '/api/', // Base URL for API requests
    timeout: 60000, // Request timeout in milliseconds (60 seconds)
    withCredentials: true, // Include credentials in requests
});

/**
 * Response interceptor for handling API responses and errors.
 */
gameApi.interceptors.response.use(
    (response) => response.data, // Return response data directly on success
    (error) => {
        const { status, data } = error.response || {};

        if ([419, 422].includes(status)) {
            const errorMessage = status === 419 ? data : extractErrorMessages(data.errors);
            return Promise.reject(errorMessage || data);
        }

        if (status >= 400 && status <= 504) {
            return Promise.reject(new Error(`${status} - ${error.response.statusText}`));
        }

        if (error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
            return Promise.reject(new Error('Unable to connect. The host might be down.'));
        }

        return Promise.reject(error);
    }
);

/**
 * Extract error messages from a validation error response.
 *
 * @param {Object} errors - The error object from the server.
 * @returns {Array} - An array of error messages.
 */
const extractErrorMessages = (errors) => {
    if (!errors) return [];
    return Object.values(errors).flat();
};

/**
 * Makes an API request to the game server.
 *
 * @param {string} endpoint - The API endpoint to request.
 * @param {string} [method='get'] - The HTTP method to use (default is 'get').
 * @param {Object} [data={}] - The request payload (default is an empty object).
 * @param {Object} [options={}] - Additional Axios options (default is an empty object).
 * @returns {Promise<Object>} - The API response data.
 */
export default async function gameServerApi(endpoint, method = 'get', data = {}, options = {}) {
    try {
        const response = await gameApi(endpoint, { method, data, ...options });
        await gameApi('/ping'); // Optional: Ping the server to check the connection
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}
