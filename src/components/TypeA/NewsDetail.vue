<template>
  <div class="detail-section">
    <div class="news-title">
      <div class="news-txt">
       <strong class="category" :style="{color: mcolor}">{{ NewsList.TOPIC_TYPE }}</strong>
        <p>
          {{ NewsList.TITLE }}
        <span class="date">{{ NewsList.MOD_DATE | v_date }}</span>
        </p>
      </div>
    </div>
    <div class="datail-inner">
      <div class="top-section">
        <dl class="files" v-if="NewsList.UPLOAD_FILE1">
          <dt>첨부파일</dt>
          <dd class="icon-file pdf">{{ NewsList.ORI_FILE1 }} <button type="button" class="file-down"></button></dd>
        </dl>
        <!-- <div class="sns-group">
          <a href="#" class="facebook"></a>
          <a href="#" class="twitter"></a>
          <a href="#" class="blog"></a>
          <a href="#" class="talk"></a>
        </div> -->
      </div>
      <div class="desc" v-html="NewsList.CON">
       </div>
      <div class="list-btn">
        <div class="link-box prev" v-if="is_prev" v-on:click="routeView(prev_seq)">
          <span>이전글</span>
          <div>
            <strong class="catagory">{{prev_type}}</strong>
            <p>{{prev_title}}</p>
            <span class="date is_mobile">{{prev_date | v_date}}</span>
          </div>
          <a href="#" class="link"></a>
        </div>
        <div class="link-box next" v-if="is_next" v-on:click="routeView(next_seq)">
          <span>다음글</span>
          <div>
            <strong class="catagory">{{next_type}}</strong>
            <p>{{next_title}}</p>
            <span class="date is_mobile">{{next_date | v_date}}</span>
          </div>
          <a href="#" class="link"></a>
        </div>
      </div>
      <div class="btn-wrap center">
        <a href="javascript:void(0)" class="box-link back active" v-on:click="goList" :style="{'border-color': mcolor}"><span :style="{color: mcolor}">목록<span :style="{background: mcolor}"></span></span></a>
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
      NewsList: [],
      prev_type: '',
      prev_title: '',
      prev_date: '',
      prev_seq: 0,
      next_type: '',
      next_title: '',
      next_date: '',
      next_seq: 0,
      is_prev: false,
      is_next: false,
      mcolor: ''
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
    }
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.getNewsData()
    }
    if (_self.getMainColor) {
      _self.mcolor = '#' + _self.getMainColor
    }
  },
  watch: {
    getCompSeq () {
      const _self = this
      if (_self.getCompSeq) {
        _self.getNewsData()
      }
    },
    '$route.params' () {
      const _self = this
      _self.v_idx = _self.$route.params.index
      _self.is_prev = false
      _self.is_next = false
      _self.getNewsData()
    },
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
    }
  },
  methods: {
    goList () {
      const _self = this
      _self.$router.replace({ name: 'news' })
    },
    routeView (index) {
      const _self = this
      _self.$router.replace({ name: 'newsView', params: { 'index': index } })
    },
    getNewsData () {
      const _self = this
      const aram = {
        seq: _self.getCompSeq,
        b_seq: _self.$route.params.index,
        sign: '!='
      }
      _self.v_idx = _self.$route.params.index
      this.$store.dispatch('GET_BDETAIL', aram)
        .then(res => {
          for (var key in res) {
            if (res[key].TOPIC_TYPE === 'P') {
              res[key].TOPIC_TYPE = 'IR 자료'
            } else if (res[key].TOPIC_TYPE === 'N') {
              res[key].TOPIC_TYPE = '보도자료'
            } else if (res[key].TOPIC_TYPE === 'O') {
              res[key].TOPIC_TYPE = 'IR 자료'
            } else if (res[key].TOPIC_TYPE === 'R') {
              res[key].TOPIC_TYPE = 'IR 브리핑'
            } else if (res[key].TOPIC_TYPE === 'T') {
              res[key].TOPIC_TYPE = '주주서한'
            }
            if (res[key].GUBUN === 'O') {
              _self.NewsList = res[key]
            } else if (res[key].GUBUN === 'P') {
              _self.is_prev = true
              _self.prev_type = res[key].TOPIC_TYPE
              _self.prev_title = res[key].TITLE
              _self.prev_date = res[key].MOD_DATE
              _self.prev_seq = res[key].B_SEQ
            } else if (res[key].GUBUN === 'N') {
              _self.is_next = true
              _self.next_type = res[key].TOPIC_TYPE
              _self.next_title = res[key].TITLE
              _self.next_date = res[key].MOD_DATE
              _self.next_seq = res[key].B_SEQ
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
.desc img {
  max-width: 100%;
}
.desc {
  a {
    color: blue;
  }
}
  .news-title{
    .category {
      display:block;
      margin-bottom:10px;
      font-size:16px;
      line-height:16px;
      font-weight: 500;
      color:$blue;
    }
    .date {
      position:absolute;
      right:0;
      top:0;
      font-size:17px;
      color:#a9acb3;
    }
    .news-txt{
      position:relative;
      @include contentWidth($width:1200px);
      padding:90px 0 108px 0;
      font-size:24px;
      line-height:36px;
      color:$black3;
      font-weight: 500;
      border-top:2px solid $black3;
      border-bottom:1px solid #ececec;
      p {
        position:relative;
        padding-right:150px;
      }
    }
  }

</style>
