<template>
  <div class="MobileNavigaterBar">
    <header v-if="is_header">
      <div class="header-logo">
        <img width="92px" height="26px" :src="logo" />
      </div>

      <!-- <img width="24px" src="../assets/img/ic_menu.png" class="header-menu" v-on:click="headerMenuBtn()"/> -->
    <a class="menu-trigger type7" v-on:click="headerMenuBtn()">
      <span></span>
      <span></span>
      <span></span>
    </a>
    <div class="header-navigation">
      <div class="mobile_back_view" v-if="isBackMobileView">
      </div>
      <transition name="slide">
        <ul v-if="isMenuShow">
          <li class="topheader">Investor Relations</li>
          <li v-for="(item, idx) in v_list" v-bind:key="idx" v-on:click="goMenuBtn(item.c_name)">
            <a href="javascript:void(0)">
              {{ item.title }}
            </a>
          </li>
          <li v-on:click="headerMenuBtn()">
            <a>
              <svg style="width:32px;height:32px" viewBox="0 0 24 24">
                <path fill="#C7C7CC" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </a>
          </li>
        </ul>
        </transition>
      </div>
    </header>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'MobileNavigaterBar',
  components: {
  },
  data () {
    return {
      isMenuShow: false,
      logo: '',
      isBackMobileView: false,
      h_list: [
        { 'title': '실적발표', 'isActive': true, 'color': '', 'c_name': 'Performance', 'isView': true },
        { 'title': 'FAQ', 'isActive': false, 'color': '', 'c_name': 'FAQ', 'isView': false },
        { 'title': 'IR News', 'isActive': false, 'color': '', 'c_name': 'IrNews', 'isView': true },
        { 'title': '경영보고서', 'isActive': false, 'color': '', 'c_name': 'Report', 'isView': false },
        { 'title': '재무정보', 'isActive': false, 'color': '', 'c_name': 'Finance', 'isView': true },
        { 'title': '공시', 'isActive': false, 'color': '', 'c_name': 'Disclosure', 'isView': true },
        { 'title': '주주현황', 'isActive': false, 'color': '', 'c_name': 'ShareHolder', 'isView': true },
        { 'title': 'IR Contact', 'isActive': false, 'color': '', 'c_name': 'Contact', 'isView': true }
      ],
      v_list: [],
      originScroll: 0,
      is_header: true
    }
  },
  props: [
    'scrollResult'
  ],
  filters: {
  },
  computed: {
    ...mapGetters(['getSubLogo', 'GETISVIEW', 'getIsIPO', 'getmReportlen', 'getQALEN'])
  },
  watch: {
    scrollResult () {
      this.getScroll()
    },
    isMenuShow () {
      this.isShow()
    },
    getSubLogo () {
      this.logo = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + this.getSubLogo
    },
    getIsIPO () {
      this.getIPO()
    },
    getmReportlen () {
      this.getreportlen()
    },
    getQALEN () {
      this.getQA()
    },
    GETISVIEW () {
      this.isView()
    },
    '$route.params' () {
      this.is_header = true
    }
  },
  mounted () {
    if (this.scrollResult) {
      this.getScroll()
    }
    if (this.isMenuShow) {
      this.isShow()
    }
    if (this.getSubLogo) {
      this.logo = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + this.getSubLogo
    }
    if (this.getIsIPO) {
      this.getIPO()
    }
    if (this.getmReportlen) {
      this.getreportlen()
    }
    if (this.getQALEN) {
      this.getQA()
    }
    if (this.GETISVIEW) {
      this.isView()
    }
  },
  methods: {
    isView () {
      const _self = this
      for (let i = 0; i < _self.h_list.length; i++) {
        if (_self.GETISVIEW[_self.h_list[i].c_name] === 'N') {
          _self.h_list[i].isView = false
        }
      }
      _self.v_list = _.filter(_self.h_list, ['isView', true])
    },
    getQA () {
      const _self = this
      if (_self.getQALEN > 0) {
        _self.h_list[1].isView = true
      }
      _self.v_list = _.filter(_self.h_list, ['isView', true])
    },
    getreportlen () {
      const _self = this
      if (_self.getmReportlen > 0) {
        _self.h_list[3].isView = true
      }
      _self.v_list = _.filter(_self.h_list, ['isView', true])
    },
    getIPO () {
      const _self = this
      if (_self.getIsIPO === 'CT02') {
        _self.h_list[0].title = 'IPO정보'
        _self.h_list[0].c_name = 'IPO'
      }
    },
    isShow () {
      const _self = this
      const bodyTag = document.getElementsByTagName('body')[0]
      if (_self.isMenuShow) {
        bodyTag.style.overflow = 'hidden'
      } else {
        bodyTag.style.overflow = 'inherit'
      }
    },
    getScroll () {
      const _self = this
      if (_self.scrollResult > _self.originScroll) {
        _self.is_header = false
        if (_self.scrollResult === 100 && _self.originScroll === 0) {
          _self.is_header = true
        }
      } else {
        _self.is_header = true
      }
      _self.originScroll = _self.scrollResult
    },
    headerMenuBtn () {
      const _self = this
      _self.setPopup()
    },
    goMenuBtn (cname) {
      const _self = this
      location.href = '#' + cname
      _self.changesetPopup(cname)
    },
    changesetPopup (cname) {
      this.isBackMobileView ? this.isBackMobileView = false : this.isBackMobileView = true
      this.isMenuShow ? this.isMenuShow = false : this.isMenuShow = true
      if (document.querySelector('.menu-trigger').classList[1] === 'active-7') {
        document.querySelector('.menu-trigger').classList.remove('active-7')
        document.querySelector('.menu-trigger').classList.add('type7')
      } else {
        document.querySelector('.menu-trigger').classList.add('active-7')
        document.querySelector('.menu-trigger').classList.remove('type7')
      }
      setTimeout(function () {
        location.href = `#${cname}`
      }, 50)
    },
    setPopup () {
      this.isBackMobileView ? this.isBackMobileView = false : this.isBackMobileView = true
      this.isMenuShow ? this.isMenuShow = false : this.isMenuShow = true
      if (document.querySelector('.menu-trigger').classList[1] === 'active-7') {
        document.querySelector('.menu-trigger').classList.remove('active-7')
        document.querySelector('.menu-trigger').classList.add('type7')
      } else {
        document.querySelector('.menu-trigger').classList.add('active-7')
        document.querySelector('.menu-trigger').classList.remove('type7')
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
a {
  text-decoration: none;
}
/* slide down 관련 css 추가 */
.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
/* slide down 관련 css 추가 끝 */
/* 햄버거 메뉴 관련 css 추가 */
.menu-trigger,
.menu-trigger span {
  display: inline-block;
  transition: all .4s;
  box-sizing: border-box;
  cursor:pointer;
}

.menu-trigger {
  position: relative;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 20px;
  top: 58%;
  margin-top: -12px;
}

.menu-trigger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: black;
  border-radius: 4px;
}

.menu-trigger span:nth-of-type(1) {
  top: 0;
}

.menu-trigger span:nth-of-type(2) {
  top: 7px;
}

.menu-trigger span:nth-of-type(3) {
  bottom: 8px;
}

/* 라인이 하나로 합쳐졌다가 엑스자 만들기 */
.menu-trigger.type7 span:nth-of-type(1) {
  -webkit-animation : menu-bar07-01 .75s forwards;
  animation : menu-bar07-01 .75s forwards;
}
@-webkit-keyframes menu-bar07-01 {
  0% {
    -webkit-transform : translateY(7px) rotate(45deg);
  }
  50% {
    -webkit-transform : translateY(7px) rotate(0);
  }
  100% {
    -webkit-transform : translateY(0) rotate(0);
  }
}
@keyframes menu-bar07-01 {
  0% {
    transform : translateY(7px) rotate(45deg);
  }
  50% {
    transform : translateY(7px) rotate(0);
  }
  100% {
    transform : translateY(0) rotate(0);
  }
}
.menu-trigger.type7 span:nth-of-type(2) {
  transition : all .25s .25s;
  opacity : 1;
}
.menu-trigger.type7 span:nth-of-type(3) {
  -webkit-animation : menu-bar07-02 .75s forwards;
  animation : menu-bar07-02 .75s forwards;
}
@-webkit-keyframes menu-bar07-02 {
  0% {
    -webkit-transform : translateY(-7px) rotate(-45deg);
  }
  50% {
    -webkit-transform : translateY(-7px) rotate(0);
  }
  100% {
    -webkit-transform : translateY(0) rotate(0);
  }
}
@keyframes menu-bar07-02 {
  0% {
    transform : translateY(-7px) rotate(-45deg);
  }
  50% {
    transform : translateY(-7px) rotate(0);
  }
  100% {
    transform : translateY(0) rotate(0);
  }
}
.menu-trigger.active-7 span:nth-of-type(1) {
  -webkit-animation : active-menu-bar07-01 .75s forwards;
  animation : active-menu-bar07-01 .75s forwards;
}
@-webkit-keyframes active-menu-bar07-01 {
  0% {
    -webkit-transform : translateY(0) rotate(0);
  }
  50% {
    -webkit-transform : translateY(7px) rotate(0);
  }
  100% {
    -webkit-transform : translateY(7px) rotate(45deg);
  }
}
@keyframes active-menu-bar07-01 {
  0% {
    transform : translateY(0) rotate(0);
  }
  50% {
    transform : translateY(7px) rotate(0);
  }
  100% {
    transform : translateY(7px) rotate(45deg);
  }
}
.menu-trigger.active-7 span:nth-of-type(2) {
  opacity : 0;
}
.menu-trigger.active-7 span:nth-of-type(3) {
  -webkit-animation : active-menu-bar07-02 .75s forwards;
  animation : active-menu-bar07-02 .75s forwards;
}
@-webkit-keyframes active-menu-bar07-02 {
  0% {
    -webkit-transform : translateY(0) rotate(0);
  }
  50% {
    -webkit-transform : translateY(-7px) rotate(0);
  }
  100% {
    -webkit-transform : translateY(-7px) rotate(-45deg);
  }
}
@keyframes active-menu-bar07-02 {
  0% {
    transform : translateY(0) rotate(0);
  }
  50% {
    transform : translateY(-7px) rotate(0);
  }
  100% {
    transform : translateY(-7px) rotate(-45deg);
  }
}
/* 햄버거 메뉴 관련 css 추가 끝 */
.mobile_back_view {
  background: rgba(0,0,0,0.3);
  // height: 100vh;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  position: fixed;
  top: 10;
  left: 0;
  // margin-top:7vh;
}
.MobileNavigaterBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: #ffffff;
  z-index: 1500;
  border-bottom: 1px solid $border-color;

  .header-logo {
    height: 21px;
  }

  header {
    padding: 16px;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .header-menu {
      position: absolute;
      left: 16px;
      top: 50%;
      margin-top: -12px;
    }
  }
  .header-navigation {
    position: absolute;
    width: 100%;
    left: 0;
    top: 52px;
    text-align: left;
    background: white;
    padding: 0 40px;
    text-align: left;
    border-radius: 0px 0px 10px 10px / 0px 0px 10px 10px;

    & ul {
    }
    & li:first-child {
      font-size:13px;
      border-bottom: 1px solid #eaeaea!important;
      padding: 40px 0 8px 0!important;
    }
    & li:nth-child(2) {
      padding: 25px 0 8px 0;
    }
    & li:last-child {
      text-align:center;
      padding-top: 35px;
    }
    & li {
      list-style: none;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.8);
      margin: 0 auto;

      &.active {
        & a {
          font-size: 18px;
          font-weight: normal;
        }
      }

      & a {
        font-weight: normal;
        color: black;
        font-size: 18px;
        cursor: pointer;
      }
      & a:hover {
        text-decoration: none;
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
