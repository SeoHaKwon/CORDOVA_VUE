<template>
  <div class="HomeMainVisual">
    <!-- 메인 -->
    <div class="home-main-visual" v-if="isImg" :style="{ 'background': 'url('+Banner+') no-repeat center center/cover' }">
      <div class="home-main-visual-container">
        <h2>Investor Relations</h2>
        <div class="main-information" v-if="Price.NowJuka">
          <div class="title">
            <h4>
              <span class='juka'>{{ Price.NowJuka}}</span><span>원</span>
            </h4>
            <h5><span v-html="Price.DungRak"></span> {{ Price.Debi }} ({{ Price.Cent}}%)</h5>
          </div>
          <h5 class="information">
            거래량 {{ Price.Volume }} 주<br />
            시가총액 {{ Price.totals | currency}}억원
          </h5>
          <h6 class="curtion">
            {{ Price.sumDay }} {{ Price.JongName | botong }} 보통주
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => {
    return {
      Price: [],
      Banner: '',
      BN_Text: 'background-color: rgba(0, 0, 0, 0.4);color: white;padding: 20.35% 36.202%;',
      isImg: true
    }
  },
  computed: {
    ...mapGetters(['getCompCode', 'getBanner'])
  },
  filters: {
    currency: function (value) {
      if (Number(value) > 0) {
        return Number(value).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      } else {
        return '-'
      }
    },
    botong: function (value) {
      if (value.indexOf('보통주') !== -1) {
        return value.replace('보통주', '')
      } else {
        return value
      }
    }
  },
  watch: {
    getCompCode () {
      this.getKrxData()
    },
    getBanner () {
      this.setBanner()
    }
  },
  mounted () {
    if (this.getCompCode) {
      this.getKrxData()
    }
    if (this.getBanner) {
      this.setBanner()
    }
  },
  methods: {
    setBanner () {
      const _self = this
      if (_self.getBanner == null) {
        _self.isImg = false
      } else {
        _self.Banner = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + _self.getBanner
      }
    },
    getKrxData () {
      const _self = this
      if (_self.getCompCode) {
        const param = {
          code: _self.getCompCode
        }
        _self.$store.dispatch('GET_KRX', param)
          .then(res => {
            _self.Price = res
            _self.Price.totals = (_self.removeComma(res.NowJuka) * _self.removeComma(res.Amount) / 100000000).toFixed(2)
            _self.getNowDate()
          })
      }
    },
    getNowDate () {
      const _self = this
      let month = new Date().getMonth() + 1
      if (month === 13) {
        month = 1
      }
      let day = new Date().getDate()
      let hour = new Date().getHours()
      let min = new Date().getMinutes()
      hour = hour > 9 ? hour : '0' + hour
      min = min > 9 ? min : '0' + min
      const sum = month + '/' + day + ' ' + hour + ':' + min
      _self.Price.sumDay = sum
    },
    removeComma (str) {
      let n = parseInt(str.replace(/,/g, ''))
      return Number(n)
    }
  }
}
</script>

<style lang="scss">
@import "@/style/_variables.scss";
.HomeMainVisual {
  .home-main-visual {
    background: url('/assets/img/img_main_visual.png') no-repeat center center / cover;
    width: 100%;
    height: 500px;

    .home-main-visual-container {
      width: 1150px;
      height: 100%;
      margin: 0 auto;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .main-information {
        width: 274px;
        background: $font-color-base;
        opacity: 0.9;
        padding: 26px 36px;
        position: absolute;
        bottom: 0;
        right: 0;
        color: #fff;

        .title {

          & h4 {
            font-weight: bold;
            font-size: 34px;
            .juka {
              font-family: 'Roboto', sans-serif;
            }

            & span:nth-child(2) {
              font-size:22px;
              margin-left: 5px;
              font-weight:500;
              line-height: 33px;
            }

            @media ( max-width: 899px ) {
              & span:nth-child(2) {
                font-size:12px;
                line-height: 25px;
              }
            }
          }
          & h5 {
            font-size: 16px;
            margin-top: 9px;
            font-family: 'Roboto', sans-serif;
          }
        }
        .information {
          font-size: 16px;
          line-height: 24px;
          margin-top: 14px;
          font-weight:400;
        }
        .curtion {
          margin-top: 59px;
          font-size: 10px;
        }
      }
    }

    & h2 {
      font-size: 34px;
      color: #FFFFFF;
      font-weight: 500;
      text-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
      font-family: 'Roboto', sans-serif;
    }
  }

  @media (min-width: 900px) and (max-width: 1149px) {
    .home-main-visual-container {
      width: 900px !important;
    }
  }

  @media ( max-width: 899px ) {
    .home-main-visual {
      height: 300px;

      .home-main-visual-container {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        padding: 20px;

        .main-information {
          width: 100%;
          background: $font-color-base;
          opacity: 0.9;
          padding: 13px 20px;
          position: relative;
          bottom: 0;
          left: 0;
          color: #fff;

          .title {
            display: flex;
            align-items: flex-end;
            & h4 {
              margin-bottom: 0;
              font-weight: bold;
              font-size: 24px;
            }

            .juka {
              font-family: 'Roboto', sans-serif;
            }

            & h5 {
              font-size: 12px;
              margin-top: 0;
              margin-left: 10px;
              margin-bottom: 2px;
              font-family: 'Roboto', sans-serif;
            }
          }
          .information {
            display: none;
            font-size: 16px;
            line-height: 24px;
            margin-top: 14px;
          }
          .curtion {
            margin-top: 4px;
            font-size: 10px;
          }
        }
      }
      & h2 {
        color: #ffffff;
        font-size: 24px;
        font-weight: 500;
        height: calc(100% - 0px);
        display: flex;
        align-items: center;
        // margin-bottom: 2.5rem;
      }
    }
  }
}
</style>
