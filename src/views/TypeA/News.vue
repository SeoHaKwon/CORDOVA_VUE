<template>
  <div class="sub-wrap">
    <div class="sub-visual-wrap">
      <SubVisual/>
      <div class="sub-info-txt">
        <div class="inner">
          <strong class="sub-title">IR NEWS</strong>
          <div class="history">
            <span class="icon-home" v-on:click="goHome">
              <img src="@/assets/images/icon/icon_home.png" alt="">
            </span>
            <span>IR NEWS</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-top">
      <NewsList :NewsList="topNews"/>
    </div>
    <div class="content-bottom">
      <ThumbnailBoard :NewsList="NewsData" v-on:requestData="moreData" :isMore="yesMore"/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import SubVisual from '@/components/TypeA/SubVisual.vue'
import NewsList from '@/components/TypeA/NewsList.vue'
import ThumbnailBoard from '@/components/TypeA/ThumbnailBoard.vue'
import Footer from '@/components/TypeA/Footer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'News',
  components: {
    SubVisual,
    NewsList,
    ThumbnailBoard,
    Footer
  },
  data: () => {
    return {
      allData: [],
      NewsData: [],
      topNews: [],
      yesMore: true
    }
  },
  computed: {
    ...mapGetters(['getCompSeq'])
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
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.getNewsData()
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    NewsDetail (index) {
      const _self = this
      _self.$router.replace({ name: 'newsView', params: { 'index': index } })
    },
    getNewsData () {
      const _self = this
      const aram = {
        seq: _self.getCompSeq
      }
      this.$store.dispatch('GET_IRNEWS', aram)
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
            if (res[key].CONTENTS) {
              res[key].CONTENTS = res[key].CONTENTS.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/gi, '')
            }

            if (!res[key].UPLOAD_THUMBNAIL) {
              res[key].li_class = 'text-box'
              res[key].div_tag = 'news-txt'
              res[key].p_tag = 'news-bottom-txt'
            } else {
              res[key].li_class = ''
              res[key].div_tag = 'new-img'
              res[key].p_tag = 'news-txt'
            }
          }
          _self.allData = res
          _self.topNews = res.splice(0, 3)
          _self.NewsData = _self.allData.splice(0, 10)
        })
    },
    moreData () {
      const _self = this
      _self.NewsData = _self.NewsData.concat(_self.allData.splice(0, 5))
      if (_self.allData.length === 0) {
        _self.yesMore = false
      }
    }
  }
}

</script>
