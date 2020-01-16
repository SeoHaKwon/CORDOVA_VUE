<template>
  <div class="HomeManagementReport contaner" v-if="report.length > 0">
    <h2 class="section-title">경영보고서</h2>
    <h3 class="section-sube">
      Documents & Report
    </h3>
    <ul class="management-report">
        <li v-for="(item, key) in report" v-on:click="openData(item.UPLOAD_FILE)" v-bind:key="key">
            <h5>{{ item.TITLE }}</h5>
            <h6>
              <a>
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path v-bind:fill="mcolor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                </svg>
              </a>
                <span class="data-type" :style="{ color: mcolor }">PDF</span>
            </h6>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeManagementReport',
  components: {
  },
  data: () => {
    return {
      report: [],
      mcolor: ''
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getMainColor'])
  },
  watch: {
    getCompSeq () {
      this.getReport()
    },
    getMainColor () {
      this.setMainColor()
    }
  },
  mounted () {
    if (this.getCompSeq) {
      this.getReport()
    }
    if (this.getMainColor) {
      this.setMainColor()
    }
  },
  methods: {
    openData (FILENAME) {
      window.open('https://file.irgo.co.kr/data/IRPAGE/BIZ_REPORT/' + FILENAME, '_BLANK')
    },
    getReport () {
      const _self = this
      const aram = {
        seq: _self.getCompSeq
      }
      this.$store.dispatch('GET_MREPORT', aram)
        .then(res => {
          _self.report = res
        })
    },
    setMainColor () {
      this.mcolor = '#' + this.getMainColor
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
.HomeManagementReport {
  padding-top: 185px;
  .management-report {
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
        font-size: 18px;
        display: flex;
        align-items: center;
        text-align: right;
        color: $brand-color;
      }
    }
  }
  @media ( max-width: 899px ) {
  // padding: 38px 0;
  padding: 55px 0;
  border-top: 8px solid #EFEFF4;
    .management-report {
      margin-top: 50px;
      list-style: none;
      padding: 0 16px;

      li {
          display: flex;
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
          font-size: 18px;
          display: flex;
          align-items: center;
          text-align: right;
          color: $brand-color;

          span {
            display: none;
          }
        }
      }
    }
  }
}
</style>
