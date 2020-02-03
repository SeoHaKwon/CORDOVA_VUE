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
    // 해당 파라메터는 IIS_COMP_INFO 테이블에서 IRPAGE_URL 값을 대입하여 회사의 코드, 기업명 등 가져와야 하기때문에 URL로 파라메터를 통일한다.
    // 실제 웹에서는 도메인을 가져와서 대입해준다.
    const param = {
      // 'url': window.location.hostname
      'url': 'shinsungeng.irpage.co.kr'
    }
    if (localStorage.getItem('DI')) {
      // 가끔 오류 및 버그로 회원가입 절차가 모두 끝나지 않았음에도, 화면이 보여지는 경우가 있어,
      // localStorage의 DI값을 확인하는 검사를 한번더 해준다.
      _self.$store.commit('setIsAppJoin', true)
      _self.$store.dispatch('SET_INFO', param)
        .then(resp => {
          // DI가 있어 이미 회원가입이 완료된 회원인 경우 Storage에 SEQ 및 COMP_NAME을 넣어준다 (이부분은 FAQ 질의 응답시 넣어주어야 하는 데이터이기 때문)
          localStorage.setItem('SEQ', resp.COMP_SEQ)
          localStorage.setItem('CNAME', resp.COMP_NAME)
          _self.$store.dispatch('GET_USER_HP', localStorage.getItem('DI'))
            .then(res => {
              if (!res || res.length < 50) {
                // 만약 또한번 버그로 데이터가 일치하지 않아 회원가입회원이 아닌경우 최초 회원가입 페이지로 보내준다.
                _self.$store.commit('setIsAppJoin', false)
                _self.$router.push('/firstStep')
              } else {
                // 완벽하게 회원가입이 완료된 회원인경우 회원의 DI 및 핸드폰번호를 Storage에 저장한다.
                _self.$store.commit('setUserDI', res.USER_DI)
                _self.$store.commit('SET_USERHP', res.USER_PHONE)
              }
            })
        })
    } else {
      _self.$store.commit('setIsAppJoin', false)
      _self.$router.push('/firstStep')
    }
  }
}
</script>

<style>

</style>
