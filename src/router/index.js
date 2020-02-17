import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../components/Dashboard'
import Products from '../components/pages/products'
import Login from '../components/pages/Login'
import Customorder from '../views/Customorder'
import Hello from '../components/HelloWorld'
Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    redirect:'login'
  },
  {
    name:'hello',
    path:'/hello',
    component:Hello,
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
    // meta: { requiresAuth: true },
    children:[
      {
        path:'products',
        name:'Products',
        component:Products,
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
]

const router = new VueRouter({
  routes
})

export default router
