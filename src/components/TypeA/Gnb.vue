<template>
  <div class="wrap" :class="{active:isActive}">
    <div class="gnb-wrap">
      <div class="gnb">
        <h1 class="logo">
          <router-link to="/">
            <img :src="logo" alt="" width="132px" height="24px;">
          </router-link>
        </h1>
        <div class="menu" :class="{active:isActive}">
          <h1 class="logo is_mobile">
            <router-link to="/" :style="{color: mcolor}">
              <!-- <img src="@/assets/images/logo/logo_menu.png" alt=""> -->
              {{ compname }}
            </router-link>
          </h1>
          <a v-on:click="closeMenu('/schedule')"> IR 일정</a>
          <a v-on:click="closeMenu('/announcement')">실적발표</a>
          <a v-on:click="closeMenu('/news')">IR News</a>
          <a v-if="istitle.IRPAGE_FINANCE_YN === 'Y'" v-on:click="closeMenu('/financial')">재무정보</a>
          <a v-if="istitle.IRPAGE_SHOLDER_YN === 'Y'" v-on:click="closeMenu('/status')">주주현황</a>
          <a v-if="istitle.IRPAGE_DISCLOURE_YN === 'Y'" v-on:click="closeMenu('/disclosure')">공시</a>
          <a v-on:click="closeMenu('/report')">경영보고서</a>
          <a v-on:click="closeMenu('/contact')">IR Contact</a>
          <button tpye="button" class="close is_mobile" v-on:click="closeMenu"></button>
        </div>
        <div class="app">
          <a href="#">
            <img src="@/assets/images/icon/android.png" alt="">
          </a>
          <a href="#">
            <img src="@/assets/images/icon/googlePlay.png" alt="">
          </a>
        <button type="button" class="btn-menu is-mobile" v-on:click="openMenu"></button>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      isActive: false,
      istitle: [],
      logo: '',
      compname: '',
      mcolor: ''
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getLogo', 'getCompName', 'getMainColor'])
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.setIsTitle()
    } else {
      const param = {
        'url': window.location.hostname
      }
      _self.$store.dispatch('SET_INFO', param)
    }
    if (_self.getLogo) {
      _self.logo = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + _self.getLogo
    }
    if (_self.getCompName) {
      _self.compname = _self.getCompName
    }
    if (_self.getMainColor) {
      _self.mcolor = '#' + _self.getMainColor
    }
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.setIsTitle()
    },
    getLogo () {
      const _self = this
      _self.logo = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + _self.getLogo
    },
    getCompName () {
      const _self = this
      _self.compname = _self.getCompName
    },
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
    }
  },
  methods: {
    setIsTitle () {
      const _self = this
      const aram = {
        seq: _self.getCompSeq
      }
      this.$store.dispatch('IS_MENU', aram)
        .then(res => {
          _self.istitle = res
        })
    },
    openMenu () {
      this.isActive = !this.isActive
    },
    closeMenu (link) {
      this.isActive = !this.isActive
      if (link) {
        this.$router.push(link)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
@import "@/style/_common.scss";

a {
  cursor: pointer;
}
.wrap {
  max-width:1920px;
  height:100%;
  &.active {
    // overflow:hidden;
  }
}
  .gnb-wrap {
    position: absolute;
    left:0;
    top:36px;
    width:100%;
    padding:0 40px;
    z-index: 11;
    .gnb {
      @include contentWidth();
      display:flex;
      align-items: center;
      .logo {
        margin-right:auto;
      }
    }
    .menu {
      display:flex;
      a {
        font-size:17px;
        color:$white;
        font-weight: 700;
        &+ a {
          margin-left:54px;
        }
      }
    }
    .app {
      display:flex;
      align-items: center;
      justify-content: center;
      width:146px;
      height:50px;
      margin-left:64px;
      border:3px solid rgba(247, 247, 247, 0.3);
      a + a {
        margin-left:37px;
      }
    }
    &.type01 {
      .gnb {
        height:68px;
        background-color:$white;
      }
      .menu {
        a {
          color:#535559;
          font-size:16px;
          font-weight: 500;
          & + a {
            position:relative;
            padding-left:35px;
            margin-left:35px;
            &::after {
              @include virtual();
              background-color:#e0e0e0;
              top:50%;
              right:auto;
              left:0;
              width:1px;
              height:10px;
              transform: translateY(-50%);
            }
          }
        }
      }
      .app {
        height:68px;
        margin-left:38px;
        background-color:#bdc0ca;
        border:none;
      }
    }
  }
@media screen and (max-width: 1400px) {
  .gnb-wrap {
    .menu {
      a {
        & + a {
          margin-left:30px;
        }
      }
    }
    &.type01 {
      .gnb {
        padding:0 20px;
      }
      .menu {
        a {
          & +a {
            margin-left:15px;
            padding-left:15px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1300px) {
  #app > div > div.gnb-wrap > div > div.app {
    display: none;
  }
}
@media screen and (max-width: 1000px) {
  #app > div > div.gnb-wrap > div > div.app {
    display: flex;
  }
    .gnb-wrap {
      top:30px;
      padding:0 30px;
      .menu {
        display:flex;
        flex-direction: column;
        position:fixed;
        left:-100%;
        top:0;
        width:100%;
        height:100%;
        padding:86px 90px 26px 90px;
        background-color:#fff;
        z-index: 300;
        transition:all .5s;
        overflow:auto;
        &.active {
          left:0;
        }
        .logo {
          position:absolute;
          width:100%;
          top:28px;
          left:50%;
          transform: translateX(-50%);
          margin-right:0;
          a {
            display:block;
            width:100%;
            text-align: center;
          }
          img {
            width:auto;
            height:15px;
          }
        }
        a {
          color:#333;
          font-size:17px;
          text-align: center;
          padding-bottom:25px;
          & + a {
            padding-top:25px;
            border-top:1px solid #e4e4e4;
            margin-left:0;
          }
        }
        .close {
          position:absolute;
          right:30px;
          top:30px;
          width:20px;
          height:20px;
          @include bgImg(btn/btn_close_menu);
          background-color:transparent;
          background-size:cover;
        }
      }
      .app {
        width:auto;
        height:auto;
        border:none;
        .btn-menu {
          width:23px;
          height:19px;
          margin-left:22px;
          background-color: transparent;
          @include bgImg(btn/btn_m_menu);
          background-size:cover;
        }
        a {
          & + a {
            margin-left:25px;
          }
        }
      }
      .logo {
        img {
          height:19px;
        }
      }
    }
}
</style>
