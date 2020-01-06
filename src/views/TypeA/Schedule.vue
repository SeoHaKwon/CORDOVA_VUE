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
    <div class="content-top" v-if="newCal.length > 0">
      <NewSchedule :ScheduleData="newCal"/>
    </div>
    <div class="content-bottom">
      <TextBoard :ScheduleData="oldSetData" :allData="oldAllData"/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import SubVisual from '@/components/TypeA/SubVisual.vue'
import NewSchedule from '@/components/TypeA/NewSchedule.vue'
import TextBoard from '@/components/TypeA/TextBoard.vue'
import Footer from '@/components/TypeA/Footer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'schedule',
  components: {
    SubVisual,
    NewSchedule,
    TextBoard,
    Footer
  },
  data: () => {
    return {
      newCal: [],
      oldCal: [],
      oldSetData: [],
      oldAllData: []
    }
  },
  computed: {
    ...mapGetters(['getCompSeq'])
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    getData () {
      const _self = this
      const param = {
        seq: _self.getCompSeq
      }
      _self.$store.dispatch('GET_OLDSCHE', param)
        .then(res => {
          if (res.length > 0) {
            for (var key in res) {
              if (new Date() > new Date(res[key].S_DATE)) {
                _self.oldCal.push(res[key])
              } else if (new Date() < new Date(res[key].S_DATE)) {
                _self.newCal.push(res[key])
              }
            }
            _self.oldSetData = _self.oldCal.reverse().splice(0, 10)
            _self.oldAllData = _self.oldCal
          }
        })
    }
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.getData()
    }
  },
  mounted () {
    const _self = this
    _self.getData()
  }
}

</script>

<style lang="scss">
@import "@/style/_mixin.scss";
</style>
