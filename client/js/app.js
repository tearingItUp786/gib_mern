import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { isLoggedIn } from './helpers/authHelper.js';

// Async load the components for the router
const Login = () => import('./components/Login.vue');
const Dashboard = () => import('./components/Dashboard.vue');

Vue.use(VueRouter);

// Simple function to set up creating private routes
const privateRoute = routeObject => ({
  ...routeObject,
  beforeEnter: (to, from, next) => {
    if (!isLoggedIn()) {
      next('/');
    }
    next();
  }
});

const routes = [
  { path: '/', alias: '/login', component: Login },
  privateRoute({ path: '/admin', component: Dashboard })
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
