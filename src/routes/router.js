import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/MainHome'
import FirstStep from '@/views/AppJoin/FirstStep'
import AgreeStep from '@/views/AppJoin/AgreeStep'
import Ask from '@/views/AppJoin/Ask2'
import Ask2 from '@/views/AppJoin/Ask'
import AdditionalInfor from '@/views/AppJoin/AdditionalInfor'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/firstStep',
      name: 'firstStep',
      component: FirstStep
    },
    {
      path: '/agreeStep/:dupidx',
      name: 'agreeStep',
      component: AgreeStep,
      props: true
    },
    {
      path: '/ask',
      name: 'ask',
      component: Ask
    },
    {
      path: '/ask2',
      name: 'ask2',
      component: Ask2
    },
    {
      path: '/additionalInfor',
      name: 'additionalInfor',
      component: AdditionalInfor
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
