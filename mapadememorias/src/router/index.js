import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const lazyLoad = view => () => import(`@/views/${view}.vue`)

const routes = [
  {
    path: '/',
    name: 'home',
    component: lazyLoad('Home')
  }
]

const router = new VueRouter({
  routes
})

export default router
