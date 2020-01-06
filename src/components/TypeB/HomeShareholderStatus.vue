<template>
  <div class="HomeShareholderStatus contaner" v-if="isShareHolder == 'Y' || isDividend == 'Y'">
      <h2 class="section-title">주주현황</h2>
      <h3 class="section-sube">
        Shareholders Status
      </h3>
      <div class="shareholder-group" v-if="isShareHolder == 'Y'">
          <h3 class="shareholder-group-title">
              주주구성
          </h3>
          <div class="shareholder-group-items">
              <div class="shareholder-group-chart">
                  <vc-donut
                      background="#ffffff"
                      foreground="grey"
                      :size="70"
                      unit="%"
                      :thickness="40"
                      legend-placement="bottom"
                      :sections="sections"
                      :total="100"
                      :start-angle="0"/>
              </div>
              <div class="shareholder-group-table">
                  <table>
                    <colgroup>
                        <col width-="60%" />
                        <col width-="20%" />
                        <col width-="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <td>구분</td>
                            <td>주식수(주)</td>
                            <td>비율(%)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, idx) in memberData" v-bind:key="idx">
                            <td>
                                <span class="member-color" :style="`background: ${data.color}`"></span>
                                {{ data.title }}
                            </td>
                            <td>{{ data.value | currency}}</td>
                            <td>{{ Number(data.percent).toFixed(1) | v_number }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>합계</td>
                            <td>{{ totalJu | currency}}</td>
                            <td>100.0</td>
                        </tr>
                    </tfoot>
                  </table>
              </div>
          </div>
        <div class="shareholder-group-caption" v-if="shareHolderComment">
            <h5 class="title">{{ shareHolderComment }}</h5>
        </div>
      </div>
      <div class="shareholder-data" v-if="isDividend == 'Y' && TOTAL_STOCK_DATA.length > 0">
          <h3 class="shareholder-data-title">
              <span>배당내역</span>
                <div class="performance-select">
                    <div class="select-warp">
                        <select v-on:change="SET_DIVI($event)">
                            <option v-for="(item, idx) in TOTAL_STOCK_DATA" :value="idx" v-bind:key="item.F_YEAR">{{ item.F_YEAR }}</option>
                        </select>
                        <div class="select-arrow" style="font-size:1rem!important">▲</div>
                    </div>
                </div>
          </h3>
              <ul class="performance-group-tab stock">
                <li v-for="(item, idx) in TOTAL_STOCK_DATA" :class="isActive[idx]" v-bind:key="item.IDX_SEQ" v-on:click="setActive(idx)">
                  <a>{{ item.F_YEAR }}</a>
                </li>
                <li v-for="item in morelen" v-bind:key="item"></li>
              </ul>
              <div class="shareholder-data-table">
                  <table>
                    <colgroup>
                        <col width-="50%" />
                        <col width-="30%" />
                        <col width-="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <td>구분</td>
                            <td></td>
                            <td>배당내역</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, idxs) in datas" v-bind:key="idxs">
                            <td>
                                {{ data.title }}
                            </td>
                            <td>
                                <h5 v-for="(kind, idx) in data.kinds" v-bind:key="idx">
                                    {{ kind }}
                                </h5>
                            </td>
                            <td>
                                <h5 v-for="(value, idx) in data.value" v-bind:key="idx">
                                    {{  value | currency(idxs) }}
                                </h5>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>소계</td>
                            <td>{{STOCK_TOTAL | currency}}</td>
                        </tr>
                    </tfoot>
                  </table>
              </div>
          </div>
        <div class="shareholder-group-caption" v-if="TOTAL_STOCK_DATA.length > 0">
            <h5 class="title">{{ TOTAL_STOCK_DATA[0].F_DIV_COMMENT }}</h5>
            <!-- <h5 class="description">{{ caption.dscription }}</h5> -->
        </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Donut from 'vue-css-donut-chart'
import 'vue-css-donut-chart/dist/vcdonut.css'
import { mapGetters } from 'vuex'
Vue.use(Donut)

export default {
  name: 'HomeShareholderStatus',
  components: {
  },
  data () {
    return {
      isShareHolder: 'Y',
      isDividend: 'Y',
      isActive: {
        0: 'active',
        1: '',
        2: '',
        3: '',
        4: ''
      },
      morelen: 0,
      ori_active: 0,
      totalJu: 0,
      STOCK_TOTAL: 0,
      TOTAL_STOCK_DATA: [],
      mcolor: '',
      sections: [
        { label: '최대주주', value: 0, color: '#534582' },
        { label: '기관주주', value: 0, color: '#387AC4' },
        { label: '외국인주주', value: 0, color: '#37BFA7' },
        { label: '자사주', value: 0, color: '#8FE1A1' },
        { label: '개인주주 외', value: 0, color: '#8E8E93' }
      ],
      memberData: [
        {
          title: '최대주주 외 특수관계인',
          value: '-',
          percent: '-',
          color: '#534582'
        },
        {
          title: '기관주주',
          value: '-',
          percent: '-',
          color: '#387AC4'
        },
        {
          title: '외국인주주',
          value: '-',
          percent: '-',
          color: '#37BFA7'
        },
        {
          title: '자사주',
          value: '-',
          percent: '-',
          color: '#8FE1A1'
        },
        {
          title: '개인주주 외',
          value: '-',
          percent: '-',
          color: '#8E8E93'
        }
      ],
      datas: [
        {
          title: '당기순이익(백만원)',
          value: [
            '-'
          ],
          kinds: [
            ''
          ]
        },
        {
          title: '배당성향(%)',
          value: [
            '-'
          ],
          kinds: ''
        },
        {
          title: '주당 현금배당(원)',
          value: [
            '-',
            '-'
          ],
          kinds: [
            '보통주',
            '우선주'
          ]
        },
        {
          title: '주당 주식배당(주)',
          value: [
            '-',
            '-'
          ],
          kinds: [
            '보통주',
            '우선주'
          ]
        },
        {
          title: '배당총액(백만원)',
          value: [
            '-',
            '-'
          ],
          kinds: [
            '보통주',
            '우선주'
          ]
        }
      ],
      memberCaption: [
        {
          title: '주1)',
          dscription: ''
        }
      ],
      shareHolderComment: ''
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getMainColor', 'GETISVIEW'])
  },
  created () {
  },
  filters: {
    currency: function (value, idx) {
      if (idx === 1) {
        return Number(value).toFixed(1).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      } else if (Number(value) > 0) {
        return Number(value).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      } else {
        return '-'
      }
    },
    v_number: function (num) {
      if (Number(num) > 0) {
        return num
      } else {
        return '-'
      }
    }
  },
  mounted () {
  },
  methods: {
    setActive (idx) {
      const _self = this
      _self.isActive[_self.ori_active] = ''
      _self.isActive[idx] = 'active'
      _self.ori_active = idx
      _self.setDividend(_self.TOTAL_STOCK_DATA[idx])
    },
    SET_DIVI (e) {
      const idx = e.target.value
      const _self = this
      _self.setDividend(_self.TOTAL_STOCK_DATA[idx])
    },
    changeColor (hexcolor, step) {
      let r = parseInt(hexcolor.substr(1, 2), 16)
      let g = parseInt(hexcolor.substr(3, 2), 16)
      let b = parseInt(hexcolor.substr(5, 2), 16)
      let cr = (r - ((r / 8).toFixed(0) * step)).toString(16)
      if (cr < 0) {
        cr = '00'
      } else if (cr < 10 || cr === 'a' || cr === 'b' || cr === 'c' || cr === 'd' || cr === 'e' || cr === 'f') { cr = '0' + cr }
      let cg = (g - ((g / 8).toFixed(0) * step)).toString(16)
      if (cg < 0) {
        cg = '00'
      } else if (cg < 10 || cg === 'a' || cg === 'b' || cg === 'c' || cg === 'd' || cg === 'e' || cg === 'f') { cg = '0' + cg }
      let cb = (b - ((b / 8).toFixed(0) * step)).toString(16)
      if (cb < 0) {
        cb = '00'
      } else if (cb < 10 || cb === 'a' || cb === 'b' || cb === 'c' || cb === 'd' || cb === 'e' || cb === 'f') { cb = '0' + cb }
      return '#' + cr + cg + cb
    },
    setDividend (req) {
      const _self = this
      _self.datas[0]['value'][0] = Number(req.F_NET_PROFIT)
      _self.datas[1]['value'][0] = Number(req.F_PAYOUT_RATIO)
      _self.datas[2]['value'][0] = Number(req.F_CASH_DIV_COMMON)
      _self.datas[2]['value'][1] = Number(req.F_CASH_DIV_PERFERRED)
      _self.datas[3]['value'][0] = Number(req.F_STOCK_DIV_COMMON)
      _self.datas[3]['value'][1] = Number(req.F_STOCK_DIV_PERFERRED)
      _self.datas[4]['value'][0] = Number(req.F_DIV_TOT_COMMON)
      _self.datas[4]['value'][1] = Number(req.F_DIV_TOT_PERFERRED)
      _self.STOCK_TOTAL = Number(req.F_DIV_TOTAL)
      _self.memberCaption[0].title = req.F_DIV_COMMENT
    }
  },
  watch: {
    GETISVIEW () {
      const _self = this
      _self.isShareHolder = _self.GETISVIEW.ShareHolder
      _self.isDividend = _self.GETISVIEW.dividend
    },
    getCompSeq () {
      const _self = this
      const param = {
        seq: _self.getCompSeq
      }
      _self.$store.dispatch('GET_SHOLDER', param)
        .then(res => {
          if (res.length !== 0) {
            _self.memberData[0].value = res[0].LARGE_STOCKHOLDER
            _self.totalJu += res[0].LARGE_STOCKHOLDER
            _self.memberData[1].value = res[0].INST_STOCKHOLDER
            _self.totalJu += res[0].INST_STOCKHOLDER
            _self.memberData[2].value = res[0].FOREIGN_STOCKHOLDER
            _self.totalJu += res[0].FOREIGN_STOCKHOLDER
            _self.memberData[3].value = res[0].TREA_STOCKHOLDER
            _self.totalJu += res[0].TREA_STOCKHOLDER
            _self.memberData[4].value = res[0].INDI_STOCKHOLDER
            _self.totalJu += res[0].INDI_STOCKHOLDER
            _self.memberData[0].percent = (res[0].LARGE_STOCKHOLDER / _self.totalJu * 100).toFixed(4)
            _self.memberData[1].percent = (res[0].INST_STOCKHOLDER / _self.totalJu * 100).toFixed(4)
            _self.memberData[2].percent = (res[0].FOREIGN_STOCKHOLDER / _self.totalJu * 100).toFixed(4)
            _self.memberData[3].percent = (res[0].TREA_STOCKHOLDER / _self.totalJu * 100).toFixed(4)
            _self.memberData[4].percent = (res[0].INDI_STOCKHOLDER / _self.totalJu * 100).toFixed(4)
	    _self.shareHolderComment = res[0].COMMENT
            for (var key in _self.sections) {
              _self.sections[key].value = Number(_self.memberData[key].percent)
              if (key > 3) {
                break
              }
            }
          } else {
            _self.isShareHolder = 'N'
          }
        })
      _self.$store.dispatch('GET_DIVI', param)
        .then(res => {
          if (res.length !== 0 && res.length < 4) {
            _self.morelen = 5 - res.length
            _self.TOTAL_STOCK_DATA = res
            _self.setDividend(res[0])
          } else if (res.length > 3) {
            _self.morelen = 2
            res.splice(3, res.length - 3)
          }
        })
    },
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
      // _self.sections[0].color = '#' + _self.getMainColor
      // _self.memberData[0].color = '#' + _self.getMainColor
      for (var i = 0; i < 3; i++) {
        // _self.sections[i].color = _self.changeColor(_self.mcolor, i)
        // _self.memberData[i].color = _self.changeColor(_self.mcolor, i)
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
.HomeShareholderStatus {
  padding-top: 185px;

  .shareholder-data,
  .shareholder-group {
    margin-top: 106px;

    .shareholder-group-title {
      font-size: 32px;
      color: $font-color-base;
      border-bottom: 1px solid $border-color;
      padding-bottom: 42px;
    }
    .shareholder-data-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $border-color;
      padding-bottom: 42px;

      span {
        font-size: 32px;
        color: $font-color-base;
      }
    }
    .shareholder-group-items {
      padding-top: 80px;
      padding-bottom: 40px;
      display: flex;
      justify-content: space-between;

      .shareholder-group-chart {
        flex-basis: 50%;
        padding-left: 60px;
        // padding-top: 60px;
        padding-top: 4px;
      }

      .shareholder-group-table {
        flex-basis: 50%;
        padding-left: 60px;

        table {
          width: 100%;
          border-collapse: collapse;

          thead,
          tbody,
          tfoot{
            border-bottom: 1px solid $border-color;
          }

          thead tr td {
            padding: 10px 15px;
            font-size: 19px;
            text-align: right;
            color: #8E8E93;

            &:first-child {
              text-align: left;
            }
          }
          tbody tr td ,
          tfoot tr td {
            font-size: 19px;
            color: $font-color-base;
            padding: 20px 15px;
            text-align: right;

            &:first-child {
              text-align: left;
            }
          }
          tbody tr td:nth-child(2), tbody tr td:nth-child(3),
          tfoot tr td:nth-child(2), tfoot tr td:nth-child(3) {
            font-family: 'Roboto', sans-serif;
          }
          .member-color {
            width: 14px;
            height: 14px;
            display: inline-block;
            border-radius: 50%;
          }
        }
      }
    }
    .shareholder-data-table {
      table {
        width: 100%;
        border-collapse: collapse;
        padding-bottom: 40px;
        margin-top: 60px;

          thead,
          tfoot{
            border-bottom: 1px solid $border-color;
          }

          thead tr td {
            padding: 10px 15px;
            font-size: 19px;
            text-align: right;
            color: #8E8E93;

            &:first-child {
              font-size: 14px;
              text-align: left;
            }
            &:nth-child(3) {
              font-size: 14px;
            }
          }
          tbody tr td {
            border-bottom: 1px solid $border-color;
          }
          tbody tr:last-child td {
            border-bottom: 0;
          }
          tbody tr td ,
          tfoot tr td {
            font-size: 19px;
            color: $font-color-base;
            padding: 10px 15px;
            text-align: right;
            vertical-align: baseline;

          &:first-child {
            text-align: left;
            font-size: 19px;
          }

          &:nth-child(2) {
            color: #8E8E93;
          }
          &:nth-child(3) h5{
            font-family: 'Roboto', sans-serif;
          }
          &:nth-child(3) {
            font-family: 'Roboto', sans-serif;
          }

          & h5 {
            padding: 10px 0;
            font-size: 19px;
            font-weight:400;
          }
        }
        tfoot tr td {
          font-size: 19px;
          color: $font-color-base;
          padding: 0 15px 20px 15px;
          text-align: right;

          &:first-child {
            text-align: left;
            font-size: 19px;
          }

          &:nth-child(2) {
            color: #8E8E93;
          }

          & h5 {
            padding: 10px 0;
            font-size: 19px;
          }
        }
        .member-color {
          width: 14px;
          height: 14px;
          display: inline-block;
          border-radius: 50%;
        }
      }
    }
  }
  .shareholder-group-caption {
    display: flex;
    font-size: 14px;
    letter-spacing: -0.005em;
    color: #545454;
    margin-top: 20px;

    .title {
      margin-right: 20px;
      font-size: 12px;
    }
    .description {
      font-size: 12px;
    }
  }

  @media ( max-width: 899px ) {
      // padding: 38px 0;
      padding: 55px 0;
      border-top: 8px solid #EFEFF4;

      .performance-select {
        display: none;
      }

        .shareholder-data,
    .shareholder-group {
      margin-top: 50px;

    .shareholder-group-title {
      font-size: 22px;
      color: $font-color-base;
      border-bottom: 0;
      padding-bottom: 0;
      padding: 0 16px;
    }
    .shareholder-data-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0;
      padding: 0 16px;

      span {
        font-size: 22px;
        color: $font-color-base;
      }
    }
    .shareholder-group-items {
        padding-top: 20px;
        padding-bottom: 20px;
        display: block;
        justify-content: space-between;

      .shareholder-group-chart {
        flex-basis: 50%;
        padding-left: 0;
        width: 80%;
        margin-left: calc(100% - 89%)
      }

      .shareholder-group-table {
        flex-basis: 50%;
        padding-left: 0;
        padding: 0 16px;
        margin-top: 24px;

        table {
          width: 100%;
          border-collapse: collapse;

          thead,
          tbody,
          tfoot{
            border-bottom: 1px solid $border-color;
          }

          thead tr td {
            padding: 16px 0;
            font-size: 14px;
            text-align: right;
            color: #8E8E93;

            &:first-child {
              text-align: left;
            }
          }
          tbody tr td ,
          tfoot tr td {
            font-size: 14px;
            color: $font-color-base;
            padding: 16px 0;
            text-align: right;

            &:first-child {
              text-align: left;
            }
          }
          .member-color {
            width: 8px;
            height: 8px;
            display: inline-block;
            border-radius: 50%;
          }
        }
      }
    }
    .shareholder-data-table {
      padding: 0 16px;
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          margin-top: 20px;

          thead,
          tfoot{
            border-bottom: 1px solid $border-color;
          }

          thead tr td {
            padding: 16px 0;
            font-size: 19px;
            text-align: right;
            color: #8E8E93;

            &:first-child {
              text-align: left;
            }
          }
          tbody tr td {
            border-bottom: 1px solid $border-color;
          }
          tbody tr:last-child td {
            border-bottom: 0;
          }
          tbody tr td {
            font-size: 14px;
            color: $font-color-base;
            padding: 16px 0;
            text-align: right;

            &:first-child {
              text-align: left;
              font-size: 14px;
            }

            &:nth-child(2) {
              color: #8E8E93;
            }

            & h5 {
              padding: 10px 0;
              font-size:14px;
            }
          }
          tfoot tr td {
            font-size: 14px;
            color: $font-color-base;
            padding: 0 0 16px 0;
            text-align: right;

            &:first-child {
              text-align: left;
              font-size: 14px;
            }

            &:nth-child(2) {
              color: #8E8E93;
            }

            & h5 {
              padding: 10px 0;
              font-size:14px;
            }
          }
          .member-color {
            width: 14px;
            height: 14px;
            display: inline-block;
            border-radius: 50%;
          }
        }
      }
    }
    .shareholder-group-caption {
      display: flex;
      font-size: 12px;
      letter-spacing: -0.005em;
      color: #545454;
      margin-top: 0;
      margin-bottom: 30px;
      padding: 0 16px;

      &:first-child {
        margin-top: 0;
      }

      .title {
        margin-right: 10px;
        // flex-basis: 26px;
        font-size: 12px;
      }
      .description {
        flex-basis: calc(100% - 26px);
        font-size: 12px;
      }
    }
  }
}
</style>
