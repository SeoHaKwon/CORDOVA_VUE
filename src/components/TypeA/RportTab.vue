<template>
  <div class="report-wrap">
    <ul class="report-direct">
      <li v-for="(item, idx) in sreportList" v-bind:key="idx" v-on:click="getSaveReport(item.url)">
        <p :class="item.class">
          <span>
            <svg style="width:36px;height:36px" viewBox="0 0 28 28">
              <path :fill="mcolor" :d="item.d" />
            </svg>
          </span>
          <span>{{item.name}}</span>
        </p>
        <a href="javascript:void(0);" class="link"></a>
      </li>
    </ul>
    <div class="tab-section">
      <div class="select">
        <span class="selected txt" :style="{ background: mcolor}">연도별 경영보고서</span>
      </div>
      <div class="tabs">
        <button type="button" class="tab" v-for="(item, index) in qList" v-on:click="changeYearList(index)" v-bind:key="item" :class="{ 'active': index === 0 }">{{ item }} <span></span></button>
        <button type="button" class="tab" v-for="item in moreQuarterFor" v-bind:key="item">-</button>
      </div>
    </div>
    <div class="tab-cont active">
      <!--클래스 active 주시면 활성화됩니다.-->
      <div class="material-list report">
        <div class="material" v-if="v_reportData_FILE1" v-on:click="v_totalReport(v_reportData_FILE1)">
          <strong class="material-title">주주총회결과</strong>
          <a href="javascript:void(0);" class="icon-file pdf">
            {{ COM_NM }} {{ v_reportData_YEAR.substr(2, 2)}}년 주주총회결과
          </a>
          <a href="javascript:void(0);" class="link"></a>
        </div>
        <div class="material" v-if="v_reportData_FILE2" v-on:click="v_totalReport(v_reportData_FILE2)">
          <strong class="material-title">사업보고서</strong>
          <a href="javascript:void(0);" class="icon-file pdf">
            {{ COM_NM }} {{ v_reportData_YEAR.substr(2, 2)}}년 사업보고서
          </a>
          <a href="javascript:void(0);" class="link"></a>
        </div>
        <div class="material" v-if="v_reportData_FILE3" v-on:click="v_totalReport(v_reportData_FILE3)">
          <strong class="material-title">지속가능경영보고서</strong>
          <a href="javascript:void(0);" class="icon-file pdf">
            {{ COM_NM }} {{ v_reportData_YEAR.substr(2, 2)}}년 지속가능경영보고서
          </a>
          <a href="javascript:void(0);" class="link"></a>
        </div>
        <div class="material" v-if="v_reportData_FILE4" v-on:click="v_totalReport(v_reportData_FILE4)">
          <strong class="material-title">연차보고서</strong>
          <a href="javascript:void(0);" class="icon-file pdf">
            {{ COM_NM }} {{ v_reportData_YEAR.substr(2, 2)}}년 연차보고서
          </a>
          <a href="javascript:void(0);" class="link"></a>
        </div>
      </div>
    </div>
    <div class="tab-cont"></div>
    <div class="tab-cont"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
// import SubVisual from '@/components/SubVisual'
// import Footer from '@/components/Footer'

export default {
  name: 'ReportTab',
  components: {
    // SubVisual,
    // Footer
  },
  data: () => {
    return {
      sreportList: [{
        name: '정관',
        url: '',
        class: 'report01',
        d: 'M18,22H6A2,2 0 0,1 4,20V4C4,2.89 4.9,2 6,2H7V9L9.5,7.5L12,9V2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22M18,18V16H12V18H18Z'
      }, {
        name: '공시정보관리규정',
        url: '',
        class: 'report02',
        d: 'M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z'
      }, {
        name: '기업지배구조보고서',
        url: '',
        class: 'report03',
        ds: 'M20 3H16.8C16.4 1.8 15.3 1 14 1C12.7 1 11.6 1.8 11.2 3H8C6.9 3 6 3.9 6 5V17C6 18.1 6.9 19 8 19H20C21.1 19 22 18.1 22 17V5C22 3.9 21.1 3 20 3M14 3C14.6 3 15 3.5 15 4C15 4.5 14.5 5 14 5C13.5 5 13 4.5 13 4C13 3.5 13.4 3 14 3M16 14H9V12H16M19 10H9V8H19M4 21H18V23H4C2.9 23 2 22.1 2 21V7H4',
        d: 'M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M10.1,11.4C10.08,11.44 9.81,13.16 8,16.09C8,16.09 4.5,17.91 5.33,19.27C6,20.35 7.65,19.23 9.07,16.59C9.07,16.59 10.89,15.95 13.31,15.77C13.31,15.77 17.17,17.5 17.7,15.66C18.22,13.8 14.64,14.22 14,14.41C14,14.41 12,13.06 11.5,11.2C11.5,11.2 12.64,7.25 10.89,7.3C9.14,7.35 9.8,10.43 10.1,11.4M10.91,12.44C10.94,12.45 11.38,13.65 12.8,14.9C12.8,14.9 10.47,15.36 9.41,15.8C9.41,15.8 10.41,14.07 10.91,12.44M14.84,15.16C15.42,15 17.17,15.31 17.1,15.64C17.04,15.97 14.84,15.16 14.84,15.16M7.77,17C7.24,18.24 6.33,19 6.1,19C5.87,19 6.8,17.4 7.77,17M10.91,10.07C10.91,10 10.55,7.87 10.91,7.92C11.45,8 10.91,10 10.91,10.07Z'
      }],
      qList: [],
      oriQ: 0,
      reportData: [],
      moreQuarterFor: 0,
      v_reportData_FILE1: '',
      v_reportData_FILE2: '',
      v_reportData_FILE3: '',
      v_reportData_FILE4: '',
      COM_NM: '',
      mcolor: '',
      v_reportData_YEAR: '',
      styleObject: {
        'color': '',
        'background-color': ''
      }
    }
  },
  filters: {
    is_Quarter: function (data) {
      if (data) {
        return data
      } else {
        return '-'
      }
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getCompName', 'getMainColor'])
  },
  mounted () {
    const _self = this
    if (_self.getCompName) {
      _self.COM_NM = _self.getCompName
    }
    if (_self.getMainColor) {
      _self.mcolor = '#' + _self.getMainColor
      _self.styleObject['color'] = '#' + _self.getMainColor
      _self.styleObject['background-color'] = '#' + _self.getMainColor
    }
    if (_self.getCompSeq) {
      _self.getSReportData()
      _self.getVReportData()
    }
  },
  updated () {
    this.$nextTick(function () {
      const _self = this
      // document.querySelector('.tabs').childNodes[0].style.color = _self.mcolor
      // document.querySelector('.tabs').childNodes[0].children[0].style.background = _self.mcolor
      _self.changeYearList(_self.oriQ)
    })
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.getSReportData()
      _self.getVReportData()
    },
    getCompName () {
      const _self = this
      _self.COM_NM = _self.getCompName
    },
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
      _self.styleObject['color'] = '#' + _self.getMainColor
      _self.styleObject['background-color'] = '#' + _self.getMainColor
    }
  },
  methods: {
    v_totalReport (url) {
      window.open('https://file.irgo.co.kr/data/IRPAGE/BIZ_REPORT/' + url, '_BLANK')
    },
    changeYearList (Q) {
      const _self = this
      if (_self.oriQ !== Q) {
        if (document.querySelector('.tabs').childNodes[_self.oriQ]) {
          document.querySelector('.tabs').childNodes[_self.oriQ].style.color = ''
          document.querySelector('.tabs').childNodes[_self.oriQ].classList.remove('active')
        }
        if (document.querySelector('.tabs').childNodes[Q]) {
          document.querySelector('.tabs').childNodes[Q].classList.add('active')
          document.querySelector('.tabs').childNodes[Q].style.color = _self.mcolor
          document.querySelector('.tabs').childNodes[Q].children[0].style.background = _self.mcolor
        }
      } else {
        if (document.querySelector('.tabs').childNodes[Q]) {
          document.querySelector('.tabs').childNodes[Q].style.color = _self.mcolor
          document.querySelector('.tabs').childNodes[Q].children[0].style.background = _self.mcolor
        }
      }
      _self.oriQ = Q
      if (_self.reportData.length > 0) {
        _self.v_reportData_FILE1 = _self.reportData[Q].UPLOAD_FILE1
        _self.v_reportData_FILE2 = _self.reportData[Q].UPLOAD_FILE2
        _self.v_reportData_FILE3 = _self.reportData[Q].UPLOAD_FILE3
        _self.v_reportData_FILE4 = _self.reportData[Q].UPLOAD_FILE4
        _self.v_reportData_YEAR = _self.reportData[Q].YEAR
      }
    },
    getSaveReport (URL) {
      window.open('https://file.irgo.co.kr/data/IRPAGE/BIZ_REPORT/' + URL, '_BLANK')
    },
    getSReportData () {
      const _self = this
      const aram = {
        seq: _self.getCompSeq
      }
      this.$store.dispatch('GET_SREPORT', aram)
        .then(res => {
          _.remove(res, { 'UPLOAD_FILE1': null, 'UPLOAD_FILE2': null, 'UPLOAD_FILE3': null, 'UPLOAD_FILE4': null })
          if (res[0].UPLOAD_FILE1) {
            _self.sreportList[0].url = res[0].UPLOAD_FILE1
          }
          if (res[0].UPLOAD_FILE2) {
            _self.sreportList[1].url = res[0].UPLOAD_FILE2
          }
          if (res[0].UPLOAD_FILE3) {
            _self.sreportList[2].url = res[0].UPLOAD_FILE3
          }
        })
    },
    getVReportData () {
      const _self = this
      const aram = {
        seq: _self.getCompSeq
      }
      this.$store.dispatch('GET_VREPORT', aram)
        .then(res => {
          if (res.length > 0) {
            if (res.length > 3) {
              res.splice(0, 3)
            }
            _self.qList = _.uniqBy(_.map(res, 'YEAR'))
            _self.reportData = res
            _self.v_reportData_FILE1 = res[0].UPLOAD_FILE1
            _self.v_reportData_FILE2 = res[0].UPLOAD_FILE2
            _self.v_reportData_FILE3 = res[0].UPLOAD_FILE3
            _self.v_reportData_FILE4 = res[0].UPLOAD_FILE4
            _self.v_reportData_YEAR = res[0].YEAR
            _self.moreQuarterFor = 3 - res.length
          }
        })
    }
  }
}
</script>

<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
.report-direct {
  display: flex;
  border-top: 2px solid $black;
  background-color: $white;
  @include contentWidth($width: 1200px);
  @include shadow();
  li {
    cursor: pointer;
    position: relative;
    width: 33.33%;
    padding: 74px 76px 74px 60px;
    p {
      position: relative;
      // padding-left: 44px;
      font-size: 20px;
      line-height: 29px;
      font-weight: 500;
      color: $black3;
      @each $obj in report01, report02, report03 {
        &.#{$obj} {
          // @include bgImg(icon/icon_#{$obj}, $pos: left center);
          span:first-child {
            padding-right: 34px;
            svg {
              margin-top: 6px;
            }
          }
          span:nth-child(2) {
            // vertical-align: -webkit-baseline-middle;
            vertical-align: text-top;
          }
        }
      }
    }
    .link {
      display: inline-block;
      position: absolute;
      right: 50px;
      top: 50%;
      width: 26px;
      height: 21px;
      transform: translateY(-50%);
      @include bgImg(bg/bg_more_right);
    }
    & + li {
      border-left: 1px solid #e9eaec;
    }
  }
  & + .tab-section {
    margin-top: 110px;
  }
}
@media screen and (max-width: 1000px) {
  .report-wrap {
    .tab-section {
      .select {
        display: none;
      }
    }
  }
  .report-direct {
    display: block;
    li {
      width: 100%;
      padding: 30px;
      & + li {
        border-top: 1px solid #e9eaec;
      }
      p {
        // padding-left: 30px;
        font-size: 12px;
        background-size: auto 20px;
        display: flex;
        align-items: center;
        justify-content: left;

        span:first-child {
          display: flex;
        }
      }
      .link {
        width: 16px;
        height: 15px;
        right: 30px;
        background-size: cover;
      }
    }
    & + .tab-section {
      margin-top: 54px;
    }
  }
  .material-list {
    .material {
      padding: 20px 30px;
      .icon-file {
        display: none;
      }
      .material-title {
        font-size: 14px;
        line-height: 30px;
      }
      .link {
        width: 15px;
        height: 14px;
        background-size: cover;
      }
    }
  }
}
</style>
