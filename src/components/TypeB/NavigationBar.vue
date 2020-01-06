<template>
  <div class="NavigationBar">
    <header>
      <div class="header-logo" v-on:click="moveMain()">
        <img width="130px" v-if="isImg" :src="logo" />
      </div>
      <div class="header-navigation-box">
        <ul class="header-navigation">
          <li v-for="(item, idx) in v_list" :class="{active: item.isActive}" v-on:click="moveCategory(idx, item.c_name)" v-bind:key="item.title">
            <a href="javascript: void(0)" :style="{color: item.color}" v-scroll-to="{el: '#'+item.c_name, container: 'body', duration: 500}">
              {{ item.title }}
            </a>
          </li>
        </ul>
      </div>
      <div class="header-mobile-icon">
        <router-link to="/join" v-if="false">
          <div class="app-join" :style="{ 'background-color': mcolor }">
            앱 다운로드
          </div>
        </router-link>
      </div>
    </header>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  props: [
    'scrollResult'
  ],
  data: () => {
    return {
      mcolor: '',
      baseColor: '#545454',
      logo: '',
      v_list: [],
      h_list: [
        { 'title': '실적발표', 'isActive': false, 'color': '', 'c_name': 'Performance', 'isView': true },
        { 'title': 'FAQ', 'isActive': false, 'color': '', 'c_name': 'FAQ', 'isView': false },
        { 'title': 'IR News', 'isActive': false, 'color': '', 'c_name': 'IrNews', 'isView': true },
        { 'title': '경영보고서', 'isActive': false, 'color': '', 'c_name': 'Report', 'isView': false },
        { 'title': '재무정보', 'isActive': false, 'color': '', 'c_name': 'Finance', 'isView': true },
        { 'title': '공시', 'isActive': false, 'color': '', 'c_name': 'Disclosure', 'isView': true },
        { 'title': '주주현황', 'isActive': false, 'color': '', 'c_name': 'ShareHolder', 'isView': true },
        { 'title': 'IR Contact', 'isActive': false, 'color': '', 'c_name': 'Contact', 'isView': true }
      ],
      ori_Active: 0,
      isImg: true
    }
  },
  mounted: () => {
    // console.log(document.getElementById('Performance').offsetTop)
    // const _self = this
    // _self.h_list[0].offSet = document.getElementById(_self.h_list[0].c_name).offsetTop
  },
  methods: {
    moveCategory (idx, cname) {
      const _self = this
      if (idx >= 0) {
        _self.v_list[_self.ori_Active].isActive = false
        _self.v_list[_self.ori_Active].color = _self.baseColor
        _self.v_list[idx].isActive = true
        _self.v_list[idx].color = _self.mcolor
        _self.ori_Active = idx
      } else {
        _self.v_list[_self.ori_Active].isActive = false
        _self.v_list[_self.ori_Active].color = _self.baseColor
        _self.ori_Active = 0
      }
      // location.href='#'+cname
    },
    moveMain () {
      location.href = '/'
    }
  },
  computed: {
    ...mapGetters(['getMainColor', 'getSubLogo', 'GETISVIEW', 'getIsIPO', 'getmReportlen', 'getQALEN'])
  },
  watch: {
    getIsIPO () {
      const _self = this
      if (_self.getIsIPO === 'CT02') {
        _self.h_list[0].title = 'IPO정보'
        _self.h_list[0].c_name = 'IPO'
      }
    },
    GETISVIEW () {
      const _self = this
      for (let i = 0; i < _self.h_list.length; i++) {
        if (_self.GETISVIEW[_self.h_list[i].c_name] === 'N') {
          _self.h_list[i].isView = false
        }
      }
      _self.v_list = _.filter(_self.h_list, ['isView', true])
    },
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
      // _self.h_list[0].color = _self.mcolor
    },
    getSubLogo () {
      const _self = this
      if (_self.getSubLogo == null) {
        _self.isImg = false
      } else {
        _self.logo = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + _self.getSubLogo
      }
    },
    getmReportlen () {
      const _self = this
      if (_self.getmReportlen > 0) {
        _self.h_list[3].isView = true
      }
      _self.v_list = _.filter(_self.h_list, ['isView', true])
    },
    getQALEN () {
      const _self = this
      if (_self.getQALEN > 0) {
        _self.h_list[1].isView = true
      }
      _self.v_list = _.filter(_self.h_list, ['isView', true])
    },
    scrollResult () {
      const _self = this
      let targetData = ''
      let idx = 0
      if (_self.scrollResult < 300) {
        _self.moveCategory(-1, targetData)
      } else {
        for (var key in _self.v_list) {
          if (document.getElementById(_self.v_list[key].c_name) && _self.scrollResult) {
            if (_self.scrollResult > document.getElementById(_self.v_list[key].c_name).offsetTop) {
              targetData = _self.v_list[key].c_name
              idx = key
            }
          }
        }
        _self.moveCategory(idx, targetData)
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";

.NavigationBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  z-index: 1500;
  border-bottom: 1px solid $border-color;

  header {
    width: 1150px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-logo {
      flex-basis: 155px;
      cursor: pointer;
    }

    .header-navigation-box {
      flex-basis: calc(100% - 155px);
      padding-left: 10%;
      display: flex;
      justify-content: left;
      align-items: center;
    }

    .header-navigation {
      display: flex;
      justify-content: left;
      align-items: center;
      margin-bottom: 0px;

      & li {
        list-style: none;
        padding: 26px 0 22px 0;
        margin: 0 13px;
        border-bottom: 4px solid transparent;

        &.active {
          // border-bottom: 4px solid $brand-color;
          & a {
            color: $brand-color;
            // font-weight:600;
          }
        }

        & a {
          font-size: 16px;
          text-align: center;
          color: #545454;
          text-decoration: none;
        }
      }
    }
    .app-join {
      border-radius: 4px;
      width: 140px;
      text-decoration: none;
      text-align: center;
      color: #fff;
      font-size: 14px;
      padding: 5px 20px;
    }
  }
  @media (min-width: 900px) and (max-width: 1149px) {
    header {
      width: 900px;

      .header-navigation {
        display: flex;
        justify-content: left;
        align-items: center;

        & li {
          list-style: none;
          padding: 26px 0;
          margin: 0 13px;

          & a {
            font-size: 13px;
            text-align: center;
            color: #545454;
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>
