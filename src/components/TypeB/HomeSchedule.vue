<template>
  <div class="HomeSchedule" v-if="SCHEDULE.length > 0">
    <div class="schedule-container">
      <h2 class="title">
        다가오는
        일정
      </h2>
      <ul class="schedule-list">
        <li v-for="(item, idx) in SCHEDULE"
            v-on:click="clickModal(true, idx)" v-bind:key="idx" :style="{'border-left': '4px solid '+mcolor}">
          <div>
            <h4 class="item-date" :style="{color: mcolor}">{{ item.S_DATE | v_date}} {{ item.S_TIME }}</h4>
            <h3 class="item-title">{{ item.TITLE }}</h3>
          </div>
          <svg style="width:32px;height:32px" viewBox="0 0 24 24">
            <path :fill="mcolor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </li>
      </ul>
    </div>
    <modal-desktop v-if="isIRModal">
        <div slot="body">
            <div class="modal-desktop-close" v-on:click="clickModal(false)">
                <img width="40px" src="@/assets/Type_B/img/ic_modal_close.png"/>
            </div>
            <div class="modal-mobile-header">
              <svg style="width:32px;height:32px" viewBox="0 0 24 24" v-on:click="clickModal(false)">
                <path fill="#313439" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
              </svg>
              <span style="color:#313439">일정</span>
            </div>
            <h5 class="modal-map">Investor Relations > 일정</h5>
            <div class="title-image">
              <!-- <img
                  width="60px"
                  src="../assets/Type_B/img/IR_Modal_date.png"
              /> -->
            </div>
            <div class="ir-modal-title">
              {{ SCHEDULE[idx].TITLE }}
            </div>
            <div class="social-info" v-if="false">
                <h5 class="date">
                </h5>
                <div class="social-sns">
                    <img width="7px" src="@/assets/Type_B/img/modal_facebook.png"/>
                    <img width="18px" src="@/assets/Type_B/img/modal_twiiter.png"/>
                    <img width="80px" src="@/assets/Type_B/img/modal_share.png"/>
                </div>
            </div>
            <div v-for="(data, index) in modalData" class="schedule-table" v-bind:key="index">
              <h4 class="title">{{ data.title }}</h4>
              <h5 class="description">{{ data.description }}</h5>
            </div>
            <div class="schedule-table">
              <h4 class="title">주요내용</h4>
              <h5 class="description" v-html="SCHEDULE[idx].CONTENTS"></h5>
            </div>
            <div class="schedule-btn" v-if="false">
              <a>컨퍼런스콜 사전신청하기</a>
            </div>
        </div>
    </modal-desktop>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isIRModal: false,
      modalData: [
        {
          title: '일시',
          description: ''
        },
        {
          title: '장소',
          description: ''
        },
        {
          title: '대상',
          description: ''
        }
      ],
      SCHEDULE: [],
      S_DATE: [],
      TITLE: [],
      idx: 0,
      mcolor: ''
    }
  },
  components: {
  },
  filters: {
    v_date: function (date) {
      const key = new Date(date)
      const year = key.getFullYear()
      const month = key.getMonth() + 1
      const day = key.getDate()
      // const hour = key.getHours()
      // const min = key.getMinutes()
      // const time = key.getSeconds()
      return year + '-' + month + '-' + day
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getMainColor'])
  },
  methods: {
    clickModal (isOpen, idx) {
      const globalBody = document.getElementsByTagName('html')[0]
      const _self = this
      if (isOpen) {
        globalBody.style.overflow = 'hidden'
        if (typeof idx === 'number') {
          _self.idx = idx
          const key = new Date(_self.SCHEDULE[idx].S_DATE)
          let daty = key.getFullYear() + '년 ' + (Number(key.getMonth()) + 1) + '월 ' + key.getDate() + '일 '
          _self.modalData[0].description = daty + _self.SCHEDULE[idx].S_TIME
          _self.modalData[1].description = _self.SCHEDULE[idx].PLACE
          _self.modalData[2].description = _self.SCHEDULE[idx].ETC
        }
      } else {
        globalBody.style.overflow = 'inherit'
      }
      this.isIRModal = isOpen
    }
  },
  watch: {
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
    },
    getCompSeq () {
      const _self = this
      const param = {
        seq: _self.getCompSeq,
        isTYPE: 'B'
      }
      _self.$store.dispatch('GET_SCH', param)
        .then(res => {
          if (res.length > 0) {
            for (var key in res) {
              _self.SCHEDULE.push(
                {
                  'TITLE': res[key].TITLE,
                  'S_DATE': res[key].S_DATE,
                  'S_TIME': res[key].S_TIME,
                  'PLACE': res[key].PLACE,
                  'ETC': res[key].ETC,
                  'CONTENTS': res[key].CONTENTS
                }
              )
            }
          }
        })
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
#head_con {
  display:none;
}
.overflow-hidden {
  overflow: hidden;
}
.HomeSchedule {
  background: #F2F2F2;
  .schedule-container {
    width: 1150px;
    margin: 0 auto;
    padding: 73px 0;
    display: flex;
    justify-content: space-between;

    .title {
      font-weight: bold;
      font-size: 32px;
      line-height: 42px;
      color: $font-color-base;
      flex-basis: 150px;
    }

    .schedule-list {
      flex-basis: calc(100% - 150px);
      padding-left: 100px;

      li {
        list-style: none;
        background: #ffffff;
        padding: 30px 36px;
        border-left: 4px solid $brand-color;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item-date {
          color: $brand-color;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .item-title {
          color: $font-color-base;
          opacity: 0.87;
          font-size: 20px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  @media (min-width: 900px) and (max-width: 1149px) {
    .schedule-container {
      width: 900px !important;
    }
  }

  @media ( max-width: 899px ) {
    .schedule-container {
      width: 100%;
      margin: 0 auto;
      padding: 35px 16px;
      display: block;
      justify-content: space-between;

      .title {
        font-weight: bold;
        font-size: 20px;
        line-height: 42px;
        color: $font-color-base;
        flex-basis: 150px;
      }

      .schedule-list {
        flex-basis: calc(100% - 150px);
        padding-left: 0;
        margin-top: 14px;

        li {
          list-style: none;
          background: #ffffff;
          padding: 16px 20px;
          border-left: 4px solid $brand-color;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .item-date {
            color: $brand-color;
            margin-bottom: 10px;
            font-size: 11px;
          }

          .item-title {
            color: $font-color-base;
            opacity: 0.87;
            font-size: 16px;
          }

          &:last-child {
            margin-bottom: 0;
          }

          img {
            display: none;
          }
        }
      }
    }
  }
  .title-image {
    margin-top: 50px;
  }
  .ir-modal-title {
    font-weight: bold;
    font-size: 34px;
    letter-spacing: -0.5px;
    color: $font-color-base;
    margin-top: 18px;
    height: 153px;
  }
  .schedule-table {
    display: flex;
    justify-content: space-between;
    margin-top: 33px;
    margin-bottom: 47px;

    .title {
      padding-top: 12px;
      border-top: 1px solid $border-color;
      flex-basis: calc(20% - 18px);
      font-size: 18px;
      letter-spacing: -0.2px;
      color: $font-color-base;
    }
    .description {
      padding-top: 12px;
      border-top: 1px solid $border-color;
      flex-basis: calc(80% - 18px);
      font-size: 18px;
      letter-spacing: -0.5px;
      color: #545454;
    }
  }
  .schedule-btn {
    width: 100%;
    padding: 21px;
    background: #EFEFF4;
    text-align: center;
    margin-top: 60px;

    & a {
      font-size: 18px;
      letter-spacing: -0.005em;
      color: #000000;
    }
  }
  @media ( max-width: 899px ) {
    .title-image {
      margin-top: 30px;
    }
    .ir-modal-title {
      font-weight: bold;
      font-size: 22px;
      letter-spacing: -0.5px;
      color: $font-color-base;
      margin-top: 13px;
      word-wrap: normal;
      line-height: 1.4;
    }
    .schedule-table {
      display: flex;
      justify-content: space-between;
      margin-top: 33px;
      margin-bottom: 47px;

      .title {
        padding-top: 12px;
        border-top: 1px solid #D1D2D2;
        flex-basis: calc(20% - 18px);
        font-size: 16px;
        letter-spacing: -0.2px;
        color: $font-color-base;
      }
      .description {
        padding-top: 12px;
        border-top: 1px solid #D1D2D2;
        flex-basis: calc(80% - 18px);
        font-size: 16px;
        letter-spacing: -0.5px;
        color: #313439;
        font-weight: 400;
        word-spacing: -0.05em;
        word-break: break-all;
      }
    }
    .schedule-btn {
      width: 100%;
      padding: 21px;
      background: #EFEFF4;
      text-align: center;
      margin-top: 60px;

      & a {
        font-size: 18px;
        letter-spacing: -0.005em;
        color: #000000;
      }
    }
  }
}
</style>
