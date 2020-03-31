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
      component:()=>import('../views/Home.vue'),
      children:[
        {
          path:"/",
          component:()=>import('../views/NormalStaffPage.vue'),
        },
      {
        path:'/useDevice',
        component:()=>import('../views/EquipmentUseRequestForm.vue')
      },
      {
        path:'/returnDevice',
        component:()=>import('../views/EquipmentReturnRequestForm.vue')
      },
      {
        path:'/personalUsageRecord',
        component:()=>import('../views/PersonalUsageRecord.vue')
      },
      {
        path:'/userProfile',
        component:()=>import('../views/UserProfile.vue')
      },
    ]
    },
  ]
})

export default router
