// src/api.js

import axios from 'axios';

const ticketApiClient = axios.create({
    baseURL: 'http://localhost:8080/ticketservicepayara',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

const bookingApiClient = axios.create({
    baseURL: 'http://localhost:8080/bookingServicePayara',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});



ticketApiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

bookingApiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default {ticketApiClient, bookingApiClient};
