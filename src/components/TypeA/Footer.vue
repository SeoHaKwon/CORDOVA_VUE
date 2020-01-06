<template>
  <div class="footer-wrap">
    <div class="footer">
      <h2 class="logo">
        <!-- <img src="@/assets/images/logo/logo_footer.png" alt="로고" /> -->
        <img :src="sublogo" alt="로고" width="132px" height="24px"/>
      </h2>
      <ul class="foot-info">
        <li><span>㈜ {{ COM_NAME }}</span></li>
        <li><span>대표자</span><span>{{ CEO_NAME }}</span></li>
        <li>
          <span>주소</span
          ><span>{{ ADDRESS }}</span>
        </li>
        <li v-if="CEO_TEL"><span>Tel</span><span>{{ CEO_TEL }}</span></li>
        <li><span>Fax</span><span>{{ FAX }}</span></li>
      </ul>
      <p class="copy">{{ COM_NAME_E }} All rights reserved.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    // SubVisual,
    // Footer
  },
  data: () => {
    return {
      COM_NAME: '',
      CEO_NAME: '',
      ADDRESS: '',
      SAUP: '',
      COM_NAME_E: '',
      CEO_TEL: '',
      sublogo: '',
      FAX: ''
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getSubLogo'])
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.getIRData()
    },
    getSubLogo () {
      const _self = this
      _self.sublogo = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + _self.getSubLogo
    }
  },
  methods: {
    getIRData () {
      const _self = this
      const param = {
        seq: _self.getCompSeq
      }
      _self.$store.dispatch('GET_COMINFO', param)
        .then(res => {
          _self.COM_NAME = res[0].COMP_NAME
          _self.CEO_NAME = res[0].CEO_NAME
          _self.ADDRESS = res[0].COM_ADDR
          _self.SAUP = res[0].COMP_REG_NUM
          _self.COM_NAME_E = res[0].COMP_NAME_E
          _self.CEO_TEL = res[0].CEO_TEL
          _self.FAX = res[0].FAX
        })
      if (_self.getSubLogo) {
        const _self = this
        _self.sublogo = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + _self.getSubLogo
      }
    }
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.getIRData()
    }
    if (_self.getLogo) {
      _self.logo = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + _self.getLogo
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
.footer-wrap {
  padding: 58px 0;
  background-color: #f3f3f7;
  .footer {
    @include contentWidth($width: 800px);
    .logo {
      text-align: center;
      padding-bottom: 17px;
      margin-bottom: 15px;
      border-bottom: 1px solid #d9d9e2;
    }
  }
  .foot-info {
    display: flex;
    justify-content: center;
    li {
      display: flex;
      & + li {
        padding-left: 8px;
        margin-left: 8px;
        border-left: 1px solid #cdcdd0;
      }
      span {
        font-size: 13px;
        font-weight: 700;
        color: $gray7;
        & + span {
          margin-left: 8px;
        }
      }
    }
  }
  .copy {
    margin-top: 14px;
    text-align: center;
    font-size: 13px;
    color: #b3b3b3;
  }
}
@media screen and (max-width: 1000px) {
  .footer-wrap {
    padding: 40px 30px 44px 30px;
    .footer {
      .logo {
        padding-bottom: 16px;
        margin-bottom: 14px;
      }
    }
    .foot-info {
      margin-top: -10px;
      justify-content: center;
      flex-wrap: wrap;
      li {
        flex: 0 1 auto;
        margin-top: 10px;
        &:nth-child(4) {
          border-left: none;
        }
        span {
          font-size: 9px;
          & + span {
            margin-left: 2px;
          }
        }
        & + li {
          margin-left: 4px;
          padding-left: 4px;
        }
      }
    }
    .copy {
      margin-top: 10px;
      font-size: 9px;
    }
  }
}
</style>
