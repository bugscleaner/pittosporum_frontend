import Vue from 'vue'
import router from 'vue-router'
import login from '../components/login'
import mgr from '../components/mgr'
import header from '../components/header'
import profile from '../components/profile'
import store from "../components/store";
import quartz from "../components/quartz";

Vue.use(router)
const originalPush = router.prototype.push
router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta:{
        keepalive:false
      }
    },

    {
      path: '/mgr',
      name: 'mgr',
      component: mgr,
      children:[
        {
          path : 'profile',
          name: 'profile',
          component: profile
        },
        {
          path: 'store',
          name: 'store',
          component: store,
        },
        {
          path: 'header',
          name: 'header',
          component: header,
        },
        {
          path : 'job',
          name: 'job',
          component: quartz
        },
      ],
      meta:{
        keepalive:false
      }
    },
  ]
})