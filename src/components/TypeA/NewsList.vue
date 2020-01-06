<template>
  <div class="news-wrap">
    <ul class="list">
      <li v-for="(item, index) in NewsList" :class="item.li_class" v-bind:key="index" v-on:click="NewsDetail(item.B_SEQ)">
        <div class="new-img" v-if="item.UPLOAD_THUMBNAIL">
          <img src="@/assets/images/img/img_news01.png" alt="">
        </div>
        <div class="news-txt" v-else>
          <span class="category" :style="{color: mcolor}">
            {{ item.TOPIC_TYPE }}
          </span>
          <p class="txt">
            {{ item.TITLE }}
          </p>
          <span class="date">{{ item.REG_DATE | v_date }}</span>
          <a href="#" class="link"></a>
        </div>
        <div class="news-txt" v-if="item.UPLOAD_THUMBNAIL">
          <span class="category">
            {{ item.TOPIC_TYPE }}
          </span>
          <p class="txt">
            {{ item.TITLE }}
          </p>
          <span class="date">{{ item.REG_DATE | v_date }}</span>
          <a href="/NewsView" class="link"></a>
        </div>
        <p class="news-bottom-txt" v-else>
          {{ item.CONTENTS }}
        </p>
      </li>
      <!-- <li>
        <div class="new-img">
          <img src="@/assets/images/img/img_news02.png" alt="">
        </div>
        <div class="news-txt ">
          <span class="category">
            IR자료
          </span>
          <p class="txt">
            삼성 AI 포럼 2019’ 기술 한계 극복을
            위해 글로벌 전문가 한 자리에
          </p>
          <span class="date">2019.11.06</span>
          <a href="#" class="link"></a>
        </div>
      </li>
      <li class="text-box">
        <div class="news-txt ">
          <span class="category">
            IR자료
          </span>
          <p class="txt">
            삼성미래기술육성재단, 미국 실리콘
            밸리에서 ‘글로벌 리서치 심포지엄’
            개최
          </p>
          <span class="date">2019.11.06</span>
          <a href="#" class="link"></a>
        </div>
        <p class="news-bottom-txt">
          삼성미래기술육성재단은 (현지시간) 11월 7
          일부터 8일까지 미국 실리콘밸리에 소재한
          삼성전자 미주법인에서 글로벌 리서치...
        </p>
      </li> -->
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      mcolor: ''
    }
  },
  props: ['NewsList'],
  filters: {
    v_date: function (date) {
      const key = new Date(date)
      const year = key.getFullYear()
      let month = key.getMonth() + 1
      let day = key.getDate()
      month = (month > 9) ? month : '0' + month
      day = (day > 9) ? day : '0' + day
      return year + '.' + month + '.' + day
    }
  },
  methods: {
    NewsDetail (index) {
      const _self = this
      _self.$router.push({ name: 'newsView', params: { 'index': index } })
    }
  },
  computed: {
    ...mapGetters(['getMainColor'])
  },
  watch: {
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
    }
  },
  mounted () {
    const _self = this
    if (_self.getMainColor) {
      _self.mcolor = '#' + _self.getMainColor
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
.news-wrap {
  @include contentWidth($width:1200px);
  .list {
    display:flex;
    li {
      height:466px;
      position:relative;
      width:calc(33.33% - 15px);
      @include shadow();
      background-color:$white;
      & + li {
        cursor:pointer;
        margin-left:45px;
      }
      &.text-box {
        cursor: pointer;
        .news-txt {
          padding:60px 40px 20px 40px;
          .txt {
           @include textHidden($line:2);
          }
        }
      }
    }
    .new-img {
      overflow: hidden;
      img {
        position:relative;
        left:50%;
        width:370px;
        margin-left:-185px;
      }
    }
    .news-txt {
      padding:50px 40px;
      background-color:$white;
      .category {
        font-size:15px;
        line-height:16px;
        color:$blue;
        font-weight: 500;
      }
      .txt {
        height: 3rem;
        margin-top:17px;
        font-size:20px;
        line-height:25px;
        color:$black3;
        font-weight: 500;
        @include textHidden();
      }
      .date {
        display:inline-block;
        margin-top:32px;
        font-size:15px;
        line-height:16px;
        color:#a9acb3;
      }
      .link {
        display:inline-block;
        position:absolute;
        right:40px;
        bottom:50px;
        width:24px;
        height:21px;
        @include bgImg(bg/bg_more_right);
      }
    }
    .news-bottom-txt {
      position:relative;
      padding:22px 40px 0 40px;
      font-size:17px;
      line-height:26px;
      color:$gray8;
      letter-spacing: -0.25px;
      @include textHidden($line:3);
      &::after {
        @include virtual;
        left:40px;
        width:calc(100% - 80px);
        height:1px;
        background-color:#ebebed;
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .news-wrap {
    .list {
      display:block;
      @include shadow();
      li {
        display:flex;
        width:100%;
        box-shadow: none;
        height: auto;
        & + li {
          margin-left:0;
          margin-top:2px;
        }
        >div {
          width:50%;
          &.news-txt  {
            padding:36px 20px;
            .category {
              font-size:10px;
            }
            .txt {
              height: 2rem;
              -webkit-line-clamp: 3;
              margin-top:5px;
              font-size:13px;
              line-height:16px;
            }
            .date {
              margin-top:15px;
              font-size:10px;
            }
            .link {
              right:20px;
              bottom:40px;
              width:22px;
              height:10.5px;
              background-size:12px 10px;
            }
          }
          &.new-img {
            max-width:270px;
            img {
              width:270px;
              margin-left:-135px;
            }
          }
        }
        &.text-box {
          .news-bottom-txt {
            display:none;
          }
          .news-txt {
            width:100%;
            padding:33px 20px;
            .date {
              margin-top:23px;
            }
          }
        }
      }
    }
  }
  .board-section {
    .thumbnail.list {
    li {
      padding-left:110px;
      .thumbnail-img {
        position:absolute;
        left:20px;
        top:50%;
        transform: translateY(-50%);
        img {
          width:75px;
          height:55px;
          }
        }
        .thumbnail-txt{
          margin-bottom:6px;
          .category {
            font-size:11px;
            margin-bottom:6px;
          }
          .board-title {
            max-height:36px;
            overflow: hidden;
            margin-bottom:0;
          }
        }
        .day {
          display:inline-block;
        }
        &.txt {
          padding-left:20px;
        }
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .detail-section {
    .news-title {
      .news-txt {
        padding:58px 0;
        .category {
          margin-bottom:5px;
          font-size:12px;
        }
        p {
          padding-right:0;
          font-size:17px;
          line-height:27px;
          .date {
            display:none;
          }
        }
      }
    }
  }
}
</style>
