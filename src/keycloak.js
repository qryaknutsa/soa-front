import Keycloak from 'keycloak-js';

const initOptions = {
    url: 'http://localhost:8081',
    realm: 'dive-dev',
    clientId: 'soa',
    onLoad: 'login-required',
};

const keycloak = new Keycloak(initOptions);

export default keycloak;
