<template>
  <div class="sub-wrap">
    <div class="sub-visual-wrap">
      <SubVisual/>
      <div class="sub-info-txt">
        <div class="inner">
          <strong class="sub-title">재무정보</strong>
          <div class="history">
            <span class="icon-home" v-on:click="goHome">
              <img src="@/assets/images/icon/icon_home.png" alt="">
            </span>
            <span>재무정보</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-top">
      <FinanceInfor/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import SubVisual from '@/components/TypeA/SubVisual.vue'
import FinanceInfor from '@/components/TypeA/FinanceInfor.vue'
import Footer from '@/components/TypeA/Footer.vue'

export default {
  name: 'Finance',
  components: {
    SubVisual,
    FinanceInfor,
    Footer
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}

</script>
