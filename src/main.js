import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import keycloak from './keycloak'; // Импортируйте общий экземпляр Keycloak

keycloak
    .init({ onLoad: 'login-required', checkLoginIframe: false })
    .then(authenticated => {
        if (authenticated) {
            console.log('User authenticated:', keycloak.token);
            console.log('Roles:', keycloak.tokenParsed.realm_access.roles);
            // Настройте приложение Vue
            createApp(App)
                .use(router)
                .mount('#app');
        } else {
            console.warn('User is not authenticated');
        }
    })
    .catch(error => {
        console.error('Keycloak initialization failed:', error);
    });
