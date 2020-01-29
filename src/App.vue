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
    if (!localStorage.getItem('DI')) {
      _self.$store.commit('setIsAppJoin', false)
    }
  },
  mounted () {
    const _self = this
    document.addEventListener('deviceready', _self.onDeviceReady, false)
  },
  methods: {
    onDeviceReady () {
      window.open = cordova.InAppBrowser.open
      if (cordova.platformId === 'android') {
        localStorage.setItem('platform', 'android')
      } else if (cordova.platformId === 'ios') {
        localStorage.setItem('platform', 'ios')
      } else {
        localStorage.setItem('platform', 'window')
      }
      // navigator.splashscreen.hide()
      FCMPlugin.getToken(
        function (token) {
          localStorage.setItem('getToken', token)
        },
        function (err) {
          alert(err)
        }
      )
    },
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
