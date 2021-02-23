import Vue from 'vue'
import Router from 'vue-router'
import testhello from '@/components/testhello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'testhello',
      component: testhello
    }
    
  ]
})
