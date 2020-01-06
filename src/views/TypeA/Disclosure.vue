<template>
  <div class="sub-wrap">
    <div class="sub-visual-wrap">
      <SubVisual/>
      <div class="sub-info-txt">
        <div class="inner">
          <strong class="sub-title">공시</strong>
          <div class="history">
            <span class="icon-home" v-on:click="goHome">
              <img src="@/assets/images/icon/icon_home.png" alt="">
            </span>
            <span>공시</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-bottom">
      <DisclosureBoard/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import SubVisual from '@/components/TypeA/SubVisual.vue'
import DisclosureBoard from '@/components/TypeA/DisclosureBoard.vue'
import Footer from '@/components/TypeA/Footer.vue'

export default {
  name: 'Disclosure',
  components: {
    SubVisual,
    DisclosureBoard,
    Footer
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}

</script>

<style lang="scss">
</style>
