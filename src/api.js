import axios from 'axios';
import keycloak from './keycloak'; // Импортируйте общий экземпляр Keycloak

const attachTokenToRequest = async (config) => {
    if (keycloak.token) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
    } else {
        console.warn('Keycloak token is missing!');
    }
    return config;
};

const ticketApiClient = axios.create({
    baseURL: 'http://localhost:80',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true
});

ticketApiClient.interceptors.request.use(
    async (config) => {
        try {
            return await attachTokenToRequest(config);
        } catch (error) {
            console.error('Error attaching token:', error);
            throw error;
        }
    },
    (error) => Promise.reject(error)
);

ticketApiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);


const bookingApiClient = axios.create({
    baseURL: 'http://localhost:90/bookingService',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

bookingApiClient.interceptors.request.use(
    async (config) => attachTokenToRequest(config),
    (error) => Promise.reject(error)
);

bookingApiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default { ticketApiClient, bookingApiClient, keycloak };
