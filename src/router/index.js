import Vue from 'vue'
import Router from 'vue-router'
import taipei from '@/components/taipei'
import rainwaterPH from '@/components/rainwaterPH'
import UV from '@/components/UV'





Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'taipei',
      component: taipei
    },
    {
      path: '/rainwaterPH',
      name: 'rainwaterPH',
      component: rainwaterPH
    },
    {
      path: '/UV',
      name: 'UV',
      component: UV
    }
    

    
  ]
})
