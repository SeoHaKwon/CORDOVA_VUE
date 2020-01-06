<template>
  <div class="detail-section">
    <div class="question-title">
      <p>{{ questions }}
    </p>
    </div>
    <div class="datail-inner">
      <div class="top-section">
        <dl class="files" v-if="FILE1">
          <dt>첨부파일</dt>
          <dd class="icon-file pdf">시장조사기관 IDC 보고 .pdf <button type="button" class="file-down"></button></dd>
        </dl>
        <div class="sns-group" v-if="false">
          <a href="#" class="facebook"></a>
          <a href="#" class="twitter"></a>
          <a href="#" class="blog"></a>
          <a href="#" class="talk"></a>
        </div>
      </div>
      <div class="answer-section desc" v-html="answer">
        <!-- <strong class="tit">#1. 빅스비</strong><br><br> -->
      </div>
      <div class="list-btn">
        <div class="link-box prev" v-if="prev_title" v-on:click="changePage(prev_idx)">
          <span>이전글</span>
          <p>{{ prev_title }}</p>
          <a href="#" class="link"></a>
        </div>
        <div class="link-box next" v-if="next_title" v-on:click="changePage(next_idx)">
          <span>다음글</span>
          <p>{{ next_title }}</p>
          <a href="#" class="link"></a>
        </div>
      </div>
      <div class="btn-wrap center">
        <a href="#" class="box-link back active" v-on:click="returnMain" :style="{'border-color': mcolor}"><span :style="{color: mcolor}">목록<span :style="{background: mcolor}"></span></span></a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      allData: [],
      v_idx: 0,
      questions: '',
      answer: '',
      FILE1: '',
      prev_title: '',
      prev_idx: 0,
      next_title: '',
      next_idx: 0,
      mcolor: ''
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getMainColor'])
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.getFaqContent()
    }
    if (_self.getMainColor) {
      _self.mcolor = '#' + _self.getMainColor
    }
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.getFaqContent()
    },
    '$route.params' (to, from) {
      const _self = this
      _self.getFaqContent()
    },
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
    }
  },
  methods: {
    returnMain () {
      const _self = this
      _self.$router.push('/Announcement')
    },
    changePage (idx) {
      const _self = this
      // _self.$router.push({ name: 'announcementView', params: { 'index': idx } })
      _self.$router.replace({ name: 'announcementView', params: { 'index': idx } })
    },
    getFaqContent () {
      const _self = this
      _self.v_idx = _self.$route.params.index
      const aram = {
        seq: _self.getCompSeq
      }
      this.$store.dispatch('GET_FAQ', aram)
        .then(res => {
          if (_self.qtype === 'Y' && res.length > 0) {
            _self.$store.commit('SET_QALEN', res.length)
          }
          _self.allData = res
          _self.questions = res[_self.v_idx].QUESTION
          _self.answer = res[_self.v_idx].ANSWER
          _self.FILE1 = res[_self.v_idx].UPLOAD_FILE1
          if (res.length < 2) {
            _self.prev_title = ''
            _self.next_title = ''
          } else if (!res[Number(_self.v_idx) + 1]) {
            _self.prev_title = res[Number(_self.v_idx) - 1].QUESTION
            _self.prev_idx = Number(_self.v_idx) - 1
            _self.next_title = ''
          } else if (!res[Number(_self.v_idx) - 1]) {
            _self.prev_title = ''
            _self.next_title = res[Number(_self.v_idx) + 1].QUESTION
            _self.next_idx = Number(_self.v_idx) + 1
          } else {
            _self.prev_title = res[Number(_self.v_idx) - 1].QUESTION
            _self.prev_idx = Number(_self.v_idx) - 1
            _self.next_title = res[Number(_self.v_idx) + 1].QUESTION
            _self.next_idx = Number(_self.v_idx) + 1
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
  .question-title{
    p{
      @include contentWidth($width:1200px);
      padding:100px 0 100px 50px;
      font-size:24px;
      line-height:36px;
      color:$black3;
      font-weight: 500;
      border-top:2px solid $black3;
      border-bottom:1px solid #ececec;
      @include bgImg(bg/bg_qa_q2,$pos:left center);
    }
  }
  .datail-inner{
    .answer-section{
      @include bgImg(bg/bg_qa_a,$pos:left top);
      padding-left:50px;
      .tit {
        font-size:18px;
        line-height:20px;
        color:$blue;
      }
    }
  }
  @media screen and (max-width: 1000px) {
    .question-title  {
      p {
        padding:57px 35px;
        font-size:15px;
        line-height:20px;
        background-size:16.5px 17.5px;
        background-position:left top 60px;
      }
    }
  }
</style>
