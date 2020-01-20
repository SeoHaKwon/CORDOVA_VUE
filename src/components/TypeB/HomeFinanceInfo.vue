<template>
  <div class="HomeFinanceInfo contaner" v-if="finance.length > 0 && is_view === 'Y'">
    <h2 class="section-title">재무정보</h2>
    <h3 class="section-sube">
      Financial Statements
    </h3>
    <ul class="performance-group-tab fin">
      <li v-for="(item, idx) in finance" v-on:click="setQuarter(item.YEAR + '.' + item.PERIOD + 'Q', idx)" :class="isActive[idx]" v-bind:key="item.QUARTER">
        <a>{{ item.QUARTER }}</a>
      </li>
      <li v-for="n in finlen" v-bind:key="n"></li>
    </ul>
    <div class="finance-select">
      <div class="select-warp">
        <select v-on:change="zsetQuarter($event)">
          <option v-for="(item, idx) in finance" :value="idx" v-bind:key="idx">{{ item.YEAR + '.' + item.PERIOD + 'Q' }}</option>
        </select>
        <div class="select-arrow">▲</div>
      </div>
    </div>
    <ul class="finance-info">
      <li v-on:click="getData(finance[nowQ].UPLOAD_FILE1)" v-if="finance[nowQ].UPLOAD_FILE1">
        <h5>재무상태표 ({{finance[nowQ].QUARTER}})</h5>
        <h6>
          <a>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path v-bind:fill="mcolor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
            </svg>
          </a>
          <span class="data-type" :style="{ color: mcolor}">PDF</span>
        </h6>
      </li>
      <li v-on:click="getData(finance[nowQ].UPLOAD_FILE2)" v-if="finance[nowQ].UPLOAD_FILE2">
        <h5>손익계산서 ({{finance[nowQ].QUARTER}})</h5>
        <h6>
          <a>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path v-bind:fill="mcolor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
            </svg>
          </a>
          <span class="data-type" :style="{ color: mcolor}">PDF</span>
        </h6>
      </li>
      <li v-on:click="getData(finance[nowQ].UPLOAD_FILE3)" v-if="finance[nowQ].UPLOAD_FILE3">
        <h5>현금흐름표 ({{finance[nowQ].QUARTER}})</h5>
        <h6>
          <a>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path v-bind:fill="mcolor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
            </svg>
          </a>
          <span class="data-type" :style="{ color: mcolor}">PDF</span>
        </h6>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeFinanceInfo',
  components: {
  },
  data: () => {
    return {
      nowQ: '',
      finance: [],
      isActive: {
        0: 'active',
        1: '',
        2: '',
        3: '',
        4: ''
      },
      ori_active: 0,
      mcolor: '',
      is_view: 'N',
      finlen: 0
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getMainColor', 'GETISVIEW'])
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.getFinance()
    }
    if (_self.GETISVIEW) {
      _self.setIsView()
    }
    if (_self.getMainColor) {
      _self.setMainColor()
    }
  },
  methods: {
    getData (FILE) {
      window.open('https://file.irgo.co.kr/data/IRPAGE/FINANCE/' + FILE, '_BLANK')
    },
    setQuarter (Q, idx) {
      const _self = this
      _self.nowQ = Q
      _self.setActive(idx)
    },
    zsetQuarter (e) {
      // console.log(e.target.value.substr(2))
      const _self = this
      _self.nowQ = e.target.value
      _self.setActive(e.target.value)
    },
    setActive (idx) {
      const _self = this
      _self.isActive[_self.ori_active] = ''
      _self.isActive[idx] = 'active'
      _self.ori_active = idx
    },
    getFinance () {
      const _self = this
      const aram = {
        seq: _self.getCompSeq
      }
      this.$store.dispatch('GET_FINANCE', aram)
        .then(res => {
          // _.remove(res, { 'UPLOAD_FILE1': null, 'UPLOAD_FILE2': null, 'UPLOAD_FILE3': null })
          if (res.length !== 0) {
            if (res.length > 5) {
              res.splice(0, 5)
            }
            _self.finlen = 5 - res.length
            _self.nowQ = res[0].YEAR + '.' + res[0].PERIOD + 'Q'
            // const cons = 5 - res.length
            for (let i = 0; i < res.length; i++) {
              res[res[i].YEAR + '.' + res[i].PERIOD + 'Q'] = res[i]
              res[res[i].YEAR + '.' + res[i].PERIOD + 'Q'].QUARTER = res[i].YEAR.substr(2, 2) + '.' + res[i].PERIOD + 'Q'
            }
            _self.finance = res
          }
        })
    },
    setIsView () {
      this.is_view = this.GETISVIEW.Finance
    },
    setMainColor () {
      this.mcolor = '#' + this.getMainColor
    }
  },
  watch: {
    GETISVIEW () {
      const _self = this
      _self.setIsView()
    },
    getCompSeq () {
      const _self = this
      _self.getFinance()
    },
    getMainColor () {
      const _self = this
      _self.setMainColor()
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
.HomeFinanceInfo {
    padding-top: 200px;

    .finance-select {
        display: flex;
        justify-content: flex-end;
        margin-top: 40px;
    }

    .finance-info {
        margin-top: 53px;
        list-style: none;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 40px 20px;
            border-bottom: 1px solid $border-color;
            height: 120px;

            &:first-child {
                border-top: 1px solid $border-color;
            }

            h5 {
                font-size: 21px;
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

        .finance-select {
            display: flex;
            justify-content: flex-end;
            margin-top: 13px;
            display: none;
        }

      .finance-info {
          margin-top: 0;
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
                  border-top: 0;
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
