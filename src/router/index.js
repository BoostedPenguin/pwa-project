import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Auth/Home.vue'
import LoginPage from '../components/Auth/LoginPage.vue'
import MainLoggedPage from '../views/MainLoggedPage.vue'
import Verify from '../components/Auth/Verify.vue'
import { userService } from '../_services/user.service'
import { store } from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login', component: LoginPage,
  },
  {
    path: '/account/verify/:token', component: Verify
  },
  {
    path: '/organization/:name',
    name: 'MainLoggedPage',
    component: MainLoggedPage,
    beforeEnter: async (to, from, next) => {
      const loggedIn = localStorage.getItem('user')

      if (!loggedIn) {
        return next('/login')
      }

      var z = await userService.getOrganization()
      if (to.params.name == z.name) {
        next()
      }
      else {
        return next('/login')
      }
    }
  },
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/']
  let authRequired = !publicPages.includes(to.path)

  if (to.path.includes('/account/verify')) {
    authRequired = false
  }

  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

