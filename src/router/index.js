import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../components/Dashboard'
import Products from '../components/pages/products'
import Orderlist from '../components/pages/Orderlist'
import Login from '../components/pages/Login'
import Customorder from '../views/Customorder'
import Order from '../views/Order'
import Customcheck from '../views/Customcheck'
Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    redirect:'login'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children:[
      {
        path:'products',
        name:'Products',
        component:Products,
        meta: { requiresAuth: true },
      },
      {
        path:'orderlist',
        name:'Orderlist',
        component:Orderlist,
        meta: { requiresAuth: true },
      }
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // meta: { requiresAuth: true }
  },
  {
    path: '/customorder',
    name: 'Customorder',
    component: Customorder,
    // meta: { requiresAuth: true }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    // meta: { requiresAuth: true }
  },
  {
    path: '/customcheck/:orderId',
    name: 'customcheck',
    component: Customcheck,
  },
]

const router = new VueRouter({
  routes
})

export default router
