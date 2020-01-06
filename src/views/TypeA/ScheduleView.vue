<template>
  <div class="sub-wrap">
    <div class="sub-visual-wrap">
      <SubVisual/>
      <div class="sub-info-txt">
        <div class="inner">
          <strong class="sub-title">IR 일정</strong>
          <div class="history">
            <span class="icon-home" v-on:click="goHome">
              <img src="@/assets/images/icon/icon_home.png" alt="">
            </span>
            <span>IR 일정</span>
          </div>
        </div>
      </div>
    </div>
    <ScheduleDetail/>
    <Footer/>
  </div>
</template>

<script>
import SubVisual from '@/components/TypeA/SubVisual.vue'
import ScheduleDetail from '@/components/TypeA/ScheduleDetail.vue'
import Footer from '@/components/TypeA/Footer.vue'

export default {
  name: 'scheduleView',
  components: {
    SubVisual,
    ScheduleDetail,
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
@import "@/style/_mixin.scss";
</style>
