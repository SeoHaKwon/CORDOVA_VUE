<template>
  <div class="wrap">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getCompSeq'])
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.setData()
    }
  },
  methods: {
    setData () {
      const _self = this
      if (!_self.getCompSeq) {
        const param = {
          // 'url': window.location.hostname
          'url': 'shinsungeng.irpage.co.kr'
        }
        _self.$store.dispatch('SET_INFO', param)
      }
    }
  },
  mounted () {
    const _self = this
    if (!_self.getCompSeq) {
      _self.setData()
    }
  }
}
</script>

<style scoped>

</style>
