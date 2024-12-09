import { createRouter, createWebHistory } from 'vue-router';
import Tickets from '../components/TicketTable.vue';
import Ticket from '../components/Ticket.vue';
import Events from '../components/EventTable.vue';
import Event from '../components/Event.vue';
import DiscountsPage from '../components/DiscountsPage.vue';
import UniqueTypesPage from '../components/UniqueTypesPage.vue';
import LessThanType from '../components/LessThanType.vue';
import NotFound from '../components/NotFound.vue'
import CopyTicketToVip from '../components/CopyTicketToVip.vue'
import Enums from '../components/Enums.vue'
import Enum from '../components/Enum.vue'


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
        name: 'EventTable',
        component: Events
    },
    {
        path: '/TMA/api/v2/tickets/:id',
        name: 'Ticket',
        component: Ticket,
        props: true
    },
    {
        path: '/TMA/api/v2/booking/event/:id',
        name: 'Event',
        component: Event,
        props: true
    },
    {
        path: '/TMA/api/v2/tickets/discounts',
        component: DiscountsPage,
    },
    {
        path: '/TMA/api/v2/booking/sell/vip',
        component: CopyTicketToVip
    },
    {
        path: '/TMA/api/v2/tickets/types/unique',
        component: UniqueTypesPage,
    },
    {
        path: '/TMA/api/v2/enums',
        component: Enums,
    },
    {
        path: '/TMA/api/v2/enums/:enumStr',
        component: Enum,
        name: 'Enum',
        props: true
    },
    {
        path: '/TMA/api/v2/tickets/types/less/:lessType',
        component: LessThanType,
        name: 'LessThanType',
        props: true
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: NotFound,
        meta: { catchAll: true }
    }

];

const router = createRouter({
    history: createWebHistory(),
    strict: true,
    routes
});

export default router;
