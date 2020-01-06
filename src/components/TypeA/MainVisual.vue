<template>
  <div class="main-visual">
    <div class="visual-text">
      <div class="inner">
        <div class="status-info" v-if="Price.NowJuka && isView">
          <p class="price">
            <span class="en">{{ Price.NowJuka }}</span>
           </p>
          <dl>
            <dt>전일 대비</dt>
            <dd class="up en"><span v-html="Price.DungRak"/> {{ Price.Debi }}</dd>
          </dl>
          <dl>
            <dt>등락률</dt>
            <dd class="en">{{ Price.Cent }}%</dd>
          </dl>
          <dl>
            <dt>시가총액</dt>
            <dd>{{ Price.totals }} 억</dd>
          </dl>
        </div>
        <div class="icon-scroll en is_pc">
          Scroll Down
        </div>
        <strong class="en visual-title">
          INVESTOR<br>
          RELATIONS
        </strong>
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
      isView: false
    }
  },
  computed: {
    ...mapGetters(['getCompCode', 'GETISVIEW'])
  },
  watch: {
    getCompCode () {
      const _self = this
      _self.getData()
    },
    GETISVIEW () {
      const _self = this
      _self.getIsView()
    }
  },
  mounted () {
    const _self = this
    if (_self.getCompCode) {
      _self.getData()
    }
    if (_self.GETISVIEW) {
      _self.getIsView()
    }
  },
  methods: {
    removeComma (str) {
      let n = parseInt(str.replace(/,/g, ''))
      return Number(n)
    },
    getIsView () {
      const _self = this
      if (_self.GETISVIEW) {
        if (_self.GETISVIEW.stock === 'Y') {
          _self.isView = true
        }
      }
    },
    getData () {
      const _self = this
      if (_self.getCompCode) {
        const param = {
          code: _self.getCompCode
        }
        _self.$store.dispatch('GET_KRX', param)
          .then(res => {
            _self.Price = res
            _self.Price.totals = (_self.removeComma(res.NowJuka) * _self.removeComma(res.Amount) / 100000000).toFixed(2)
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
  .main-visual {
    position: relative;
    padding-top:280px;
    overflow: hidden;
    z-index: 10;
    img {
      position:relative;
      left:50%;
      transform: translateX(-50%);
      width:1920px;
    }
    .visual-text {
      left:0;
      bottom:0;
      width:100%;
      padding-bottom:170px;
      .inner {
        position:relative;
        display:flex;
        @include contentWidth();
        .icon-scroll {
          position: absolute;
          left:50%;
          bottom:0;
          padding-top:53px;
          font-size:13px;
          color:#8c8c90;
          @include bgImg(bg/bg_mouse,$pos:center top);
          transform: translateX(-50%);
        }
      }
      .visual-title {
        position:relative;
        display:inline-block;
        padding-top:27px;
        margin-right:auto;
        font-size:93px;
        line-height:105px;
        color:$white;
        font-weight:900;
        &::after {
          @include virtual();
          width:54px;
          height:2px;
          background-color:$white;
        }
      }
      .status-info {
        position:absolute;
        right:0;
        bottom:0;
        .price {
          text-align: right;
          span{
            display: inline-block;
            padding-left:31px;
            margin-bottom:52px;
            color:$white;
            font-size:32px;
            font-weight: 900;
            @include bgImg(bg/bg_dollar,$pos:left bottom);
          }
        }
        dl {
          position:relative;
          padding-right:89px;
          dt {
            font-size:14px;
            line-height:16px;
            color:#818284;
            text-align: right;
          }
          dd {
            position:absolute;
            right:0;
            top:0;
            font-size:14px;
            line-height:16px;
            color:$white;
            &.up {
              padding-left:20px;
              // @include bgImg(bg/bg_up,$pos:left bottom);
            }
          }
          & + dl {
            margin-top:17px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1300px) {
    .main-visual {
      .visual-text {
        .inner {
          .icon-scroll {
            display: none;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1000px) {
    .main-visual {
      padding:163px 30px 0 30px;
      .visual-text {
        .visual-title {
          padding-top:17px;
          font-size:38px;
          line-height: 44px;
          &::after {
            width:14px;
            height:2px;
          }
        }
        .inner {
          display:block;
          .status-info {
            position: static;
            margin-bottom:100px;
            .price {
              padding-top:16px;
              text-align: left;
              &::after {
                @include virtual();
                width:14px;
                height:2px;
                background-color:#fff;
              }
              span {
                padding-left:22px;
                 margin-bottom:20px;
                @include bgImg(bg/bg_dollar_m,$pos:left bottom 3px);
                background-size:14px auto;
                font-size:20px;
              }
            }
            dl {
              display:flex;
              padding-right:0;
              dt {
                flex:0 0 60px;
                font-size:11px;
                line-height:12px;
                color:#fff;
                text-align: left;
              }
              dd {
                position:static;
                font-size:11px;
                line-height:12px;
                &.up {
                  background-size:auto 12px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
