import { createRouter, createWebHistory } from 'vue-router'


import Menu from '../components/Menu.vue'
import Checkout from '../components/Checkout.vue'

import Home from '../components/Home.vue'
import AboutUs from '../components/AboutUs.vue'
import ContactUs from '../components/ContactUs.vue'
import WorkingHours from '../components/WorkingHours.vue'

const routes = [
  {
    path: '/:branchId/:lang?',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/about/:branchId/:lang',
    name: 'AboutUs',
    component: AboutUs,
    props: true,
  },
  {
    path: '/contatcus/:branchId/:lang',
    name: 'ContactUs',
    component: ContactUs,
    props: true,
  },
  {
    path: '/WorkingHours/:branchId/:lang',
    name: 'WorkingHours',
    component: WorkingHours,
    props: true,
  },
  {
    path: '/menu/:branchId/:lang/:id?',
    name: 'Menu',
    component: Menu,
    props: true 
  },
  {
    path: '/checkout/:branchId/:lang',
    name: 'Checkout',
    component: Checkout,
    props: true
  },
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
