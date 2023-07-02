import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/views/Auth/Auth.vue'
import AuthCRoutes from '@/views/Auth/Auth.route.js'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import DashboardRoutes from '@/views/Dashboard/Dashboard.routes.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'account',
  },
  {
    path: '/account',
    name: 'account',
    component: Auth,
    children: AuthCRoutes
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: DashboardRoutes
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token && !to.path.includes('account')) {
    next("/account/signin");
  } else if (token && to.path.includes('account')) {
    next("/dashboard");
  } else next();
})


export default router
