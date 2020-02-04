<template>
  <div id="root">
    <div id="app" v-on:mousewheel="onScroll($event)" v-if="getIsAppJoin">
      <GnbB :scrollTemp="scrollTemps"/>
    </div>
    <AppJoin v-if="IRPAGE_USE && !getIsAppJoin" />
    <errpage v-if="IRPAGE_USE === false"/>
  </div>
</template>
<script>
import GnbB from '@/components/TypeB/Gnb'
import AppJoin from '@/components/AppJoin/Home'
import errpage from '@/components/404'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    GnbB,
    errpage,
    AppJoin
  },
  data: () => {
    return {
      IRPAGE_TYPE: '',
      IRPAGE_USE: true,
      scrollTemps: 0
    }
  },
  computed: {
    ...mapGetters(['getIsAppJoin'])
  },
  beforeCreate () {
    const _self = this
    document.addEventListener('deviceready', function () {
      // navigator.splashscreen 및 FCMPlugin 객체는 deviceready 에서만 가능
      window.open = cordova.InAppBrowser.open
      if (!localStorage.getItem('DI')) {
        // token이 localStorage에 없는 우에는 토큰을 받아올 때까지 interval을 주어 받아온다.
        var inter = setInterval(function () {
          window.FirebasePlugin.getToken(token => {
            if (token) {
              localStorage.setItem('getToken', token)
              navigator.splashscreen.hide()
              clearInterval(inter)
              _self.$router.replace('firstStep')
            }
          })
        }, 500)
      } else {
        // token이 스토리지에 있는 경우 splashscreen을 종료 시켜주고 메인을 보여준다.
        setTimeout(function () {
          navigator.splashscreen.hide()
        }, 3000)
      }
    }, false)
  },
  methods: {
    onScroll (e) {
      const _self = this
      let _scrollTop = window.scrollY || document.documentElement.scrollTop
      if (_self.width > 899) {
        // console.log(_scrollTop, 'PC')
      } else {
        // console.log(_scrollTop, 'mobile')
      }
      _self.scrollTemps = _scrollTop
    }
  }
}
</script>
<style lang="scss">

</style>
