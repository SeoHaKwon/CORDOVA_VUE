<template>
  <div class="main-contents">
    <div class="board-wrap">
      <div class="board left">
        <router-link to="/announcement">
        <div class="board-title">
         <strong class="en">
            Performance<br>
            Presentation
         </strong>
          <p>실적발표</p>
        </div>
        <div class="sub-txt">
          <strong class="sub-tit">{{ Per.PERIOD | p_title }} 실적발표가 공개 되었습니다.</strong>
          <p class="date">{{ Per.MOD_DATE | v_date }}</p>
          <a href="#" class="more"></a>
        </div>
        </router-link>
      </div>
      <div class="board right">
        <router-link to="/news">
        <div class="board-title">
          <strong class="en">
            Investor Relation<br>
            News
         </strong>
          <p>IR 뉴스</p>
        </div>
        <div class="sub-txt">
          <strong class="sub-tit">{{ News.TITLE }}</strong>
          <p class="date">{{ News.MOD_DATE | v_date }}</p>
          <a href="#" class="more"></a>
        </div>
        </router-link>
      </div>
    </div>
    <div class="middle-visual">
      <img src="@/assets/images/img/img_main_middle.png" alt="">
      <div class="schedule-box" v-if="Schelen > 0">
        <router-link to="/schedule">
        <strong class="tit">IR 일정 <a href="@/scheduleView" class="more is_pc"></a></strong>
        <div class="sub-txt">
          <strong>{{ Sche.TITLE }}</strong>
          <p>일시: {{ Sche.MOD_DATE | h_date }}</p>
        </div>
        </router-link>
      </div>
    </div>
    <div class="direct-link">
      <ul>
        <li :style="{width: percent + '%'}" v-if="isView.isFinance.active">
          <router-link to="/financial" class="link01">
            <strong class="tit">재무정보</strong>
            <p class="sub">분기별 재무제표</p>
          </router-link>
        </li>
        <li :style="{width: percent + '%'}" v-if="isView.isStatus.active">
          <router-link to="/status" class="link02">
            <strong class="tit">주주현황</strong>
            <p class="sub">주주구성 및 배당</p>
          </router-link>
        </li>
        <li :style="{width: percent + '%'}" v-if="isView.isDisclosure.active">
          <router-link to="/disclosure" class="link03">
            <strong class="tit">공시</strong>
            <p class="sub">기업 공시정보</p>
          </router-link>
        </li>
        <li :style="{width: percent + '%'}" v-if="isView.isReport.active">
          <router-link to="/report" class="link04">
            <strong class="tit">경영보고서</strong>
            <p class="sub">규정 및 보고서</p>
          </router-link>
        </li>
        <li :style="{width: percent + '%'}" v-if="isView.isContact.active">
          <router-link to="/contact" class="link05">
            <strong class="tit">IR Contact</strong>
            <p class="sub">문의 및 앱 다운로드</p>
          </router-link>
        </li>
      </ul>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/TypeA/Footer'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  components: {
    Footer
  },
  data: () => {
    return {
      Per: [],
      News: [],
      Sche: [],
      Schelen: 0,
      isView: {
        isFinance: {
          'active': false
        },
        isStatus: {
          'active': false
        },
        isDisclosure: {
          'active': false
        },
        isReport: {
          'active': true
        },
        isContact: {
          'active': true
        }
      },
      percent: 0
    }
  },
  filters: {
    v_date: (date) => {
      const da = new Date(date)
      return da.getFullYear() + '.' + (da.getMonth() + 1) + '.' + da.getUTCDate()
    },
    h_date: (date) => {
      const da = new Date(date)
      return da.getFullYear() + '년 ' + (da.getMonth() + 1) + '월 ' + da.getUTCDate() + '일'
    },
    p_title: (period) => {
      return String(period).substr(0, 4) + '년 ' + String(period).substr(4, 1) + '분기 '
    }
  },
  computed: {
    ...mapGetters(['getCompSeq'])
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.getMainData()
    }
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.getMainData()
    }
  },
  methods: {
    getMainData () {
      const _self = this
      const param = {
        seq: _self.getCompSeq
      }
      _self.$store.dispatch('GET_MAINDATA', param)
        .then(res => {
          _self.Sche = _.filter(res, { 'CATE': 'IRSCHEDULE' })[0]
          _self.News = _.filter(res, { 'CATE': 'IRNEWS' })[0]
          _self.Per = _.filter(res, { 'CATE': 'PERFORMANCE' })[0]
          _self.Schelen = _.filter(res, { 'CATE': 'IRSCHEDULE' }).length
        })
      _self.$store.dispatch('IS_MENU', param)
        .then(res => {
          if (res.IRPAGE_DISCLOURE_YN === 'Y') {
            _self.isView.isDisclosure.active = true
          } else {
            _self.isView.isDisclosure.active = false
          }
          if (res.IRPAGE_FINANCE_YN === 'Y') {
            _self.isView.isFinance.active = true
          } else {
            _self.isView.isFinance.active = false
          }
          if (res.IRPAGE_SHOLDER_YN === 'Y') {
            _self.isView.isStatus.active = true
          } else {
            _self.isView.isStatus.active = false
          }
          _self.percent = (100 / _.filter(_self.isView, { 'active': true }).length)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
.main-contents {
  position:relative;
  z-index: 10;
  @include contentWidth();
  background-color:$white;
  .board-wrap {
    display:flex;
    padding:92px 100px;
    margin-top:-122px;
    .board {
      position:relative;
      width:calc(50% - 100px);
      cursor: pointer;
      & + .board {
        position:relative;
        margin-left:200px;
        &::after {
          position:absolute;
          left:-100px;
          top:0;
          width:1px;
          height:100%;
          content:"";
          background-color: #ececec;
        }
      }
    }
    .board-title {
      font-size:31px;
      line-height:36px;
      color:$black3;
      strong {
      font-weight: 700;
      }
      p {
        margin-top:16px;
        font-size:17px;
        line-height:18px;
        color:$gray8;
        font-weight: 500;
      }
    }
    .sub-txt {
      position:relative;
      margin-top:54px;
      padding-left:50px;
      text-align: right;
      .sub-tit {
        font-size:18px;
        color:$black4;
        font-weight: 700;
        @include textHidden(1);
        text-align: right;
        line-height:1.3;
      }
      .date {
        margin-top:16px;
        font-size:16px;
        color:$gray8;
      }
      .more {
        position:absolute;
        left:0;
        bottom:0;
      }
    }
  }
  .middle-visual {
    position:relative;
    overflow: hidden;
    img {
      position:relative;
      left:50%;
      width:1580px;
      transform: translateX(-50%);
    }
    .schedule-box {
      position: absolute;
      right:90px;
      top:50%;
      padding:80px;
      width:595px;
      height:309px;
      transform: translateY(-50%);
      background:url("../../assets/images/bg/bg_board_top.png") ,url("../../assets/images/bg/bg_board_bottom.png");
      background-repeat:no-repeat , no-repeat;
      background-position:left top , right bottom;
      background-color:$white;
      .tit {
        display:flex;
        font-size:22px;
        color:$black3;
        font-weight: 700;
      }
      .sub-txt {
        padding-top:80px;
        padding-left:100px;
        @include bgImg(icon/icon_cal,$pos:left bottom);
        strong {
          font-size:18px;
          color:$black4;
          font-weight: 700;
          @include textHidden(1);
        }
        p {
          margin-top:18px;
          font-size:16px;
          color:$gray8;
        }
      }
      .more {
      margin-left:auto;
      }
    }
  }
  .more {
    display:inline-block;
    width:38px;
    height:38px;
    @include bgImg(btn/btn_board_more);
  }
  .direct-link {
    padding:122px 100px 120px 100px;
    background-color:$white;
    text-align:center;
    ul {
      display:flex;
      li {
        width:calc(100%/5);
        a {
          display:block;
          padding:80px 10px 10px 10px;
          $total: 5;
          @for $i from 1 through $total {
            &.link0#{$i} {
              @include bgImg(icon/icon_link0#{$i}, $pos:top center);
            }
          }
        }
        strong {
          font-size:21px;
          color:$black3;
          font-weight: 500;
        }
        p {
          margin-top:10px;
          font-size:15px;
          color:$gray8;
        }
      }
    }
  }
}
@media screen and (max-width: 1400px) {
  .main-contents{
    .direct-link {
      ul {
        li {
          a {
            // padding-left:86px;
            padding-top: 80px;
          }
          strong {
            font-size:18px;
          }
          p {
            font-size:12px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .main-contents  {
    .board-wrap {
      padding:0;
      flex-wrap: wrap;
      .board {
        width:100%;
        padding:40px 30px;
        &.left {
          background-color:#f7f7f8;
        }
        & +.board {
          margin-left:0;
          cursor:pointer;
        }
        .board-title {
          font-size:19px;
          line-height:20px;
          p {
            margin-top:10px;
            font-size:12px;
          }
        }
      }
      .sub-txt {
        margin-top:30px;
        .sub-tit {
          font-size:12px;
        }
        .date{
          margin-top:7px;
          font-size:10px;
        }
      }
    }
    .more {
      width:25px;
      height:25px;
      background-size:25px auto;
    }
    .middle-visual {
      img {
        width:1047px;
      }
      .schedule-box{
        width:calc(100% - 60px);
        height:calc(100% - 160px);
        padding:40px 30px;
        left:30px;
        top:80px;
        right: auto;
        transform: none;
        background-size:140px auto;
        .tit {
          margin-bottom:36px;
          font-size:17px;
          align-items: center;
        }
        .sub-txt {
          padding-top:0;
          padding-left:87px;
          background-size:35px auto;
          background-position:left 40px center;
          strong {
            font-size:12px;
            line-height:14px;
          }
          p {
            margin-top:4px;
            font-size:12px;
          }
        }
        .more {
          position:absolute;
          left:0;
          top:0;
          width:100%;
          height:100%;
          background-size:3px 6px;
        }
      }
    }
    .direct-link {
      padding:50px 30px;
      ul {
        flex-wrap: wrap;
        justify-content: center;
        margin-left:-20px;
        margin-top:-45px;
        li {
          width:calc(33.33% - 20px);
          margin-left:20px;
          margin-top:45px;
          &:nth-child(3) ~ li{
            display:inline-block;
              // width:auto;
          }
          a {
            // padding-left:37px;
            padding-top:40px;
            background-size:30px auto;
          }
          strong {
            font-size:11px;
          }
          p {
            margin-top:0;
            font-size:9px;
          }
        }
      }
    }
  }
}
</style>
