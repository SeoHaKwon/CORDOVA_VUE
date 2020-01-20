<template>
  <div class="wrap">
    <h1 class="logo">
      <img :src="logo" width="150px" height="26px" alt="">
    </h1>
    <strong class="tit">
      {{ CNAME }} IR앱에서 <br>
      투자정보/소식을 받아보고, <br>
      IR담당자와<br>소통할 수 있습니다.
    </strong>
    <p class="sub">투자자님의 정보확인을 위해 본인인증을 진행합니다. </p>
    <a href="javascript:void(0);" class="btn-bottom" v-on:click="letsStart" :style="{'background-color': mcolor}">
      인증하기
    </a>
    <form name="form_chk" method="get" >
      <input type="hidden" name="m" value="checkplusSerivce">
      <input type="hidden" name="EncodeData" v-model="encodeData">
      <input type="hidden" name="param_r1" v-model="remoteaddr">
      <input type="hidden" name="param_r2" v-model="seq">
      <input type="hidden" name="param_r3" v-model="opener">
    </form>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'FirstPage',
  data: () => {
    return {
      encodeData: '',
      remoteaddr: '',
      seq: 0,
      CNAME: '',
      logo: '',
      mcolor: '',
      opener: ''
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getCompName', 'getSubLogo', 'getMainColor'])
  },
  watch: {
    getMainColor () {
      this.mcolor = '#' + this.getMainColor
    },
    getCompName () {
      this.compName()
    },
    getSubLogo () {
      this.logo = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + this.getSubLogo
    }
  },
  mounted () {
    this.compName()
    if (this.getSubLogo) {
      this.logo = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + this.getSubLogo
    }
    if (this.getMainColor) {
      this.mcolor = '#' + this.getMainColor
    }
  },
  methods: {
    compName () {
      if (this.getCompName) {
        this.CNAME = this.getCompName
      } else {
        this.CNAME = localStorage.getItem('CNAME')
      }
    },
    nextStep () {
      this.$router.push('/AgreeStep')
    },
    letsStart () {
      const _self = this
      _self.seq = _self.getCompSeq
      axios.post('https://api.irpage.co.kr/api/irgo/getMemberInfo')
        .then(res => {
          return new Promise((resolve, reject) => {
            _self.encodeData = res.data
            if (localStorage.getItem('platform') === 'android' || localStorage.getItem('platform') === 'ios') {
              _self.remoteaddr = window.location.protocol + '//' + window.location.pathname
            } else {
              _self.remoteaddr = window.location.origin
            }
            window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no')
            document.form_chk.action = 'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb'
            document.form_chk.target = 'popupChk'
            // document.form_chk.submit()
            resolve()
          }).then(() => {
            document.form_chk.submit()
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
button {
  border: 0;
}
    .wrap {
      height:100%;
      padding:22px 34px 100px 22px;
    }
    .logo {
      margin-bottom:40px;
    }
    .tit {
      font-weight: 500;
      font-size: 24px;
      line-height: 34px;
      letter-spacing: -0.5px;
      color: #1B1D20;
    }
    .sub {
      margin-top:30px;
      font-size: 13px;
      line-height: 20px;
      letter-spacing: -0.5px;
      color: #8E8E93;
    }
    .btn-bottom {
      display:block;
      position:absolute;
      left:0;
      bottom:0;
      width:100%;
      padding:13px 0 53px 0;
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      text-align: center;
      color: #FFFFFF;
    }
 </style>
