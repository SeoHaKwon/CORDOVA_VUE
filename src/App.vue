<template>
  <div id="root">
    <div id="app" class="wrap" v-if="IRPAGE_TYPE === 'A'">
      <Gnb/>
      <go-top
      :max-width="0"
      :size="50"
      :right="15"
      :bottom="70"
      :radius="7"
      bg-color="#8E8E93"
      box-shadow="5px 5px 5px rgba(0, 0, 0, .5)">TOP</go-top>
    </div>
    <div id="app" v-on:mousewheel="onScroll($event)" v-else-if="IRPAGE_TYPE === 'B'">
      <GnbB :scrollTemp="scrollTemps"/>
    </div>
  </div>
</template>
<script>
import Gnb from '@/components/TypeA/Gnb.vue'
import GnbB from '@/components/TypeB/Gnb.vue'

export default {
  name: 'App',
  components: {
    Gnb,
    GnbB
  },
  data: () => {
    return {
      IRPAGE_TYPE: '',
      scrollTemps: 0
    }
  },
  beforeCreate () {
    const _self = this
    const param = {
      'url': window.location.hostname
    }
    this.$store.dispatch('GET_PAGETYPE', param)
      .then(res => {
        _self.IRPAGE_TYPE = res.IRPAGE_TYPE
      })
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
