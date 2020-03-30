import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:()=>import('../views/Login.vue')
    },
    {
      path:'/index',
      component:()=>import('../views/Home.vue')
    }
  ]
})

export default router
