<template>
  <div class="newSchedule">
    <p class="title-wrap">
      <strong>다가오는 일정</strong>
    </p>
    <ul class="list">
      <li v-for="(item, idx) in ScheduleData" v-on:click="DetailView(item.F_SEQ)" v-bind:key="idx">
        <div class="date-wrap">
          <p class="day">{{ item.S_DATE | v_date }} ~ {{ item.E_DATE | v_edate }}</p>
          <span class="time">{{ item.S_TIME }}~{{ item.E_TIME }}</span>
        </div>
        <div class="info-wrap">
          <strong class="title">
            {{ item.TITLE }}
          </strong>
            <dl>
              <dt>장소</dt>
              <dd>{{ item.PLACE }}</dd>
            </dl>
            <dl>
              <dt>대상</dt>
              <dd>{{ item.ETC }}</dd>
          </dl>
        </div>
        <a href="/scheduleView" class="direct"></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['ScheduleData'],
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
    v_edate: function (date) {
      const key = new Date(date)
      return key.getDate()
    }
  },
  watch: {
    ScheduleData () {
      // console.log(this.ScheduleData)
    }
  },
  methods: {
    DetailView (index) {
      const _self = this
      _self.$router.replace({ name: 'scheduleView', params: { 'index': index } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
.newSchedule {
  @include contentWidth($width:1200px);
  .list {
    @include shadow();
    li  {
      position:relative;
      background-color:$white;
      display:flex;
      align-items: center;
      padding:53px 80px;
      & +li {
        border-top:2px solid #e2e2e6;
      }
      &:hover {
        cursor:pointer;
        @include bgImg(bg/bg_pattern);
        background-color:$blue;
        .day {
          color:$white;
        }
        .time {
          color:$white;
          opacity: .5;
        }
        .info-wrap  {
          .title {
            color:$white;
            width: 95%;
          }
          dl {
            dt {
              color:$white;
              opacity: .5;
            }
            dd {
              color:$white;
              opacity: .7;
            }
          }
        }
      }
    }
    .direct {
      display:block;
      position:absolute;
      right:80px;
      top:50%;
      width:24px;
      height:21px;
      transform: translateY(-50%);
      @include bgImg(bg/bg_more_right);
    }
  }
  .info-wrap {
    .title {
      display:inline-block;
      margin-bottom:13px;
      font-size:22px;
      color:$black3;
      font-weight: 500;
      @include textHidden($line:1);
      width: 95%;
      .file {
        display:inline-block;
        width:25px;
        height:27px;
        margin-left:16px;
        @include bgImg(icon/icon_pdf);
      }
    }
    dl {
      display:flex;
      dt {
        font-size:14px;
        color:#b5b5b5;
      }
      dd {
        margin-left:21px;
        font-size:14px;
        color:$gray8;
      }
      & + dl {
        margin-top:8px;
      }
    }
  }
  .date-wrap {
    flex:0 0 337px;
    .day {
      font-size:23px;
      color:$blue;
      font-weight: 500;
    }
    .time {
      display:inline-block;
      margin-top:15px;
      font-size:14px;
      color:$gray9;
      font-weight: 500;
    }
  }
}
@media screen and (max-width: 1000px) {
  .newSchedule {
    .list {
      li {
        display:block;
        padding: 35px;
      }
      .direct {
        background-position:right 35px top 40px;
        width:100%;
        height:100%;
        right:0;
        top:0;
        transform:none;
      }
    }
    .info-wrap {
      .title {
        margin-top:45px;
        font-size:14px;
        width: 95%;
        .file  {
          display:none;
        }
      }
      dl {
        dt {
          font-size:10px;
        }
        dd {
          margin-left:12px;
          font-size:10px;
        }
      }
    }
    .date-wrap {
      .day {
        font-size:19px;
      }
      .time {
        margin-top:10px;
      }
    }
  }
}
</style>
