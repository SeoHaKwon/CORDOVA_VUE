<template>
  <div class="announcement-Tab">
    <div class="tab-section">
      <div class="select" :style="{background: mcolor}">
        <span class="selected" v-on:click="openSelect">20{{ nowYear }}</span>
        <ul class="select-list" :class="{on:isActive}">
          <li v-for="(item, idx) in selectQ" v-bind:key="idx" v-on:click="changeYear(idx)" :style="{background: mcolor}">
            <a href="javascript:void(0);">20{{ item }}</a>
          </li>
        </ul>
      </div>
      <div class="tabs">
        <button type="button" class="tab active" v-on:click="setQuarter(0)">1Q<span></span></button> <!--클래스 active 주시면 활성화됩니다.-->
        <button type="button" class="tab" v-on:click="setQuarter(1)">2Q<span></span></button>
        <button type="button" class="tab" v-on:click="setQuarter(2)">3Q<span></span></button>
        <button type="button" class="tab" v-on:click="setQuarter(3)">4Q<span></span></button>
      </div>
    </div>
    <div class="tab-cont active"> <!--클래스 active 주시면 활성화됩니다.-->
      <div class="material-top" :style="{display: isActive_silj}">
        <div class="thumbnail">
            <p class="txt"><strong class="en">{{ silQ[0] }} {{ compname }}</strong></p>
            <img :src="performimg" alt="">
        </div>
        <div class="material-box" v-on:click="getView(silJ.UPLOAD_FILE1)">
          <div class="info">
            <span class="date">{{ silQ[0] }}</span>
            <p class="title">실적발표자료</p>
            <a href="#" class="icon-file pdf">{{ silJ.ORI_FILE1 }}</a>
          </div>
        </div>
      </div>
      <div class="material-list">
        <div class="material" v-for="item in type_D" v-bind:key="item.N_SEQ" v-on:click="getTypeD(item.SITEURL, item.UPLOAD_FILE1, item.TYPE)">
          <strong class="material-title">{{ item.TITLE }}</strong>
            <a href="javascript:void(0)" class="link" v-if="item.TYPE === 'URL' || item.TYPE === 'PDF'"></a>
            <a href="javascript:void(0)" class="link mov" v-else-if="item.TYPE == 'MOV'">MOV</a>
        </div>
        <!-- <div class="material">
          <strong class="material-title">보도자료</strong>
          <a href="#" class="icon-file  pdf">
            SAMSUNG 19년 2분기 실적발표자료
          </a>
          <a href="#" class="link"></a>
        </div>
        <div class="material">
          <strong class="material-title">Webcast</strong>
            <a href="#" class="link mov">MOV</a>
        </div>
        <div class="material">
          <strong class="material-title">컨퍼런스콜</strong>
          <a href="#" class="link"></a>
        </div>
        <div class="material">
          <strong class="material-title">스크립트</strong>
          <a href="#" class="link"></a>
        </div>
        <div class="material">
          <strong class="material-title">Fact sheet</strong>
          <a href="#" class="icon-file excel">
            SAMSUNG 19년 2분기 실적발표자료
          </a>
          <a href="#" class="link"></a>
        </div> -->
      </div>
    </div>
    <div class="tab-cont">
    </div>
    <div class="tab-cont">
    </div>
    <div class="tab-cont">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  data: () => {
    return {
      isActive: false,
      type_D: [],
      silQ: [],
      silJ: {},
      compname: '',
      selectQ: [],
      is_siljuk: false,
      DeleteNumber: 0,
      nowYear: '',
      nowPeriod: 0,
      isActive_silj: '',
      mcolor: '',
      performimg: '',
      changeidx: ''
    }
  },
  computed: {
    ...mapGetters(['getCompCode', 'getCompSeq', 'getCompName', 'getMainColor', 'getPerFormImg'])
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.getData()
    },
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
    },
    getPerFormImg () {
      const _self = this
      _self.performimg = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + _self.getPerFormImg
    }
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.getData()
    }
    if (_self.getMainColor) {
      _self.mcolor = '#' + _self.getMainColor
    }
    if (_self.getPerFormImg) {
      const _self = this
      _self.performimg = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + _self.getPerFormImg
    }
  },
  methods: {
    setQuarter (idx) {
      const _self = this
      _self.changeidx = idx
      // document.querySelector('.tabs').childNodes[_self.nowPeriod].classList.remove('active')
      // document.querySelector('.tabs').childNodes[_self.nowPeriod].style.color = ''
      // document.querySelector('.tabs').childNodes[idx].classList.add('active')
      // document.querySelector('.tabs').childNodes[idx].style.color = _self.mcolor
      // document.querySelector('.tabs').childNodes[idx].children[0].style.background = _self.mcolor
      // _self.nowPeriod = idx
      _self.changeData(_self.nowYear, _self.changeidx)
    },
    changeYear (idx) {
      const _self = this
      _self.nowYear = _self.selectQ[idx]
      _self.openSelect()
      document.querySelector('.tabs').childNodes[_self.nowPeriod].classList.remove('active')
      document.querySelector('.tabs').childNodes[_self.nowPeriod].style.color = ''
      _self.changeData(_self.nowYear, _self.nowPeriod)
    },
    openSelect () {
      this.isActive = !this.isActive
    },
    getTypeD (url, pdf, type) {
      if (type === 'URL') {
        window.open(url, '_BLANK')
      } else if (type === 'PDF') {
        window.open('https://file.irgo.co.kr/data/BOARD/ATTACH_PDF/' + pdf, '_BLANK')
      }
    },
    getView (FILENAME) {
      window.open('https://file.irgo.co.kr/data/BOARD/ATTACH_PDF/' + FILENAME, '_BLANK')
    },
    changeData (year, quat) {
      const _self = this
      const aram = {
        seq: _self.getCompSeq,
        year: '20' + year,
        quarter: quat + 1
      }
      this.$store.dispatch('GET_SILJ', aram)
        .then(result => {
          if (result.length === 0) {
            return false
          } else {
            document.querySelector('.tabs').childNodes[_self.nowPeriod].classList.remove('active')
            document.querySelector('.tabs').childNodes[_self.nowPeriod].style.color = ''
            document.querySelector('.tabs').childNodes[_self.changeidx].classList.add('active')
            document.querySelector('.tabs').childNodes[_self.changeidx].style.color = _self.mcolor
            document.querySelector('.tabs').childNodes[_self.changeidx].children[0].style.background = _self.mcolor
          }
          _self.nowPeriod = _self.changeidx
          _self.type_D = []
          const cont = _.filter(result, { 'SET_DATA_TYPE': '0' }).length + _.filter(result, { 'SET_DATA_TYPE': '1' }).length
          if (cont > 0) {
            _self.isActive_silj = ''
          } else {
            _self.isActive_silj = 'none'
          }
          _.filter(result, (res) => {
            if (res.SET_DATA_TYPE === '0' || res.SET_DATA_TYPE === '1') {
              _self.silJ = res
              _self.isActive_silj = ''
            } else if (res.SET_DATA_TYPE === '2') {
              res.TITLE = '보도자료'
              res.TYPE = 'PDF'
              _self.type_D.push(res)
            } else if (res.SET_DATA_TYPE === '3') {
              res.TITLE = '웹캐스팅'
              res.TYPE = 'URL'
              _self.type_D.push(res)
            } else if (res.SET_DATA_TYPE === '4') {
              res.TITLE = '컨퍼런스콜'
              res.TYPE = 'URL'
              _self.type_D.push(res)
            } else if (res.SET_DATA_TYPE === '5') {
              res.TITLE = '스크립트'
              res.TYPE = 'PDF'
              _self.type_D.push(res)
            } else if (res.SET_DATA_TYPE === '6') {
              res.TITLE = 'FactSheet'
              res.TYPE = 'PDF'
              _self.type_D.push(res)
            } else if (res.SET_DATA_TYPE === '7') {
              res.TYPE = 'URL'
              _self.type_D.push(res)
            } else {
              res.TYPE = 'PDF'
              _self.type_D.push(res)
            }
          })
        })
    },
    getData () {
      const _self = this
      const param = {
        code: _self.getCompCode,
        seq: _self.getCompSeq
      }
      _self.compname = _self.getCompName
      const res = this.$store.dispatch('GET_ASILQ', param)
      res.then(data => {
        _self.selectQ = _.uniqBy(_.map(data, 'YEAR')).length > 3 ? _.uniqBy(_.map(data, 'YEAR')).splice(0, 3) : _.uniqBy(_.map(data, 'YEAR'))
        _self.nowYear = data[0].YEAR
        _self.setQuarter(data[0].PERIOD - 1)
        _self.changeData(data[0].YEAR, data[0].PERIOD - 1)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
ul.select-list li{
  cursor: pointer;
}
 .announcement-Tab {
   @include contentWidth(1200px);
 }
 .material-top {
   display:flex;
   border-top:1px solid $black;
   .thumbnail {
     position:relative;
     overflow: hidden;
     width:50%;
     .txt {
       display:flex;
       align-items: center;
       justify-content: center;
       position:absolute;
       left:0;
       top:0;
       width:100%;
       height:100%;
       z-index: 2;
       strong {
        font-size:28px;
        font-weight:700;
        color:$white;
       }
     }
     img {
       position: relative;
       left:50%;
       width: 600px;
       margin-left:-300px;
     }
   }
   .material-box {
     width:50%;
     padding:80px 60px 0 60px;
     background:url("../../assets/images/bg/bg_board_top.png") ,url("../../assets/images/bg/bg_board_bottom.png");
     background-repeat:no-repeat , no-repeat;
     background-position:left top , right bottom;
     background-color:$white;
     cursor:pointer;
     .info {
       @include bgImg(icon/icon_material,$pos:right top 46px);
     }
     .date {
       font-size:19px;
       color:#bcc0ca;
       font-weight: 700;
     }
     .title {
       margin-top:16px;
       font-size:27px;
       color:#393f44;
       font-weight: 500;
     }
     .icon-file  {
       margin-top:70px;
     }
   }
   & + .material-list  {
     margin-top:10px;
   }
 }
@media screen and (max-width: 1000px) {
  .material-top {
    display:block;
    .thumbnail {
      width: 100%;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      .txt {
        strong {
          font-size:18px;
        }
      }
      img {
        position: relative;
        left: 50%;
        min-width: 300px;
        width: 100%;
        transform: translateX(-50%);
        margin-left:0;
        }
      }
    .material-box {
      width:100%;
      padding:30px 35px;
      background-size:100px auto;
      .date {
        font-size:11px;
      }
      .title {
        margin-top:6px;
        font-size:17px;
      }
      .info {
        background:none;
      }
      .icon-file {
        line-height:14px;
        font-size:10px;
        margin-top:36px;
        background-size:16.5px 18px;
      }
    }
  }
}

</style>
