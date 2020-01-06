<template>
  <div class="detail-section">
    <div class="detail-title">
      <p>{{ scheduleList.TITLE }} <span v-if="scheduleList.LPERIOD">({{ scheduleList.LPERIOD | v_period }})</span></p>
    </div>
    <div class="datail-inner">
      <div class="top-section type01">
        <dl class="files" v-if="scheduleList.ORI_FILE1">
          <dt>첨부파일</dt>
          <dd class="icon-file pdf" v-on:click="getPDF(scheduleList.UPLOAD_FILE1)">{{ scheduleList.ORI_FILE1 }} <button type="button" class="file-down"></button></dd>
        </dl>
        <div class="sns-group" v-if="false">
          <a href="#" class="facebook"></a>
          <a href="#" class="twitter"></a>
          <a href="#" class="blog"></a>
          <a href="#" class="talk"></a>
        </div>
      </div>
      <div class="detail-cont">
        <ul class="list">
          <li>
            <strong class="tit">일시</strong>
            <p class="time en" :style="{color: mcolor}">
              {{ scheduleList.S_DATE | v_date }}<font style="font-family: 'Roboto', sans-serif;" v-if="SE_DATE_SAME"> ~ {{scheduleList.E_DATE | v_edate }}</font>
              <span class="en" :style="{color: mcolor}">{{ scheduleList.S_TIME }} ~ </span>
            </p>
          </li>
          <li v-if="scheduleList.PLACE">
            <strong class="tit">장소</strong>
            <p>{{ scheduleList.PLACE }}</p>
          </li>
          <li v-if="scheduleList.ETC">
             <strong class="tit">대상</strong>
            <p>{{ scheduleList.ETC }}</p>
          </li>
        </ul>
        <!-- <p class="pic">
          <img src="@/assets/images/img/img_detail.png" alt="">
        </p> -->
      </div>
      <div class="desc" v-html="scheduleList.CON"></div>
      <div class="conference-wrap" v-if="scheduleList.CONCALL_ON === 'Y'">
       <p class="conference-tit">[컨퍼런스 콜 이용안내]</p>
        <p class="desc call">접속번호</p>
        <p class="desc num">-국내에서 접속시 : 031-688-7002</p>
        <p class="desc num">-해외에서 접속시 : 82-31-688-7001</p>
      </div>
      <a href="#" class="box-link site-link" v-on:click="goCONCALL(scheduleList.CON_URL)" v-if="scheduleList.CONCALL_ON === 'Y'"><span>사이트 링크</span></a>
      <div class="list-btn">
        <div class="link-box prev" v-if="is_prev" v-on:click="routeView(prev_seq)">
          <span>이전글</span>
          <p>{{ prev_title }}</p>
          <a href="#" class="link"></a>
        </div>
        <div class="link-box next" v-if="is_next" v-on:click="routeView(next_seq)">
          <span>다음글</span>
          <p>{{ next_title }}</p>
          <a href="#" class="link"></a>
        </div>
      </div>
      <div class="btn-wrap center">
        <a href="javascript:void(0)" class="box-link back active" v-on:click="goList" :style="{'border-color': mcolor}"><span :style="{color: mcolor}">목록 <span :style="{background: mcolor}"></span></span></a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      v_idx: 0,
      scheduleList: [],
      is_prev: false,
      prev_title: '',
      prev_seq: 0,
      is_next: false,
      next_title: '',
      next_seq: 0,
      mcolor: '',
      SE_DATE_SAME: true
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getMainColor'])
  },
  filters: {
    v_date: function (date) {
      const key = new Date(date)
      const year = key.getFullYear()
      let month = key.getMonth() + 1
      let day = key.getDate()
      month = (month > 9) ? month : '0' + month
      day = (day > 9) ? day : '0' + day
      return year + '.' + month + '.' + day
    },
    v_period: function (date) {
      return date.substr(0, 4) + '.' + date.substr(-1, 1) + 'Q'
    },
    v_edate: function (date) {
      const key = new Date(date)
      return key.getDate()
    }
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.getSData()
    }
    if (_self.getMainColor) {
      _self.mcolor = '#' + _self.getMainColor
    }
  },
  watch: {
    getCompSeq () {
      const _self = this
      if (_self.getCompSeq) {
        _self.getSData()
      }
    },
    '$route.params' () {
      const _self = this
      _self.v_idx = _self.$route.params.index
      _self.is_prev = false
      _self.is_next = false
      _self.prev_title = ''
      _self.prev_seq = 0
      _self.next_title = ''
      _self.next_seq = 0
      _self.getSData()
    },
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
    }
  },
  methods: {
    getPDF (name) {
      window.open('https://file.irgo.co.kr/data/BOARD/ATTACH_PDF/' + name, '_BLANK')
    },
    goList () {
      const _self = this
      _self.$router.replace({ name: 'schedule' })
    },
    routeView (index) {
      const _self = this
      _self.$router.replace({ name: 'scheduleView', params: { 'index': index } })
    },
    getSData () {
      const _self = this
      const aram = {
        seq: _self.getCompSeq,
        f_seq: _self.$route.params.index
      }
      _self.v_idx = _self.$route.params.index
      this.$store.dispatch('GET_SDETAIL', aram)
        .then(res => {
          for (var key in res) {
            if (res[key].GUBUN === 'O') {
              _self.scheduleList = res[key]
              if (new Date(res[key].S_DATE).getUTCDate() === new Date(res[key].E_DATE).getUTCDate() || !res[key].E_DATE) {
                _self.SE_DATE_SAME = false
              }
            } else if (res[key].GUBUN === 'P') {
              _self.is_prev = true
              _self.prev_title = res[key].TITLE
              _self.prev_seq = res[key].F_SEQ
            } else if (res[key].GUBUN === 'N') {
              _self.is_next = true
              _self.next_title = res[key].TITLE
              _self.next_seq = res[key].F_SEQ
            }
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
dd.icon-file {
  cursor: pointer;
}
.detail-section {
  padding-bottom:200px;
}
  .detail-title {
    background-color:#f3f3f7;
    p{
      @include contentWidth($width:1200px);
      padding:114px 0 102px 114px;
      font-size:29px;
      line-height:30px;
      color:$black3;
      font-weight: 500;
      @include bgImg(icon/icon_cal,$pos:left center);
    }
  }
  .datail-inner{
    @include contentWidth($width:1200px);
    .top-section {
      display:flex;
      margin:30px 0 130px;
      .sns-group {
        display:flex;
        margin-left:auto;
        a {
          display:inline-block;
          width:25px;
          height:25px;
          @each $obj in facebook,twitter,blog,talk{
            &.#{$obj}{
              @include bgImg(icon/icon_round_#{$obj});
            }
          }
          & + a {
            margin-left:16px;
          }
        }
      }
      .files {
        display:flex;
        align-items: center;
        dt {
          position: relative;
          padding-right:10px;
          margin-right:10px;
          color:#aaa;
          font-size:15px;
          line-height:16px;
          &::after {
            display:block;
            position:absolute;
            right:0;
            top:50%;
            width:1px;
            height:8px;
            margin-top:-4px;
            content:"";
            background-color:#d3d3d5;
          }
        }
        .icon-file {
          position:relative;
          padding:0 26px 0 36px;
          background-position:left center;
          color:$black4;
          .file-down {
            position:absolute;
            right:0;
            top:50%;
            width:17px;
            height:17px;
            transform: translateY(-50%);
            @include bgImg(btn/btn_file_down);
            background-color:$white;
          }
        }
      }
      &.type01 {
        margin-bottom:60px;
      }
    }
    .detail-cont {
      border:1px solid #e9e9ee;
      border-top:2px solid $black;
      @include shadow();
      margin-bottom:90px;
      .list {
        padding:90px 104px;
        li {
          display:flex;
          align-items: flex-start;
          cursor: text;
          & + li {
            margin-top:26px;
            padding-top:22px;
            border-top:1px solid #f2f2f2;
          }
          .tit {
            font-weight:500;
            font-size:20px;
            line-height:26px;
            color:$gray8;
            flex: 0 0 auto;
          }
          p {
            position:relative;
            padding-left:30px;
            margin-left:30px;
            font-weight: 500;
            font-size:20px;
            line-height:26px;
            color:$black3;
            &::after {
              display:block;
              position:absolute;
              left:0;
              top:50%;
              width:1px;
              height:11px;
              background-color:#cbcbcb;
              transform: translateY(-50%);
              content:"";
            }
            &.time {
              font-size:26px;
              font-weight:700;
              color:$blue;
              span {
                display:inline-block;
                margin-left:14px;
                font-size:16px;
                line-height:26px;
                color:#1e83ea;
              }
            }
          }
        }
      }
      .pic {
        padding:0 34px 34px 34px;
        overflow: hidden;
        img {
          position: relative;
          width:1130px;
          left:50%;
          margin-left:-565px;
        }
      }
    }
    .list-btn {
      margin-top:160px;
      .link-box {
        position:relative;
        height:126px;
        padding:0 70px 0 0;
        display:flex;
        border-top:1px solid #ececec;
        align-items: center;
        span {
          display:inline-block;
          width:128px;
          flex:0 0 auto;
          font-size:14px;
          text-align: center;
          color:#a9acb3;
        }
        .catagory {
          display:inline-block;
          margin-bottom:10px;
          font-size:16px;
          color:#a9acb3;
          font-weight: 500;
        }
        .link{
            position: absolute;
            right: 30px;
            top: 50%;
            width: 9px;
            height: 17px;
            @include bgImg(bg/bg_board_link);
            transform: translateY(-50%);
          }
        p {
          font-size:20px;
          line-height:30px;
          font-weight: 500;
          color:$black3;
          @include textHidden(2);
        }
        .date {
          margin-top:6px;
          text-align: left;
        }
        &.prev {
          cursor:pointer;
          >span{
            padding-top:16px;
            @include bgImg(arrow/arrow_prev,$pos:center top);
          }
        }
        &.next {
          cursor:pointer;
            >span{
            padding-bottom:16px;
            @include bgImg(arrow/arrow_next,$pos:center bottom);
          }
        }
      }
      border-bottom:1px solid #ececec;
    }
    .conference-wrap {
      margin-top:76px;
      .conference-tit {
        margin-bottom:12px;
        font-size:18px;
        line-height:20px;
        color:$blue;
        font-weight: 500;
      }
      .desc {
        & +.desc {
          margin-top:14px;
        }
      }
    }
    .box-link {
      display:inline-block;
      padding: 19px 20px;
      border:3px solid #ebeef4;
      span {
        position:relative;
        display:inline-block;
        width:100%;
        font-size:15px;
        color:#9c9ea9;
        font-weight: 500;
        // &::after {
        //   display:block;
        //   position: absolute;
        //   right:0;
        //   top:50%;
        //   width:10px;
        //   height:3px;
        //   background-color:#d9dce1;
        //   content:"";
        //   transform: translateY(-50%);
        // }
        span {
          position: absolute;
          width: 10px;
          height: 3px;
          transform: translateY(-50%);
          background-color: black;
          margin-top: 8px;
          margin-left: 61px;
        }
        @media screen and (max-width: 1000px){
          span {
            margin-top: -5px;
            margin-left: 36px;
          }
        }
      }
      &.site-link {
        margin-top:72px;
        width:182px;
      }
      &.back {
        width:144px;
      }
      &.active {
        border-color:$blue;
        span {
          color:$blue;
          &::after {
            background-color:$blue;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1000px) {
    .detail-section {
    padding-bottom:100px;
    }
    .detail-title {
      padding:65px 0;
      p {
        padding:36px 0 0;
        font-size:18px;
        text-align: center;
        background-size:36px 28px;
        background-position:center top;
      }
      & + .datail-inner {
        padding:0 30px;
      }
    }
    .datail-inner {
      .top-section {
        flex-direction: column;
        align-items: center;
        margin:15px 0 30px;
        .files {
          width:100%;
          justify-content: center;
          padding-bottom:15px;
          border-bottom:1px solid #eee;
          dt {
            font-size:12px;
            padding-right: 10px;
            margin-right:10px;
          }
          .icon-file {
            padding:0 28px 0 23px;
            .file-down  {
              width:17px;
              height:17px;
              background-size: 17px 17px;
            }
          }
        }
        .sns-group {
          display:none;
          margin-left:0;
          margin-bottom:85px;
          a {
            width:26px;
            height:26px;
            background-size:cover;
            & + a {
              margin-left:17px;
            }
          }
        }
        &.type01 {
          margin-bottom:30px;
        }
      }
      .detail-cont {
        margin-bottom:50px;
        .list {
          padding:44px 35px;
          li {
            .tit {
              font-size:13px;
              line-height:20px;
            }
            p {
              margin-left:15px;
              padding-left:0;
              font-size:13px;
              line-height:20px;
              &.time {
                font-size:16px;
                span {
                  margin-left:9px;
                  line-height: 20px;
                  font-size:10px;
                }
              }
              &::after {
                display:none;
              }
            }
            & + li {
              margin-top:15px;
              padding-top:15px;
            }
          }
        }
        .pic {
          position:relative;
          left:15px;
          width:calc(100% - 30px);
          padding:0 0 15px 0 ;
          img {
            width:370px;
            margin-left:-185px;
          }
        }
      }
      .conference-wrap {
        margin-top:64px;
        .conference-tit {
        font-size:14px;
        }
        .desc {
          font-size:14px;
          & + {
            margin-top:10px;
          }
        }
      }
      .answer-section {
        padding-left:35px;
        background-size:16px 14px;
        .tit {
          font-size:14px;
        }
      }
      .list-btn {
        margin-top:85px;
        .link-box {
          padding-right:0;
          padding:27px 0;
          height:auto;
          .catagory {
            font-size:11px;
          }
          >div {
            width:calc(100% - 35px);
            .date {
              width:100%;
              padding:0;
              margin-top:10px;
              text-align: left;
            }
          }
          p {
            @include textHidden();
            font-size:13px;
            line-height:1.4;
          }
          span {
            width:35px;
            margin-right:10px;
            font-size:9px;
            background-size:5px 2.5px;
          }
          &.prev {
            >span {
              padding-top:9px;
            }
          }
          &.next {
            >span {
              padding-bottom:9px;
            }
          }
          .link {
            width:100%;
            height:100%;
            background:none;
            left:0;
            top:0;
            transform: none;
          }
        }
      }
      .box-link {
        &.site-link {
          width:126px;
          padding:15px;
          margin-top: 40px;
          span {
            display:block;
            font-size:11px;
          }
        }
        &.back {
          width:80px;
          padding:14px 15px;
          span {
            display:block;
            font-size:11px;
            &::after {
              width:8px;
              height:2px;
            }
          }
        }
      }
    }
  }
</style>
