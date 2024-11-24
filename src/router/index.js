// // src/router/index.js
//
// import { createRouter, createWebHistory } from 'vue-router'
// import Tickets from '../components/Tickets.vue' // Импортируем компонент Tickets
//
// const routes = [
//     {
//         path: '/',
//         name: 'Tickets',
//         component: Tickets // Устанавливаем Tickets как компонент по умолчанию
//     },
//     // Добавьте другие маршруты, если необходимо
// ]
//
// const router = createRouter({
//     history: createWebHistory(process.env.BASE_URL),
//     routes
// })
//
// export default router


// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Tickets from '../components/TicketTable.vue';
import Ticket from '../components/Ticket.vue';
import Events from '../components/Events.vue';
import DiscountsPage from '../components/DiscountsPage.vue';
import UniqueTypesPage from '../components/UniqueTypesPage.vue';
import LessThanType from '../components/LessThanType.vue';
import NotFound from '../components/NotFound.vue'


const routes = [
    {
        path: '/',
        redirect: '/TMA/api/v2/tickets'
    },
    {
        path: '/TMA/api/v2/tickets',
        name: 'TicketTable',
        component: Tickets,
        props: route => ({
            pageSize: Number(route.query.size) || 10,
            pageNumber: Number(route.query.page) || 1,
            filter: route.query.filter || null,
            sort: route.query.sort || null
        })
    },
    {
        path: '/TMA/api/v2/booking',
        name: 'Events',
        component: Events
    },
    {
        path: '/TMA/api/v2/tickets/:id',
        name: 'Ticket',
        component: Ticket,
        props: true
    },
    {
        path: '/TMA/api/v2/tickets/discounts',
        component: DiscountsPage,
    },
    {
        path: '/TMA/api/v2/tickets/types/unique',
        component: UniqueTypesPage,
    },
    {
        path: '/TMA/api/v2/tickets/types/less/:lessType',
        component: LessThanType,
        name: 'LessThanType',
        props: true
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, // Для неправильных URL

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
