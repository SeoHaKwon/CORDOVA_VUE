<template>
  <div class="announcement-Tab">
    <div class="tab-section">
      <div class="select" :style="{background: mcolor}">
        <span class="selected" v-on:click="openSelect">{{ nowYear }}</span>
        <ul class="select-list" :class="{on:isActive}">
          <li v-for="(item ,idx) in yearList" v-bind:key="idx" :style="{background: mcolor}">
            <a href="javascript:void(0);" v-on:click="changeYear(item)">{{ item }}</a>
          </li>
        </ul>
      </div>
      <div class="tabs">
        <button type="button" class="tab" v-on:click="changeQuarter(0)">1Q<span></span></button> <!--클래스 active 주시면 활성화됩니다.-->
        <button type="button" class="tab" v-on:click="changeQuarter(1)">2Q<span></span></button>
        <button type="button" class="tab" v-on:click="changeQuarter(2)">3Q<span></span></button>
        <button type="button" class="tab" v-on:click="changeQuarter(3)">4Q<span></span></button>
      </div>
    </div>
    <div class="tab-cont active"> <!--클래스 active 주시면 활성화됩니다.-->
      <div class="material-list">
        <div class="material" v-on:click="goURL('statusTable')" v-if="statusTable">
          <strong class="material-title">재무상태표</strong>
          <a href="#" class="icon-file  pdf">
            {{ COM_NM }} {{nowYear.substr(2, 2)}} {{oriQ+1}}Q 재무상태표
          </a>
          <a href="#" class="link"></a>
        </div>
        <div class="material" v-on:click="goURL('profitTable')" v-if="profitTable">
          <strong class="material-title">손익계산서</strong>
           <a href="#" class="icon-file pdf">
            {{ COM_NM }} {{nowYear.substr(2, 2)}} {{oriQ+1}}Q 손익계산
          </a>
            <a href="#" class="link"></a>
        </div>
        <div class="material" v-on:click="goURL('cashTable')" v-if="cashTable">
          <strong class="material-title">현금흐름표</strong>
           <a href="#" class="icon-file  pdf">
            {{ COM_NM }} {{nowYear.substr(2, 2)}} {{oriQ+1}}Q 현금흐름표
          </a>
          <a href="#" class="link"></a>
        </div>
      </div>
    </div>
    <div class="tab-cont">
    </div>
    <div class="tab-cont">
    </div>
    <div class="tab-cont">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  data: () => {
    return {
      isActive: false,
      finance: [],
      nowYear: '',
      oriQ: 0,
      v_finance: [],
      statusTable: '',
      profitTable: '',
      cashTable: '',
      yearList: [],
      COM_NM: '',
      mcolor: ''
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getCompName', 'getMainColor'])
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.getFinanceData()
    }
    if (_self.getCompName) {
      _self.COM_NM = _self.getCompName
    }
    if (_self.getMainColor) {
      _self.mcolor = '#' + _self.getMainColor
    }
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.getFinanceData()
    },
    getCompName () {
      const _self = this
      _self.COM_NM = _self.getCompName
    },
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
    }
  },
  methods: {
    openSelect () {
      this.isActive = !this.isActive
    },
    goURL (category) {
      const _self = this
      const url = 'https://file.irgo.co.kr/data/IRPAGE/FINANCE/'
      if (category === 'statusTable') {
        window.open(url + _self.statusTable, '_BLANK')
      } else if (category === 'profitTable') {
        window.open(url + _self.profitTable, '_BLANK')
      } else if (category === 'cashTable') {
        window.open(url + _self.cashTable, '_BLANK')
      } else {
        // console.log('잘못된 요청')
      }
    },
    getFinanceData () {
      const _self = this
      const aram = {
        seq: _self.getCompSeq
      }
      this.$store.dispatch('GET_FINANCE', aram)
        .then(res => {
          if (res.length > 12) {
            res.splice(0, 12)
          }
          let selectList = _.uniqBy(_.map(res, 'YEAR'))
          if (selectList.length > 3) {
            selectList.splice(0, 3)
          }
          _.remove(res, { 'UPLOAD_FILE1': null, 'UPLOAD_FILE2': null, 'UPLOAD_FILE3': null })
          let qList = _.uniqBy(_.map(_.filter(res, { 'YEAR': selectList[0] }), 'PERIOD'))
          _self.yearList = selectList
          _self.finance = res
          _self.changeYear(selectList[0])
          _self.changeQuarter(qList[0] - 1)
        })
    },
    changeYear (year) {
      const _self = this
      _self.nowYear = year
      _self.isActive = false
      document.querySelector('.tabs').childNodes[_self.oriQ].style.color = ''
      document.querySelector('.tabs').childNodes[_self.oriQ].classList.remove('active')
      _self.setFinance(year, Number(_self.oriQ) + 1)
    },
    changeQuarter (Q) {
      const _self = this
      if (_self.setFinance(_self.nowYear, Q + 1)) {
        if (_self.oriQ !== Q) {
          document.querySelector('.tabs').childNodes[Q].classList.add('active')
          document.querySelector('.tabs').childNodes[Q].style.color = _self.mcolor
          document.querySelector('.tabs').childNodes[Q].children[0].style.background = _self.mcolor
          document.querySelector('.tabs').childNodes[_self.oriQ].classList.remove('active')
          document.querySelector('.tabs').childNodes[_self.oriQ].style.color = ''
          document.querySelector('.tabs').childNodes[_self.oriQ].children[0].style.background = ''
          _self.oriQ = Q
        }
      } else {
        // document.querySelector('.tabs').childNodes[_self.oriQ].style.color = ''
        // document.querySelector('.tabs').childNodes[_self.oriQ].classList.remove('active')
        // _self.oriQ = 0
      }
    },
    setFinance (year, q) {
      const _self = this
      _self.v_finance = _.filter(_self.finance, { 'YEAR': year, 'PERIOD': String(q) })
      if (_self.v_finance.length > 0) {
        _self.statusTable = _self.v_finance[0].UPLOAD_FILE1
        _self.profitTable = _self.v_finance[0].UPLOAD_FILE2
        _self.cashTable = _self.v_finance[0].UPLOAD_FILE3
        document.querySelector('.tabs').childNodes[q - 1].classList.add('active')
        document.querySelector('.tabs').childNodes[q - 1].style.color = _self.mcolor
        document.querySelector('.tabs').childNodes[q - 1].children[0].style.background = _self.mcolor
        return true
      } else {
        // _self.statusTable = ''
        // _self.profitTable = ''
        // _self.cashTable = ''
        return false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
 .announcement-Tab {
   @include contentWidth(1200px);
 }

</style>
