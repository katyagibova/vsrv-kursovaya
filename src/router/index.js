import Vue from 'vue'
import VueRouter from 'vue-router'
import workShiftWindow from '../views/workShiftWindow.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'workShiftWindow',
    component: workShiftWindow
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
