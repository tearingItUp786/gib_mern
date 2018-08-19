import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard }
];
const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
