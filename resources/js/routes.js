import Vue from 'vue';
import VueRouter from 'vue-router';

import TableComponent from './components/Table.vue';
import ButtonComponent from './components/Buttons.vue';
import NotFoundComponent from './components/NotFound.vue';
import HomeComponent from './components/Home.vue';

// Usar el componente de rutas
Vue.use(VueRouter);

// Objeto para registrar rutas
export default new VueRouter({
    mode: 'history',  // Evita que aparezca # en las rutas
    //base: process.env.BASE_URL,
    routes: [

        // Default view
        {
            path: '/home',
            name: 'dashboard',
            component: HomeComponent,
            
        },
        // Fin Default view

        {
            path: '/table',
            name: 'tables',
            component: TableComponent,
            
        },

        {
            path: '/button',
            name: 'buttons',
            component: ButtonComponent,
            
        },
        {
            path: '*',
            component: NotFoundComponent
        }
        

    ],
});
