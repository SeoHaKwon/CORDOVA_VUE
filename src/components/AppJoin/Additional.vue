<template>
  <div class="wrap">
    <div class="header">
      <a href="#" class="btn-link" v-on:click="$router.go(-1)"></a>
      <strong>추가정보</strong>
    </div>
    <div class="content">
      <div class="input-set">
        <strong class="tit">이메일</strong>
        <input type="text" class="input" placeholder="asd@test.com" v-model="email">
      </div>
      <div class="input-set">
        <strong class="tit">{{ CNAME }} 주식보유 여부</strong>
        <div class="check-group">
          <div class="radio-box">
            <input type="radio" name="ch1" value="Y" v-model="isStock">
            <span>보유</span>
          </div>
          <div class="radio-box">
            <input type="radio" name="ch1" value="N" v-model="isStock">
            <span>미보유</span>
          </div>
          <div class="radio-box">
            <input type="radio" name="ch1" value="O" v-model="isStock">
            <span>과거보유</span>
          </div>
        </div>
      </div>
    <a href="javascript:void(0);" class="btn-bottom" v-on:click="startApp" :style="{'background-color': mcolor}">
      시작하기
    </a>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AskPage',
  data: () => {
    return {
      email: '',
      isStock: '',
      isStart: false,
      CNAME: '',
      mcolor: '#D1D1D6'
    }
  },
  watch: {
    email () {
      this.isNextStep()
    },
    isStock () {
      this.isNextStep()
    },
    getCompName () {
      this.compName()
    }
  },
  mounted () {
    this.compName()
    localStorage.setItem('DI', this.$route.params.di)
  },
  computed: {
    ...mapGetters(['getUserDI', 'getCompSeq', 'getCompName', 'getMainColor'])
  },
  methods: {
    compName () {
      if (this.getCompName) {
        this.CNAME = this.getCompName
      } else {
        this.CNAME = localStorage.getItem('CNAME')
      }
    },
    isNextStep () {
      const _self = this
      if (_self.email && _self.isStock) {
        _self.mcolor = '#' + _self.getMainColor
        _self.isStart = true
      } else {
        _self.mcolor = '#D1D1D6'
      }
    },
    startApp () {
      const _self = this
      if (!(this.email.indexOf('@') !== -1)) {
        window.alert('이메일 형식이 올바르지 않습니다.', false, _self.CNAME, '확인')
        return false
      }
      if (_self.isStart) {
        if (_self.getUserDI) {
          _self.insertData(_self.getUserDI)
        } else if (localStorage.getItem('DI')) {
          _self.insertData(localStorage.getItem('DI'))
        } else {
          window.alert('잘못된 접근입니다.', false, _self.CNAME, '확인')
          _self.$router.replace('/firstStep')
        }
      }
    },
    insertData (di) {
      const _self = this
      const params = {
        'di': di,
        'stock': _self.isStock,
        'email': _self.email,
        'seq': _self.getCompSeq,
        'token': localStorage.getItem('getToken')
      }
      _self.$store.dispatch('SET_APP_DATA', params)
        .then(res => {
          _self.$store.commit('setIsAppJoin', true)
          _self.$store.commit('setUserDI', di)
          _self.$router.replace('/')
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
   padding-bottom:100px;
   .content {
     padding:0 34px;
   }
 }
 .header {
   position: relative;;
   padding-top:14px;
   margin-bottom:56px;
   text-align: center;
   .btn-link {
     display:inline-block;
     position:absolute;
     left:34px;
     top:22px;
     width:10px;
     height:10px;
     transform: rotate(45deg);
     border:2px solid #000;
     border-top:none;
     border-right:none;
     -webkit-tap-highlight-color:transparent;
   }
   strong {
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
     }
   }
  .btn-bottom {
    display:block;
    position:absolute;
    left:0;
    bottom:0;
    width:100%;
    padding:13px 0 53px 0;
    background-color:#D1D1D6;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    &.active {
      background-color:#E91E63;
    }
  }
  .input-set {
    .tit {
      display: inline-block;
      width:100%;
      margin-bottom:15px;
      font-size: 16px;
      line-height: 23px;
      letter-spacing: -0.005em;
      color: #1B1D20;
    }
    .input {
      width:100%;
      outline: none;
      padding-bottom:9px;
      font-size: 16px;
      line-height: 20px;
      color: #8E8E93;
      border:none;
      border-bottom: 0.5px solid #D1D1D6;
    }
    & + .input-set  {
      margin-top:38px;
    }
    .check-group {
      display: flex;
      border: 1px solid #C7C7CC;
      box-sizing: border-box;
      border-radius: 2px;
      .radio-box {
        position: relative;
        width:33.33%;
        input {
          position: absolute;
          left:0;
          top:0;
          width:100%;
          height:100%;
          opacity: 0;
          &:checked {
            & + span {
              background-color:#8E8E93;
              color:#fff;
            }
          }
        }
        span {
          display:inline-block;
          width:100%;
          padding:14px 0;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          color: #8E8E93;
        }
        & +  .radio-box {
          border-left:1px solid #C7C7CC;
        }
      }
    }
  }
 </style>
