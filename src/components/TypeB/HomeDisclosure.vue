<template>
  <div class="HomeDisclosure contaner" v-if="isDisclo && is_view == 'Y'">
    <h2 class="section-title">공시</h2>
    <h3 class="section-sube">
      Disclosure
    </h3>
    <ul class="disclosure-info">
        <li v-for="(item, idx) in disclo" v-on:click="GSITE(item.SITEURL)" v-bind:key="idx">
            <h5>{{ item.TITLE }}</h5>
            <h6>
                {{ item.REG_DATE | v_date}}
            </h6>
        </li>
    </ul>
    <div class="home-more-btn" v-if="allData.length !== 0">
      <button
        type="button"
        v-on:click="moreData"
      >
      <h6>더보기</h6>
      <img width="12px" src="@/assets/Type_B/img/more_arrow.png"/>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeDisclosure',
  components: {
  },
  data: () => {
    return {
      disclo: [],
      allData: [],
      isDisclo: true,
      is_view: 'N'
    }
  },
  mounted () {},
  computed: {
    ...mapGetters(['getCompSeq', 'getCompCode', 'GETISVIEW'])
  },
  filters: {
    v_date: function (date) {
      const key = new Date(date)
      const year = key.getFullYear()
      const month = key.getMonth() + 1
      const day = key.getDate()
      return year + '년 ' + month + '월 ' + day + '일'
    }
  },
  methods: {
    GSITE (url) {
      window.open(url, '_BLANK')
    },
    moreData () {
      const _self = this
      _self.disclo = _self.disclo.concat(_self.allData.splice(0, 5))
    }
  },
  watch: {
    GETISVIEW () {
      const _self = this
      _self.is_view = _self.GETISVIEW.Disclosure
    },
    getCompCode () {
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
            _self.disclo = res.splice(0, 5)
            _self.allData = res
          }
        })
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
.HomeDisclosure {
  padding-top: 200px;

  .disclosure-info {
      margin-top: 106px;
      list-style: none;

      li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 20px;
          border-bottom: 1px solid $border-color;
          height: 100px;
          cursor: pointer;

          &:first-child {
              border-top: 1px solid $border-color;
          }

          h5 {
              font-size: 18px;
              letter-spacing: -0.5px;
              color: $font-color-base;
          }
          h6 {
              font-size: 12px;
              text-align: right;
              letter-spacing: -0.5px;
              color: #8E8E93;
          }
      }
  }

  @media ( max-width: 899px ) {
    // padding: 38px 0;
    padding: 55px 0;
    border-top: 8px solid #EFEFF4;

    .disclosure-info {
        margin-top: 50px;
        list-style: none;
        padding: 0 16px;

        li {
            display: block;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid $border-color;
            height: auto;

            &:first-child {
                border-top: 1px solid $border-color;
            }

            h5 {
                font-size: 16px;
                letter-spacing: -0.5px;
                color: $font-color-base;
            }
            h6 {
                ont-size: 10px;
                text-align: left;
                letter-spacing: -0.5px;
                color: #8E8E93;
                margin-top: 7px;
            }
        }
    }
  }
}
</style>
