import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
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
