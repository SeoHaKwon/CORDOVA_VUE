<template>
  <div class="wrap">
    <div style="flex: 1;">
    <div class="header">
      <a href="javascript:void(0);" class="btn-link" v-on:click="goBack"></a>
      <strong>문의하기</strong>
    </div>
    <div class="content">
      <strong class="tit" v-if="isFocus">
        {{ compname }}에<br>
        궁금하신 내용을 문의 주시면<br>
        IR담당자가 직접 답변 드립니다.
      </strong>
      <p class="sub" v-if="isFocus">
        등록된 이메일과 푸시알림으로 답변이 전달됩니다.
      </p>
     <div class="textarea-wrap">
       <strong class="tit">문의 내용</strong>
       <div class="textarea">
        <textarea name="" id="" cols="30" rows="10" v-on:focus="focusEvent" v-on:blur="blurEvent" v-model="textData"></textarea>
        <p class="txt" v-if="isFocus && textData.length === 0">
          <strong>질문 내용을 입력해주세요.</strong>
          (작성글은 300자 내로 제한됩니다.) <br>
          반말, 욕설, 비방, 홍보, 광고 등 부적절한 내용의 문의 내용에 대해서는 답변을 드릴 수 없으며 추후 이용에 제한을 둘 수 있습니다.
        </p>
        <div class="max-txt"><span>{{ textData.length }}</span>/300</div>
       </div>
     </div>
    </div>
    </div>
    <div v-if="isFocus" style="position: absolute;bottom: 0;width: 100%;">
    <a href="javascript:void(0);" class="btn-bottom" :style="{'background-color': mcolor}" v-on:click="sendQA">
      IR담당자에게 전송
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
      isFocus: true,
      textData: '',
      SEQ: 0,
      DI: '',
      compname: '',
      mcolor: '#D1D1D6'
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getUserDI', 'getCompName', 'getMainColor'])
  },
  mounted () {
    this.compName()
  },
  watch: {
    getCompName () {
      this.compName()
    }
  },
  methods: {
    compName () {
      if (this.getCompName) {
        this.compname = this.getCompName
      } else {
        this.compname = localStorage.getItem('CNAME')
      }
    },
    focusEvent () {
      const top = document.querySelector('body')
      this.isFocus = false
      top.scroll('top', 0)
    },
    blurEvent () {
      this.isFocus = true
      const _self = this
      if (_self.textData.length === 0) {
        _self.mcolor = '#D1D1D6'
      } else {
        _self.mcolor = '#' + _self.getMainColor
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    activeBtn () {
      if (this.textData.length === 0 && this.isFocus) {
        return false
      } else {
        return true
      }
    },
    sendQA () {
      const _self = this
      if (_self.getCompSeq) {
        _self.SEQ = _self.getCompSeq
      } else {
        _self.SEQ = localStorage.getItem('SEQ')
      }
      if (_self.getUserDI) {
        _self.DI = _self.getUserDI
      } else {
        _self.DI = localStorage.getItem('DI')
      }
      if (this.textData.length === 0 || this.textData.replace(' ', '').length === 0) {
        window.alert('내용을 작성 해 주세요.', false, _self.getCompName, '확인')
      } else if (this.textData.length > 300) {
        window.alert('글자 수가 초과되었습니다.', false, _self.getCompName, '확인')
      } else {
        const aram = {
          seq: _self.SEQ,
          di: _self.DI,
          textData: _self.textData
        }
        this.$store.dispatch('SET_QA', aram)
          .then(() => {
            window.alert('전송완료 되었습니다.', false, _self.getCompName, '확인')
            _self.$router.replace('/')
          })
      }
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
   display:flex;
   flex-direction: column;
   height:100%;
   min-height:568px;
   margin-top: 5vh;
   .content {
     padding:0 34px;
     margin-bottom:auto;
     & +.btn-bottom {
       margin-top:20px;
     }
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
    left:0;
    bottom:0;
    width:100%;
    margin-top:auto;
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
  .tit {
    font-weight: 500;
    font-size: 21px;
    line-height: 28px;
    letter-spacing: -0.5px;
    color: #1B1D20;
  }
  .sub {
    margin-top:10px;
    margin-bottom:38px;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.5px;
    color: #EB5757;
  }
  .textarea-wrap {
    .tit {
      display:inline-block;
      margin-bottom:10px;
      font-weight: 500;
      font-size: 16px;
      line-height: 23px;
      letter-spacing: -0.005em;
      color: #1B1D20;
    }
  }
  .textarea {
    position:relative;
    background: #FFFFFF;
    border: 1px solid #EFEFF4;
    box-sizing: border-box;
    border-radius: 4px;
    padding:17px 18px;
    textarea {
      position: relative;
      width:100%;
      height:100%;
      resize:none;
      border:none;
      box-sizing: border-box;
      outline: none;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: -0.5px;
      color: #545454;
      background-color: transparent;
      z-index: 50;
      &::placeholder {
        font-size: 16px;
        line-height: 22px;
        letter-spacing: -0.5px;
        color: #8E8E93;
      }
      &:focus {
        & + .txt {
          display:none;
        }
      }
    }
    .txt {
      position:absolute;
      width:calc(100% - 36px);
      left:18px;
      top:17px;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: -0.5px;
      color: #8E8E93;
      strong {
        display: inline-block;
        width:100%;
        margin-bottom:6px;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: -0.5px;
        color: #8E8E93;
      }
    }
    .max-txt {
      position:absolute;
      right:15px;
      bottom:14px;
      font-size: 14px;
      line-height: 22px;
      color: #8E8E93;
      span {
        color:#2f80ed;
      }
    }
  }
 </style>
