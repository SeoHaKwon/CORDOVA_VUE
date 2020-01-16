import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store/store'
import GoTop from '@inotom/vue-go-top'
import Donut from 'vue-css-donut-chart'
import 'vue-css-donut-chart/dist/vcdonut.css'
import VueScrollTo from 'vue-scrollto'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.config.productionTip = false
Vue.use(GoTop)
Vue.use(Donut)
Vue.use(VueScrollTo)
Vue.use(firebase)
Vue.component('GoTop', GoTop)

const firebaseConfig = {
  apiKey: 'AIzaSyDnaEh7oRKmvHezmkTO65FjtSRoehemmOU',
  authDomain: 'ir-page.firebaseapp.com',
  databaseURL: 'https://ir-page.firebaseio.com',
  projectId: 'ir-page',
  storageBucket: 'ir-page.appspot.com',
  messagingSenderId: '13918026090',
  appID: '1:13918026090:android:6ac048ca53adaacb518d13'
}
firebase.initializeApp(firebaseConfig)
Vue.config.$push = firebase

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
