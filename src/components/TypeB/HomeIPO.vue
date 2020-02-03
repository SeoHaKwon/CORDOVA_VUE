<template>
  <div class="HomeFinanceInfo contaner" v-if="isData && isIPO == 'CT02'">
    <h2 class="section-title">IPO 정보</h2>
    <h3 class="section-sube">
      Initial Public Offering Information
    </h3>
    <div class="IPO-items-group">
      <div v-for="(ipo, idx) in IPODATA" class="IPO-items" v-bind:key="idx">
        <div class="IPO-wrapper">
          <img v-if="ipo.background === 'gray'" src="@/assets/Type_B/img/gray_circle.png" />
          <img v-else src="@/assets/Type_B/img/white_circle.png" />
          <h5 :style="`color: ${ipo.font}`">
            {{ ipo.title }}
          </h5>
          <div class="IPO-arrow" v-if="ipo.isarrow">
            <img v-if="ipo.arrow === 'gray'" src="@/assets/Type_B/img/ic_gray_arrow.png" />
            <img v-else src="@/assets/Type_B/img/ic_black_arrow.png" />
          </div>
        </div>
        <h6 :style="`color: ${ipo.font}`">
          {{ ipo.days }}
        </h6>
      </div>
    </div>
    <ul class="finance-info">
      <li v-for="(item, key) in IPOList" v-on:click="goURL(item.TYPE, item.VOD_URL, item.UPLOAD_FILE1)" v-bind:key="key">
        <h5>{{item.TITLE}}</h5>
        <h6>
          <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="item.TYPE == 'PDF'">
            <path v-bind:fill="mcolor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
          </svg>
          <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-else>
            <path :fill="mcolor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
          </svg>
          <span class="data-type" :style="`color: ${mcolor}`">{{item.TYPE}}</span>
        </h6>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeIPO',
  components: {
  },
  data () {
    return {
      isData: true,
      isIPO: '',
      mcolor: '',
      IPODATA: [
        /* background: gray or white */
        /* font: #313439 or #8E8E93 */
        /* arrow: black gray */
        {
          title: '청구',
          days: '',
          background: 'gray',
          font: '#313439',
          border: '2px dashed transparent',
          arrow: 'gray',
          isarrow: true
        },
        {
          title: '승인',
          days: '',
          background: 'white',
          font: '#8E8E93',
          border: '2px dashed transparent',
          arrow: 'gray',
          isarrow: true
        },
        {
          title: '수요',
          days: '',
          background: 'white',
          font: '#8E8E93',
          border: '2px dashed #D1D1D6',
          arrow: 'gray',
          isarrow: true
        },
        {
          title: '청약',
          days: '',
          background: 'white',
          font: '#8E8E93',
          border: '2px dashed #D1D1D6',
          arrow: 'gray',
          isarrow: true
        },
        {
          title: '상장',
          days: '',
          background: 'white',
          font: '#8E8E93',
          border: '2px dashed #D1D1D6',
          arrow: 'gray',
          isarrow: false
        }
      ],
      IPOList: []
    }
  },
  methods: {
    goURL (type, url, file) {
      if (type === 'URL') {
        window.open(url, '_BLANK', 'width=500,height=550,top=100,left=100,fullscreen=no,menubar=no,status=no,toolbar=no,titlebar=yes,location=no')
      } else if (type === 'PDF') {
        window.open('https://file.irgo.co.kr/data/BOARD/ATTACH_PDF/' + file, '_BLANK', 'width=500,height=550,top=100,left=100,fullscreen=no,menubar=no,status=no,toolbar=no,titlebar=yes,location=no')
      }
    },
    getIPOData () {
      const _self = this
      const aram = {
        seq: _self.getCompSeq
      }
      this.$store.dispatch('GET_IPO', aram)
        .then(res => {
          if (res.length === 0) {
            _self.isData = false
          } else {
            const CAL_KIND = res[0].CAL_KIND
            let t
            t = (CAL_KIND === 'D' ? t = 1 : (CAL_KIND === 'A' ? t = 2 : (CAL_KIND === 'P' ? t = 3 : (CAL_KIND === 'C' ? t = 4 : (CAL_KIND === 'L' ? t = 5 : (CAL_KIND === 'I' ? t = 3 : 0))))))
            for (let i = 0; i < t; i++) {
              _self.IPODATA[i].background = 'gray'
              _self.IPODATA[i].font = '#313439'
              if (i > 0) {
                _self.IPODATA[i - 1].arrow = 'black'
              }
            }
          }
          if (res.length > 0) {
            if (res[0].DCAL_DATE) {
              const DCAL_DATE = new Date(res[0].DCAL_DATE)
              _self.IPODATA[0].days = ((DCAL_DATE.getMonth() + 1) < 10 ? '0' + (DCAL_DATE.getMonth() + 1) : (DCAL_DATE.getMonth() + 1)) + '/' + (DCAL_DATE.getDate() < 10 ? '0' + DCAL_DATE.getDate() : DCAL_DATE.getDate())
            }
            if (res[0].ACAL_DATE) {
              const ACAL_DATE = new Date(res[0].ACAL_DATE)
              _self.IPODATA[1].days = ((ACAL_DATE.getMonth() + 1) < 10 ? '0' + (ACAL_DATE.getMonth() + 1) : (ACAL_DATE.getMonth() + 1)) + '/' + (ACAL_DATE.getDate() < 10 ? '0' + ACAL_DATE.getDate() : ACAL_DATE.getDate())
            }
            if (res[0].DF_START_DATE && res[0].DF_END_DATE) {
              const DF_START_DATE = new Date(res[0].DF_START_DATE)
              const DF_END_DATE = new Date(res[0].DF_END_DATE)
              _self.IPODATA[2].days = ((DF_START_DATE.getMonth() + 1) < 10 ? '0' + (DF_START_DATE.getMonth() + 1) : (DF_START_DATE.getMonth() + 1)) + '/' + (DF_START_DATE.getDate() < 10 ? '0' + DF_START_DATE.getDate() : DF_START_DATE.getDate()) + ' ~ ' + (DF_END_DATE.getDate() < 10 ? '0' + DF_END_DATE.getDate() : DF_END_DATE.getDate())
            }
            if (res[0].PO_START_DATE && res[0].PO_END_DATE) {
              const PO_START_DATE = new Date(res[0].PO_START_DATE)
              const PO_END_DATE = new Date(res[0].PO_END_DATE)
              _self.IPODATA[3].days = ((PO_START_DATE.getMonth() + 1) < 10 ? '0' + (PO_START_DATE.getMonth() + 1) : (PO_START_DATE.getMonth() + 1)) + '/' + (PO_START_DATE.getDate() < 10 ? '0' + PO_START_DATE.getDate() : PO_START_DATE.getDate()) + ' ~ ' + (PO_END_DATE.getDate() < 10 ? '0' + PO_END_DATE.getDate() : PO_END_DATE.getDate())
            }
            if (res[0].LCAL_DATE) {
              const LCAL_DATE = new Date(res[0].LCAL_DATE)
              _self.IPODATA[4].days = ((LCAL_DATE.getMonth() + 1) < 10 ? '0' + (LCAL_DATE.getMonth() + 1) : (LCAL_DATE.getMonth() + 1)) + '/' + (LCAL_DATE.getDate() < 10 ? '0' + LCAL_DATE.getDate() : LCAL_DATE.getDate()) + ' 예정'
            }
          }
        })
      this.$store.dispatch('GET_IPOJ', aram)
        .then(result => {
          if (result.length > 0) {
            for (var key in result) {
              if (result[key].SET_DATA_TYPE === 1) {
                result[key].TITLE = '공모개요'
                result[key].TYPE = 'PDF'
              } else if (result[key].SET_DATA_TYPE === 2) {
                result[key].TITLE = 'IR BOOK'
                result[key].TYPE = 'PDF'
              } else if (result[key].SET_DATA_TYPE === 3) {
                result[key].TITLE = '웹캐스팅'
                result[key].TYPE = 'URL'
              } else if (result[key].SET_DATA_TYPE === 4) {
                result[key].TITLE = '공모분석보고서'
                if (result[key].TYPE) {
                  result[key].TYPE = (result[key].UPLOAD_FILE1).split('.')[1].toUpperCase()
                } else {
                  result[key].TYPE = 'PDF'
                }
              } else if (result[key].SET_DATA_TYPE === 5) {
                result[key].TITLE = '기업분석보고서'
                if (result[key].TYPE) {
                  result[key].TYPE = (result[key].UPLOAD_FILE1).split('.')[1].toUpperCase()
                } else {
                  result[key].TYPE = 'PDF'
                }
              } else if (result[key].SET_DATA_TYPE === 6) {
                result[key].TITLE = '증권신고서'
                result[key].TYPE = 'PDF'
              }
            }
            _self.IPOList = result
          }
        })
    },
    setMainColor () {
      this.mcolor = '#' + this.getMainColor
    },
    setIsIPO () {
      this.isIPO = this.getIsIPO
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getMainColor', 'getIsIPO'])
  },
  mounted () {
    if (this.getCompSeq) {
      this.getIPOData()
    }
    if (this.getMainColor) {
      this.setMainColor()
    }
    if (this.getIsIPO) {
      this.setIsIPO()
    }
  },
  watch: {
    getIsIPO () {
      this.setIsIPO()
    },
    getMainColor () {
      this.setMainColor()
    },
    getCompSeq () {
      this.getIPOData()
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
#app > div.global-body > div > div:nth-child(8) > div > div:nth-child(5) > div > div {
  display: none;
}
#app > div.mobile-global-body > div > div:nth-child(8) > div > div:nth-child(5) > div > div {
  display: none;
}
#app > div.global-body > div > div:nth-child(7) > div > div:nth-child(5) > div > div {
  display: none;
}
#app > div.mobile-global-body > div > div:nth-child(7) > div > div:nth-child(5) > div > div {
  display: none;
}
.HomeFinanceInfo {
  padding-top: 200px;

    .finance-select {
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
    }

    .finance-info {
      margin-top: 60px;
      list-style: none;

      li {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 40px 20px;
        border-bottom: 1px solid $border-color;
        height: 100px;

        &:first-child {
          border-top: 1px solid $border-color;
        }

        h5 {
          font-size: 18px;
          letter-spacing: -0.5px;
          color: $font-color-base;
        }
        h6 {
          font-size: 18px;
          display: flex;
          align-items: center;
          text-align: right;
          color: $brand-color;
        }
      }
    }
    .IPO-items-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding: 0 40px;
      /* 추가 */
      max-width: 900px;
      /* 추가 */
      margin: 106px auto 0 auto;
    }
    .IPO-items {
      // flex-basis: calc(20% - 52px);
      flex-basis: 128px;
      width: calc(20% - 5px);
      // width: 128px;
      flex-shrink: 0;

      .IPO-wrapper {
        width: 100%;
        position: relative;

        & img {
          width: 100%;
        }
        & .IPO-arrow {
          // width: 20%;
          width:40px;
          position: absolute;
          top: 50%;
          // left: calc(100% + 12px);
          left: calc(100% + 13px);
          transform: translate(0, -50%);
        }
      }

      & h5 {
        color: $font-color-base;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      & h6 {
        text-align: center;
        margin-top: 30px;
        font-size: 22px;
        color: $font-color-base;
        margin: 30px 0 0 0;
        height: 27px;
      }
    }

    @media ( max-width: 899px ) {
      .IPO-items-group {
        .IPO-items {
          flex-basis: 80px;
          .IPO-wrapper{
            & .IPO-arrow {
              width: 30px;
              left: calc(100% + 11px);
            }
          }
        }
      }
      .IPO-items-group {
        max-width:640px;
      }
    }

    @media ( max-width: 640px ) {
      .IPO-items-group {
        .IPO-items {
          flex-basis: 54px;
          .IPO-wrapper{
            & .IPO-arrow {
              width: 9px;
              left: calc(100% + 5px);
            }
          }
        }
      }
      .IPO-items-group {
        max-width:375px;
      }
    }

    @media ( max-width: 1149px ) {
      .IPO-items-group {
        .IPO-items {
          & .IPO-arrow {
            width: 40px;
            left: calc(100% + 13px);
          }
        }
      }
    }

    @media ( max-width: 899px ) {
        // padding: 38px 0;
        padding: 55px 0;
        border-top: 8px solid #EFEFF4;

        .finance-select {
          display: flex;
          justify-content: flex-end;
          margin-top: 13px;
          display: none;
        }

      .finance-info {
        margin-top: 16px;
        list-style: none;
        padding: 0 16px;

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid $border-color;
          height: auto;

          &:first-child {
            border-top: 0;
          }
          h5 {
            font-size: 16px;
            letter-spacing: -0.5px;
            color: $font-color-base;
          }
          h6 {
            font-size: 18px;
            display: flex;
            align-items: center;
            text-align: right;
            color: $brand-color;

            span {
              display: none;
            }
          }
        }
      }

      .IPO-items-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        margin: 50px auto 0;
      }
      .IPO-items {
        // flex-basis: calc(20% - 9px);
        flex-basis: 54px;
        width: calc(20% - 5px);
        flex-shrink: 0;

        .IPO-wrapper {
          width: 100%;
          position: relative;

          & img {
            width: 100%;
          }

          & .IPO-arrow {
            width: 50%;
            position: absolute;
            top: 50%;
            left: calc(100% + 12px);
            transform: translate(0, -50%);
          }
        }

        & h5 {
          color: $font-color-base;
          font-size: 14px;
          margin: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        & h6 {
          text-align: center;
          margin-top: 30px;
          font-size: 11px;
          color: $font-color-base;
          margin: 10px 0 0 0;
        }
      }

    }

}
</style>
