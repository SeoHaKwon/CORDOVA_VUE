<template>
  <div>
    <div class="desktop-header">
      <NavigationBar :scrollResult="scrollTemp"/>
    </div>
    <!-- /ask가 아닌경우는 FAQ 질문하기 페이지 진입시 상단의 헤더가 보여지지 않게 하기 위함이다. -->
    <div class="mobile-header" v-if="$route.fullPath !== '/ask'">
      <MobileNavigaterBar :scrollResult="scrollTemp"/>
    </div>
    <div
      :class="{'global-body': widths >= 900 && $route.fullPath !== '/ask', 'mobile-global-body': widths < 900 && $route.fullPath !== '/ask'}"
      style="overflow: hidden"
    >
      <router-view/>
    </div>
    <template v-if="$route.fullPath !== '/ask'">
      <footerBody />
    </template>
    <!-- 하단의 팝업창은 앱으로의 접근이 아닌 모바일웹으로의 접근시 보여주어야 한다. -->
    <div v-if="isAppDownloadModal" class="app-download-modal">
      <div class="content">
        <h3>주주와 함께하는 {{ cname }}</h3>
        <h4>{{ cname }} IR앱에서 투자정보/소식을 받아보고, <br /> IR담당자와 소통할 수 있습니다.</h4>
        <div class="app-download-btn" @click="appDownloadModalClose()">
            앱 다운로드
          </div>
        <h5 @click="appDownloadModalClose()">
          모바일 웹에서 계속보기
        </h5>
      </div>
    </div>
    <Spinner :loading="loadingStatus"></Spinner>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import NavigationBar from '@/components/TypeB/NavigationBar.vue'
import MobileNavigaterBar from '@/components/TypeB/MobileNavigaterBar.vue'
import FooterBody from '@/components/TypeB/FooterBody.vue'
import ModalDesktop from '@/components/TypeB/ModalDesktop.vue'
import bus from '@/utils/bus'
import Spinner from '@/components/TypeB/Spinner'
Vue.component('modal-desktop', ModalDesktop)

export default {
  name: 'app',
  components: {
    NavigationBar,
    MobileNavigaterBar,
    FooterBody,
    Spinner
  },
  props: ['scrollTemp'],
  data () {
    return {
      isMobile: false,
      fullPath: '',
      isAppDownloadModal: false,
      widths: window.innerWidth,
      cname: '',
      loadingStatus: false
    }
  },
  created () {
    // bus.$on('start:spinner', this.startSpinner)
    // bus.$on('end:spinner', this.endSpinner)
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy () {
    // bus.$off('start:spinner', this.startSpinner)
    // bus.$off('end:spinner', this.endSpinner)
  },
  computed: {
    ...mapGetters(['getCompName', 'getCompSeq'])
  },
  watch: {
    getCompName () {
      const _self = this
      bus.$emit('start:spinner')
      _self.cname = _self.getCompName
      _self.setTITLE()
    },
    loadingStatus () {
      const _self = this
      if (_self.loadingStatus) {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      } else {
        document.getElementsByTagName('body')[0].style.overflow = 'inherit'
      }
    }
  },
  methods: {
    appDownloadModalClose () {
      this.isAppDownloadModal = false
    },
    handleResize () {
      this.widths = window.innerWidth
    },
    startSpinner () {
      this.loadingStatus = true
    },
    endSpinner () {
      this.loadingStatus = false
    },
    setTITLE () {
      const _self = this
      let title = document.getElementsByTagName('title')[0]
      title.innerHTML = _self.getCompName
    }
  },
  mounted () {
    const _self = this
    if (window.outerWidth < 900) {
      this.isMobile = true
    }
    this.fullPath = this.$route.fullPath
    if (this.getCompName) {
      this.setTITLE()
    }
    /* 방문로그 시작 */
    /* ANDROID 및 IOS는 locations에 localStorage.getItem('DI') 로 넣어주어야 함 */
    /* 조건도 걸어주어야함. 회원가입을 했을때 넣어주어야 하기때문 */
    if (localStorage.getItem('DI') && (!localStorage.getItem('SETLOG') || new Date().getDate() !== new Date(localStorage.getItem('SETLOG')).getDate())) {
      let seq = _self.getCompSeq || localStorage.getItem('SEQ')
      const param = {
        'locations': localStorage.getItem('DI'),
        'platform': 'ANDROID',
        'seq': seq
      }
      _self.$store.dispatch('SET_LOG', param)
        .then(res => {
          localStorage.setItem('SETLOG', new Date())
        })
      /* 방문 로그 끝 */
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700&display=swap&subset=korean');
@import "@/style/_variables.scss";

.performance-group-tab li, .schedule-list li{
  cursor: pointer;
}

* {
  word-break: keep-all;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-weight: inherit;
/*  text-decoration: none; */
}
.modal-map {
  font-size: 14px;
  text-align: center;
  color: #8E8E93;
  opacity: 0.87;
}
.social-sns {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & img {
    margin-left: 10px;
  }
}
.social-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 21px;

  .date {
    font-size: 14px;
    color: #8E8E93;
  }
}
.IR-modal-list {
  list-style: none;
  margin-top: 50px;

  li {
    padding: 26px;
    border-top: 1px solid $border-color;
    display: flex;
    justify-content: left;
    align-items: center;

    &:last-child {
      border-bottom: 1px solid $border-color;
    }

    img {
        margin-right: 20px;
    }
    h5 {
        margin-right: 50px;
    }
    h4 {
    }
  }
}
.modal-desktop-close {
  position: fixed;
  right: 50px;
  top: 70px;

  & img {
    cursor: pointer;
  }
}
input {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.overflow-hidden {
  overflow: hidden;
}
.global-body {
  margin-top: $global-margin-top;
  overflow: hidden;
}
.mobile-global-body {
  margin-top: $mobile-global-margin-top;
}
.flex-lefet-center {
  display: flex;
  justify-content: left;
  align-items: center;
}
.check-box-wrap {
  & label {
    display: flex;
    justify-content: left;
    align-items: center;

    & input {
      opacity: 0;
      position: absolute;
    }
    & .checkbox {
      flex-shrink: 0;
      flex-basis: 24px;
      width: 24px;
      height: 24px;
      border: 0.5px solid #D1D1D6;
      border-radius: 5px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.15s ease-in-out;
    }
    & input[type="checkbox"]:checked +  .checkbox {
      background: #E91E63;
      border-color: transparent;

      &:after {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        background: url('/assets/img/join/ic_checked.png') center center no-repeat / contain;
      }
    }
    & .text {
      flex: 1;
      margin-left: 11px;
    }
  }
}
.check-box-wrap.size-lg {
  & .checkbox {
    flex-basis: 41px;
    width: 41px;
    height: 41px;
  }
  & input[type="checkbox"]:checked +  .checkbox {
    &:after {
      width: 21px;
      height: 21px;
    }
  }
}
.radio-wrap {
  width: 100%;
  & label {
  display: block;
  text-align: center;
    & input {
      opacity: 0;
      position: absolute;
    }
    .radio-box {
      background: #FFFFFF;
      border: 1px solid #D1D1D6;
      border-radius: 4px;
      padding: 12px;
    }
    & input[type="radio"]:checked +  .radio-box {
        background: #E91E63;
        color: #ffffff;
        border-color: transparent;
    }
  }
}
.mobile-header {
  display: none;
}
.desktop-header {
  display: block;
}
.modal-mobile-header {
  display: none;
}
.app-download-modal {
  display: none;
}
@media (max-width: 899px) {
  .app-download-modal {
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    left: 0;
    top: 0;
    z-index: 10000000000;

    .content {
      padding: 47px;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 10px 10px 0 0;
      background: #fff;
      width: 100%;
      text-align: center;

      h3 {
        font-size: 20px;
        letter-spacing: -0.005em;
        color: #313439;
        font-weight: bold;
      }
      h4 {
        font-size: 12px;
        letter-spacing: -0.005em;
        color: #545454;
        margin-top: 8px;
      }
      .app-download-btn {
        background: $brand-color;
        padding: 11px 0;
        width: 100%;
        border-radius: 4px;
        font-weight: bold;
        font-size: 16px;
        color: #fff;
        margin-top: 26px;
        cursor: pointer;
      }
      h5 {
        font-size: 16px;
        letter-spacing: -0.005em;
        color: #8E8E93;
        margin-top: 13px;
        cursor: pointer;
      }

    }
  }
  .mobile-header {
    display: block;
  }
  .desktop-header {
    display: none;
  }
  // .social-info {
  //   // display: none;
  // }
  .modal-map {
    display: none;
  }
  .modal-desktop-close {
    display: none;
  }
  .modal-mobile-header {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 9px;
    color: $brand-color;
    border-bottom: 1px solid $border-color;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 9999999999;
    font-size: 20px;
    font-weight: 700;

    img {
      margin-right: 10px;
    }
  }
}
</style>
