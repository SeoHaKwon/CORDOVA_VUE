<template>
  <div class="PerformanceFAQ contaner" v-if="qtype == 'Y'">
    <h2 class="section-title-roboto">FAQ</h2>
    <h3 class="section-sube">
      Frequently Asked Questions
    </h3>
    <!-- <ul class="performance-group-tab faq">
      <li v-for="(items, idx) in faQ" v-bind:key="idx" v-on:click="getContents(items, idx)" :class="isActive[idx]">
        <a>{{ items }}</a>
      </li>
    </ul> -->
    <ul class="performance-FAQ">
      <li v-on:click="clickModal(true, idx)" v-for="(items, idx) in faqContents" v-bind:key="idx">
        <h5>
          Q
        </h5>
        <div class="title">
          <h4>{{ items.QUESTION }}<span v-if="items.QUESTION.length > 100">...</span></h4>
          <h6>{{ items.Q_REG_DATE | v_date}}</h6>
        </div>
      </li>
    </ul>
    <div class="home-more-btn" v-if="allData.length !== 0">
      <button type="button" v-on:click="moreFaqTypeA()">
        <h6>더보기</h6>
        <img width="12px" src="@/assets/Type_B/img/more_arrow.png" />
      </button>
    </div>
    <div class="question_div" v-if="getUserDI || isMobile">
      <button class="question" v-on:click="goAsk" style="border: 0;cursor: pointer;" :style="{'background-color': mcolor}">문의하기</button>
    </div>
    <modal-desktop v-if="getOpenModal && getModalCate === 'FAQ'">
      <div slot="body">
        <div class="modal-desktop-close" @click="clickModal(false)">
            <img width="40px" src="@/assets/Type_B/img/ic_modal_close.png"/>
        </div>
        <div class="modal-mobile-header">
          <svg style="width:32px;height:32px" viewBox="0 0 24 24" @click="clickModal(false)">
            <path fill="#313439" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
          <span style="color: #313439;">FAQ</span>
        </div>
        <h5 class="modal-map">Investor Relations > FAQ</h5>
        <h5 class="FAQ-modal-question" v-if="faqContents[viewIdx].QUESTION">
            <div class="quest-anser-icon">
              Q
            </div>
            <span class="faq-question-title">{{faqContents[viewIdx].Q_USER}} 주주님의 질문입니다.</span>
        </h5>
        <h5 class="FAQ-modal-title" v-html="faqContents[viewIdx].QUESTION" />
        <div class="social-info" v-if="false">
          <h5 class="date">
          </h5>
          <div class="social-sns" v-if="false">
            <img width="7px" src="@/assets/Type_B/img/modal_facebook.png"/>
            <img width="18px" src="@/assets/Type_B/img/modal_twiiter.png"/>
            <img width="80px" src="@/assets/Type_B/img/modal_share.png"/>
          </div>
        </div>
        <h5 class="FAQ-modal-anser">
          <div class="quest-anser-icon anser" :style="{color: mcolor, border: '2px solid'+mcolor}">
            A
          </div>
          <span class="faq-answer-title">{{faqContents[viewIdx].A_REG_DATE | v_date}}</span>
        </h5>
        <h4 class="IR-main-description" v-html="faqContents[viewIdx].ANSWER">
        </h4>
        <div class="FAQ-file-upload" v-if="faqContents[viewIdx].UPLOAD_FILE1 == '' && faqContents[viewIdx].UPLOAD_FILE2 == ''">
          <div class="title">첨부파일</div>
          <div class="file-list">
            <h5 style="cursor:pointer;" v-if="faqContents[viewIdx].UPLOAD_FILE1">
              <img width="16px" src="@/assets/Type_B/img/file_type_pdf_1.png"/>
              첨부파일 1
            </h5>
            <h5 style="cursor:pointer;" v-if="faqContents[viewIdx].UPLOAD_FILE2">
              <img width="16px" src="@/assets/Type_B/img/file_type_pdf_2.png"/>
              첨부파일 2
            </h5>
          </div>
        </div>
        <ul class="IR-modal-list" v-if="false">
          <li>
            <img width="30px" src="@/assets/Type_B/img/IR_modal_left_arrow.png"/>
            <h5>다음</h5>
            <h4>JP Global TMT Conference 발표자료</h4>
          </li>
          <li>
            <img width="30px" src="@/assets/Type_B/img/IR_modal_right_arrow.png"/>
            <h5>이전</h5>
            <h4>JP Global TMT Conference 발표자료</h4>
          </li>
        </ul>
      </div>
    </modal-desktop>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PerformanceFAQ',
  data () {
    return {
      viewIdx: 0,
      faQ: [],
      faqContents: [],
      isActive: {
        0: 'active',
        1: '',
        2: '',
        3: '',
        4: ''
      },
      allData: [],
      ori_active: 0,
      qtype: '',
      mcolor: '',
      isMobile: false
    }
  },
  filters: {
    v_date: function (date) {
      const key = new Date(date)
      const year = key.getFullYear()
      const month = key.getMonth() + 1
      const day = key.getUTCDate()
      return year + '년 ' + month + '월 ' + day + '일'
    }
  },
  methods: {
    clickModal (isOpen, idx) {
      const globalBody = document.getElementsByTagName('html')[0]
      const _self = this
      if (isOpen) {
        _self.viewIdx = idx
        this.faqContents[this.viewIdx].QUESTION = this.faqContents[this.viewIdx].QUESTION.replace('\r\n', '<br>')
        globalBody.style.overflow = 'hidden'
      } else {
        globalBody.style.overflow = 'inherit'
      }
      this.$store.commit('setModalCate', 'FAQ')
      this.$store.commit('setOpenModal', isOpen)
    },
    getContents (quat, idx) {
      const _self = this
      _self.setActive(idx)
      _self.$emit('changeQuarterfaq', quat)
      if (localStorage.getItem('DI')) {
        _self.isMobile = true
      }
    },
    setActive (idx) {
      const _self = this
      _self.isActive[_self.ori_active] = ''
      _self.isActive[idx] = 'active'
      _self.ori_active = idx
    },
    moreFaqTypeA () {
      const _self = this
      _self.faqContents = _self.faqContents.concat(_self.allData.splice(0, 5))
    },
    goAsk () {
      this.$router.push('/ask')
    },
    getData () {
      const _self = this
      const param = {
        code: _self.getCompCode,
        seq: _self.getCompSeq
      }
      const res = this.$store.dispatch('GET_SILQ', param)
      res.then(data => {
        for (let i = 0; i < (data.length > 5 ? 5 : data.length); i++) {
          let q = data[i].YEAR + '.' + data[i].PERIOD + 'Q'
          _self.faQ.push(q)
        }
      })
      const aram = {
        seq: _self.getCompSeq
      }
      this.$store.dispatch('GET_FAQ', aram)
        .then(res => {
          if (_self.qtype === 'Y' && res.length > 0) {
            _self.$store.commit('SET_QALEN', res.length)
          }
          _self.allData = res
          _self.faqContents = res.splice(0, 5)
        })
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getCompCode', 'getQaType', 'getMainColor', 'getUserDI', 'getOpenModal', 'getModalCate'])
  },
  watch: {
    getMainColor () {
      this.mcolor = '#' + this.getMainColor
    },
    getQaType () {
      this.qtype = this.getQaType
    },
    getCompSeq () {
      this.getData()
    }
  },
  mounted () {
    if (this.getCompSeq) {
      this.getData()
    }
    if (this.getQaType) {
      this.qtype = this.getQaType
    }
    if (this.getMainColor) {
      this.mcolor = '#' + this.getMainColor
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
#FAQ > ul > li {
  cursor: pointer;
}
.question_div {
  display: flex;
  justify-content: center;
}
.question {
    padding: 8px 30px;
    margin-top: 50px;
    background-color: #E91E63;
    color: white;
    border-radius: 17px;
}
.PerformanceFAQ {
  padding-top: 200px;
    .FAQ-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 137px;

      & h4 {
        font-size: 32px;
        color: $font-color-base;
      }
    }
    .performance-faq-select {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .performance-FAQ {
      list-style: none;
      margin-top: 106px;

      li {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $border-color;
        padding: 40px 20px;

        &:first-child {
          border-top: 1px solid $border-color;
          margin-top: 34px;
        }

        & h5 {
          flex-basis: 25px;
          font-size: 18px;
          line-height: 1.4;
          letter-spacing: -0.5px;
          color: #C7C7CC;
        }
        & .title {
          flex-basis: calc(100% - 25px);
          padding-left: 8px;

          & h4 {
            font-size: 18px;
            letter-spacing: -0.5px;
            color: $font-color-base;
            line-height: 1.4;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            height: 2.7em;
            overflow: hidden;
          }
          & h6 {
            font-size: 12px;
            letter-spacing: -0.5px;
            color: #8E8E93;
            opacity: 0.87;
            margin-top: 20px;
            margin-bottom: 0;
          }
        }
      }
    }

    @media ( max-width: 899px ) {
      .performance-select {
        display: none !important;
      }
      .performance-faq-select {
      display: none;
    }
      .FAQ-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 38px;
          padding: 0 16px;

          & h4 {
              font-size: 32px;
              color: $font-color-base;
          }
      }
      .performance-FAQ {
          list-style: none;
          padding-top: 35px;
          margin-top: 0;
          li {
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid $border-color;
              margin: 0 16px 0 16px;
              cursor: pointer;
              padding: 20px 0;
              overflow: hidden;

              &:first-child {
                  // border-top: 0;
                  margin-top: 16px;
              }

              & h5 {
                  flex-basis: 25px;
                  font-size: 21px;
                  letter-spacing: -0.5px;
                  color: #C7C7CC;
                  display: none;
              }
              & .title {
                  flex-basis: calc(100% - 25px);
                  padding-left: 0;

                  & h4 {
                      font-size: 16px;
                      letter-spacing: -0.5px;
                      color: $font-color-base;
                      line-height: 1.4;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 3;
                      -webkit-box-orient: vertical;
                      height: 4.3em;
                      overflow: hidden;
                  }
                  & h6 {
                      font-size: 10px;
                      letter-spacing: -0.5px;
                      color: #8E8E93;
                      opacity: 0.87;
                      margin-top: 20px;
                  }
              }
          }
      }
    }
    .FAQ-modal-anser,
    .FAQ-modal-question {
        display: flex;
        justify-content: left;
        align-items: center;
        font-weight: bold;
        font-size: 16px;
        color: #8E8E93;
        opacity: 0.87;
        margin-top: 60px;

        .quest-anser-icon {
          margin-right: 7px;
          border: 2px solid #8E8E93;
          color: #8E8E93;
          width: 52px;
          height: 52px;
          line-height: 52px;
          font-size: 25px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          &.anser {
            //border: 2px solid $brand-color;
            //color: $brand-color;
          }
        }
        .faq-question-title, .faq-answer-title {
          font-weight: 400;
        }
      }
      .FAQ-modal-anser {
        padding-top: 60px;
        border-top: 1px solid $border-color;
        margin-top: 20px;
      }
      .FAQ-modal-title {
          font-weight: 500;
          font-size: 18px;
          margin-top: 25px;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
          color: $font-color-base;
          line-height: 1.6;
          // height: 143px;
      }
      .IR-main-description {
          margin-top: 57px;
          line-height: 1.4;
          text-align: justify;
      }
      .inner-title {
          font-size: 24px;
          font-weight: bold;
      }
      .FAQ-file-upload {
        background: #EFEFF4;
        opacity: 0.6;
        border: 1px solid #E5E5EA;
        border-radius: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        margin-top: 120px;

        .title {
          flex-basis: 100px;
        }
        .file-list {
          flex-basis: calc(100% - 100px);
          justify-content: left;
          align-items: center;
          display: flex;
          padding: 5px 10px;;
          border-left: 1px solid #D3D3D3;

          h5 {
            justify-content: left;
            align-items: center;
            display: flex;
            margin-right: 20px;

            img {
              margin-right: 9px;
            }
          }
        }

      }

  @media ( max-width: 899px ) {
  &.contaner {
    // padding: 38px 0;
    padding: 55px 0;
    border-top: 8px solid #EFEFF4;
  }
  .FAQ-modal-anser {
    padding-top: 21px;
    border-top: 1px solid $border-color;
  }
  .FAQ-modal-anser,
  .FAQ-modal-question {
      display: flex;
      justify-content: left;
      align-items: center;
      font-weight: bold;
      font-size: 12px;
      color: #8E8E93;
      opacity: 0.87;
      margin-top: 60px;

      img {
        margin-right: 17px;
        width: 40px;
      }
    }
    .FAQ-modal-title {
        font-weight: 500;
        font-size: 16px;
        margin-top: 25px;
        letter-spacing: -0.5px;
        color: $font-color-base;
        line-height: 1.4;
        word-wrap: normal;
    }
    .IR-main-description {
        margin-top: 57px;
        line-height: 1.6em;
        font-size: 16px;
        font-weight: 400;
        text-align: left;
        word-break: break-all;
        word-spacing: -0.05em;
        color: #313439;

        p {
          text-align: justify;
          word-break: break-all;
          word-spacing: -0.05em;
        }
    }
    .inner-title {
      font-size: 24px;
      font-weight: bold;
    }
    .FAQ-file-upload {
      background: #EFEFF4;
      opacity: 0.6;
      border: 1px solid #E5E5EA;
      border-radius: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      margin-top: 120px;

      .title {
        flex-basis: 100px;
      }
      .file-list {
        flex-basis: calc(100% - 100px);
        justify-content: left;
        align-items: center;
        display: flex;
        padding: 5px 10px;;
        border-left: 1px solid #D3D3D3;

        h5 {
          justify-content: left;
          align-items: center;
          display: flex;
          margin-right: 20px;

          img {
            margin-right: 9px;
          }
        }
      }
    }
  }
}
</style>
