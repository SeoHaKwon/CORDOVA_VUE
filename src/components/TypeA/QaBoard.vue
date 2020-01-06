<template>
    <div class="board-section">
      <p class="title-wrap">
        <strong>자주하는 질문과 답변</strong>
      </p>
      <ul class="list qa">
        <li v-for="(item, idx) in faqContents" v-bind:key="idx" v-on:click="ViewPage(idx)">
          <strong class="board-title">
            {{ item.QUESTION }}
          </strong>
          <a href="javascript:void(0)" class="link"></a>
        </li>
      </ul>
      <div class="btn-wrap center" v-if="allData.length > 0">
        <button type="button" class="btn_more" v-on:click="moreFaqContents">
          <span>more</span>
        </button>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => {
    return {
      faqContents: [],
      allData: []
    }
  },
  computed: {
    ...mapGetters(['getCompSeq'])
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.getFaqContent()
    }
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.getFaqContent()
    }
  },
  methods: {
    ViewPage (idx) {
      const _self = this
      _self.$router.push({ name: 'announcementView', params: { 'index': idx } })
    },
    moreFaqContents () {
      const _self = this
      _self.faqContents = _self.faqContents.concat(_self.allData.splice(0, 5))
    },
    getFaqContent () {
      const _self = this
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
