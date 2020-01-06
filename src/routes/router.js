import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/MainHome'
import Announcement from '@/views/TypeA/Announcement'
import AnnouncementView from '@/views/TypeA/AnnouncementView'
import Schedule from '@/views/TypeA/Schedule'
import ScheduleView from '@/views/TypeA/ScheduleView'
import News from '@/views/TypeA/News'
import NewsView from '@/views/TypeA/NewsView'
import Finance from '@/views/TypeA/Finance'
import Status from '@/views/TypeA/Status'
import Disclosure from '@/views/TypeA/Disclosure'
import Report from '@/views/TypeA/Report'
import Contact from '@/views/TypeA/Contact'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/announcement',
      name: 'announcement',
      component: Announcement
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/newsView/:index',
      name: 'newsView',
      component: NewsView,
      props: true
    },
    {
      path: '/financial',
      name: 'financial',
      component: Finance
    },
    {
      path: '/status',
      name: 'status',
      component: Status
    },
    {
      path: '/disclosure',
      name: 'disclosure',
      component: Disclosure
    },
    {
      path: '/report',
      name: 'report',
      component: Report
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/scheduleView/:index',
      name: 'scheduleView',
      component: ScheduleView,
      props: true
    },
    {
      path: '/announcementView/:index',
      name: 'announcementView',
      component: AnnouncementView,
      props: true
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
