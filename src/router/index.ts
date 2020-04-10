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
      name:'login',
      component:()=>import('../views/Login.vue')
    },
    {
      path:'/index',
      component:()=>import('../views/Home.vue'),
      children:[
        {
          path:"normal",
          component:()=>import('../views/normal/index.vue'),
          children:[
            {
              path:'',
              name:'normal',
              component:()=>import('../views/normal/NormalStaffPage.vue')
            },
            {
              path:'useDevice',
              name:'useDevice',
              component:()=>import('../views/normal/EquipmentUseRequestForm.vue')
            },
            {
              path:'returnDevice',
              name:'returnDevice',
              component:()=>import('../views/normal/EquipmentReturnRequestForm.vue')
            },
            {
              path:'personalUsageRecord',
              name:'personalUsageRecord',
              component:()=>import('../views/normal/PersonalUsageRecord.vue')
            },
          ]
        },
        {
          path:'admin',
          name:'admin',
          component:()=>import('../views/admin/AdminPage.vue'),
          children:[
            {
              path:'devices',
              name:'devices',
              component:()=>import('../views/admin/devices.vue')
            },
            {
              path:'rentedDevices',
              name:'rentedDevices',
              component:()=>import('../views/admin/rentedDevices.vue')
            },
            {
              path:'useApprove',
              name:'useApprove',
              component:()=>import('../views/admin/useApprove.vue')
            },
            {
              path:'returnApprove',
              name:'returnApprove',
              component:()=>import('../views/admin/returnApprove.vue')
            },
            {
              path:'chart',
              name:'chart',
              component:()=>import('../views/admin/chart.vue')
            }
          ]
        }
    ]
    },
  ]
})

export default router
