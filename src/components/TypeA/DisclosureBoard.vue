<template>
    <div class="board-section">
      <ul class="list">
        <li v-for="(item, idx) in disclo" v-on:click="goDISCLO(item.SITEURL)" v-bind:key="idx">
          <strong class="board-title">
            {{ item.TITLE }}
          </strong>
          <span class="day">{{ item.REG_DATE | v_date }}</span>
          <a href="" class="link"></a>
        </li>
      </ul>
      <div class="btn-wrap center">
        <button type="button" class="btn_more" v-on:click="moreData()">
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
      disclo: [],
      allData: [],
      isDisclo: true
    }
  },
  computed: {
    ...mapGetters(['getCompCode', 'getCompName'])
  },
  filters: {
    v_date: function (date) {
      return date.replace('/-/gi', '. ')
    }
  },
  mounted () {
    const _self = this
    if (_self.getCompCode) {
      _self.getDisclosureData()
    }
  },
  watch: {
    getCompCode () {
      const _self = this
      _self.getDisclosureData()
    }
  },
  methods: {
    moreData () {
      const _self = this
      _self.disclo = _self.disclo.concat(_self.allData.splice(0, 5))
    },
    getDisclosureData () {
      const _self = this
      const aram = {
        comp_name: _self.getCompName,
        code: _self.getCompCode
      }
      this.$store.dispatch('GET_DIS', aram)
        .then(res => {
          if (res.length === 0) {
            _self.isDisclo = false
          } else {
            _self.disclo = res.splice(0, 10)
            _self.allData = res
          }
        })
    },
    goDISCLO (url) {
      window.open(url, '_BLANK')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.list li { cursor: pointer; }
</style>
