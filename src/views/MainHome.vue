<template>
  <div>
    <component :is="selectedComponents"></component>
  </div>
</template>

<script>
import BHOME from '@/views/TypeB/Home'

export default {
  components: {
    BHOME
  },
  data: () => {
    return {
      selectedComponents: 'BHOME'
    }
  },
  mounted () {
    const _self = this
    const param = {
      'url': 'shinsungeng.irpage.co.kr'
    }
    if (localStorage.getItem('DI')) {
      _self.$store.commit('setIsAppJoin', true)
      _self.$store.dispatch('SET_INFO', param)
      .then(resp => {
        localStorage.setItem('SEQ', resp.COMP_SEQ)
        localStorage.setItem('CNAME', resp.COMP_NAME)
        _self.$store.dispatch('GET_USER_HP', localStorage.getItem('DI'))
          .then(res => {
            if (!res || res.length < 50) {
              _self.$store.commit('setIsAppJoin', false)
              _self.$router.push('/firstStep')
            } else {
              _self.$store.commit('setUserDI', res.USER_DI)
              _self.$store.commit('SET_USERHP', res.USER_PHONE)
            }
          })
      })
    }
  }
}
</script>

<style>

</style>
