<template>
  <div class="sub-wrap">
    <div class="sub-visual-wrap">
      <SubVisual/>
      <div class="sub-info-txt">
        <div class="inner">
          <strong class="sub-title">주주현황</strong>
          <div class="history">
            <span class="icon-home" v-on:click="goHome">
              <img src="@/assets/images/icon/icon_home.png" alt="">
            </span>
            <span>주주현황</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-top">
      <Shareholder :holder="SHAREHOLDER"/>
    </div>
    <div class="content-bottom" v-if="diviView">
      <AllocationTable :divi="DIVIDEND"/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import SubVisual from '@/components/TypeA/SubVisual.vue'
import Shareholder from '@/components/TypeA/Shareholder.vue'
import AllocationTable from '@/components/TypeA/AllocationTable.vue'
import Footer from '@/components/TypeA/Footer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'status',
  components: {
    SubVisual,
    Shareholder,
    AllocationTable,
    Footer
  },
  data: () => {
    return {
      DIVIDEND: [],
      SHAREHOLDER: [],
      diviView: false
    }
  },
  filters: {
    currency: function (value) {
      if (Number(value) > 0) {
        return Number(value).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      } else {
        return '-'
      }
    },
    v_number: function (num) {
      if (Number(num) > 0) {
        return num
      } else {
        return '-'
      }
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'GETISVIEW'])
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.getStatusData()
    }
    if (_self.GETISVIEW) {
      _self.getIsDividend()
    }
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.getStatusData()
    },
    GETISVIEW () {
      const _self = this
      _self.getIsDividend()
    }
  },
  methods: {
    getIsDividend () {
      const _self = this
      if (_self.GETISVIEW) {
        if (_self.GETISVIEW.dividend === 'Y') {
          _self.diviView = true
        } else {
          _self.diviView = false
        }
      }
    },
    goHome () {
      this.$router.push('/')
    },
    getStatusData () {
      const _self = this
      const param = {
        seq: _self.getCompSeq
      }
      _self.$store.dispatch('GET_SHOLDER', param)
        .then(res => {
          _self.SHAREHOLDER = res[0]
        })
      _self.$store.dispatch('GET_DIVI', param)
        .then(res => {
          if (res.length > 3) {
            res = res.splice(0, 3)
            _self.DIVIDEND = res
          } else if (res.length > 0) {
            _self.DIVIDEND = res
          } else {
            console.log('데이터 없음')
          }
        })
    }
  }
}

</script>
