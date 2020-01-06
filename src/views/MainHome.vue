<template>
  <div>
    <component :is="selectedComponents"></component>
  </div>
</template>

<script>
import AHOME from '@/views/TypeA/Home'
import BHOME from '@/views/TypeB/Home'
import { mapGetters } from 'vuex'

export default {
  components: {
    AHOME,
    BHOME
  },
  data: () => {
    return {
      selectedComponents: ''
    }
  },
  computed: {
    ...mapGetters(['getCompName'])
  },
  mounted () {
    const _self = this
    const param = {
      'url': window.location.hostname
    }
    this.$store.dispatch('GET_PAGETYPE', param)
      .then(res => {
        if (res.IRPAGE_TYPE === 'A') {
          _self.selectedComponents = 'AHOME'
        } else if (res.IRPAGE_TYPE === 'B') {
          _self.selectedComponents = 'BHOME'
        }
        _self.$store.dispatch('SET_INFO', param)
      })
    if (_self.getCompName) {
      _self.setTITLE()
    }
  },
  watch: {
    getCompName () {
      const _self = this
      _self.setTITLE()
    }
  },
  methods: {
    setTITLE () {
      const _self = this
      let title = document.getElementsByTagName('title')[0]
      title.innerHTML = _self.getCompName
    }
  }
}
</script>

<style>

</style>
