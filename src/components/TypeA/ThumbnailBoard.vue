<template>
    <div class="board-section">
      <ul class="list thumbnail">
        <li v-for="(item, idx) in NewsList" v-on:click="goDetail(item.B_SEQ)" :class="{'txt': !item.UPLOAD_THUMBNAIL }" v-bind:key="idx">
          <div class="thumbnail-img" v-if="item.UPLOAD_THUMBNAIL">
            <img src="@/assets/images/img/imgthumbnail01.png" alt="">
          </div>
          <div class="thumbnail-txt">
            <p class="category">{{ item.TOPIC_TYPE }}</p>
            <strong class="board-title">
              {{ item.TITLE }}
            </strong>
          </div>
          <span class="day">{{ item.MOD_DATE | v_date }}</span>
          <a href="" class="link"></a>
        </li>
      </ul>
      <div class="btn-wrap center" v-if="isMore">
        <button type="button" class="btn_more" v-on:click="moreData">
          <span>more</span>
        </button>
      </div>
    </div>
</template>

<script>
export default {
  props: ['NewsList', 'isMore'],
  data: () => {
    return {
    }
  },
  filters: {
    v_date: function (date) {
      const key = new Date(date)
      const year = String(key.getFullYear()).substr(2, 2)
      let month = key.getMonth() + 1
      let day = key.getDate()
      month = (month > 9) ? month : '0' + month
      day = (day > 9) ? day : '0' + day
      return year + ' . ' + month + ' . ' + day
    }
  },
  methods: {
    goDetail (index) {
      const _self = this
      _self.$router.push({ name: 'newsView', params: { 'index': index } })
    },
    moreData () {
      const _self = this
      _self.$emit('requestData')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
