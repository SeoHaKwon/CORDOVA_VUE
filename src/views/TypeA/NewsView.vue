<template>
  <div class="sub-wrap">
    <div class="sub-visual-wrap">
      <SubVisual/>
      <div class="sub-info-txt">
        <div class="inner">
          <strong class="sub-title">IR NEWS</strong>
          <div class="history">
            <span class="icon-home" v-on:click="goHome">
              <img src="@/assets/images/icon/icon_home.png" alt="">
            </span>
            <span>IR NEWS</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-bottom">
      <NewsDetail/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import SubVisual from '@/components/TypeA/SubVisual.vue'
import NewsDetail from '@/components/TypeA/NewsDetail.vue'
import Footer from '@/components/TypeA/Footer.vue'

export default {
  name: 'NewsView',
  components: {
    SubVisual,
    NewsDetail,
    Footer
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}

</script>
