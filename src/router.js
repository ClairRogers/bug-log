import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Specs from './views/Specs.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/specs/:id',
      name: 'specs',
      props: true,
      component: Specs
    }, {
      path: '*',
      redirect: Home
    }
  ]
})
