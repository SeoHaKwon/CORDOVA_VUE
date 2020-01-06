<template>
  <div class="shareholder-wrap">
    <div class="title-wrap"><strong>주주구성</strong></div>
    <div class="table-wrap">
      <div class="chart-wrap">
        <!-- <img src="@/assets/images/img/img_chart.png" alt="" style="width:100%;"> -->
        <vc-donut
                      background="#ffffff"
                      foreground="grey"
                      :size="70"
                      unit="%"
                      :thickness="40"
                      legend-placement="bottom"
                      :sections="sections"
                      :total="100"
                      :start-angle="0"
		      :hasLegend="true"/>
      </div>
        <div class="table">
          <table>
            <colgroup>
              <col style="auto">
              <col style="max-width:150px">
              <col style="max-width:120px">
            </colgroup>
            <thead>
              <tr>
                <th scope="col" class="textLeft">구분</th>
                <th scope="col">주식수</th>
                <th scope="col">비율</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>최대주주 외 특수관계인</th>
                <td>{{ holder.LARGE_STOCKHOLDER | currency }}</td>
                <td>{{ holder.LARGE_STOCKHOLDER | getPercent(totalReverage) }}</td>
              </tr>
              <tr>
                <th>기관 주주</th>
                <td>{{ holder.INST_STOCKHOLDER | currency  }}</td>
                <td>{{ holder.INST_STOCKHOLDER | getPercent(totalReverage) }}</td>
              </tr>
               <tr>
                <th>외국인 주주</th>
                <td>{{ holder.FOREIGN_STOCKHOLDER | currency  }}</td>
                <td>{{ holder.FOREIGN_STOCKHOLDER | getPercent(totalReverage) }}</td>
              </tr>
              <tr>
                <th>자사주</th>
                <td>{{ holder.TREA_STOCKHOLDER | currency  }}</td>
                <td>{{ holder.TREA_STOCKHOLDER | getPercent(totalReverage) }}</td>
              </tr>
               <tr>
                <th>개인 주주 외</th>
                <td>{{ holder.INDI_STOCKHOLDER | currency  }}</td>
                <td>{{ holder.INDI_STOCKHOLDER | getPercent(totalReverage) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>합계</th>
                <td>{{ totalReverage | currency }}</td>
                <td>100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p class="noti">{{ holder.COMMENT }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      totalReverage: 0,
      sections: [
        { label: '최대주주', value: 10, color: '#534582' },
        { label: '기관주주', value: 10, color: '#387AC4' },
        { label: '외국인주주', value: 20, color: '#37BFA7' },
        { label: '자사주', value: 20, color: '#8FE1A1' },
        { label: '개인주주 외', value: 30, color: '#8E8E93' }
      ]
    }
  },
  props: ['holder'],
  watch: {
    holder () {
      const _self = this
      _self.totalReverage += _self.holder.LARGE_STOCKHOLDER
      _self.totalReverage += _self.holder.INST_STOCKHOLDER
      _self.totalReverage += _self.holder.FOREIGN_STOCKHOLDER
      _self.totalReverage += _self.holder.TREA_STOCKHOLDER
      _self.totalReverage += _self.holder.INDI_STOCKHOLDER
      _self.sections[0].value = Number((_self.holder.LARGE_STOCKHOLDER / _self.totalReverage * 100).toFixed(0))
      _self.sections[1].value = Number((_self.holder.INST_STOCKHOLDER / _self.totalReverage * 100).toFixed(0))
      _self.sections[2].value = Number((_self.holder.FOREIGN_STOCKHOLDER / _self.totalReverage * 100).toFixed(0))
      _self.sections[3].value = Number((_self.holder.TREA_STOCKHOLDER / _self.totalReverage * 100).toFixed(0))
      _self.sections[4].value = Number((_self.holder.INDI_STOCKHOLDER / _self.totalReverage * 100).toFixed(0))
    }
  },
  filters: {
    currency: function (value) {
      if (Number(value) > 0) {
        return Number(value).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      } else {
        return '-'
      }
    },
    getPercent: function (args1, args2) {
      if (Number(args1) > 0) {
        return (Number(args1) / Number(args2) * 100).toFixed(1) + '%'
      } else {
        return '-'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
.cdc-container {
  height: 100%;
}
.shareholder-wrap {
  @include contentWidth($width:1200px);
  .table-wrap {
    display:flex;
    flex-wrap: wrap;
    .chart-wrap,.table {
      width:calc(50% - 20px);
    }
    .chart-wrap {
      margin-right:40px;

    }
    .table {
      tbody {
          tr{
            & + tr {
              td,th {
                border-top:none;
              }
            }
            &:first-child{
              th,td {
                padding-top:52px;
              }
            }
            &:last-child{
              th,td {
                padding-bottom:60px;
              }
            }
          }
        }
      }
    tfoot{
      th {
        padding:63px 30px 46px 30px;
        text-align: left;
        font-weight: 500;
        color: #333;
        vertical-align: middle;
        font-size:20px;
        line-height:22px;
        color:$black3;
        border-top:1px solid #dddddd;
      }
      td {
        padding: 63px 30px 46px 46px;
        font-size: 20px;
        color:$black3;
        font-weight: 500;
        text-align: right;
        border-top:1px solid #dddddd;
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .shareholder-wrap  {
    .table-wrap {
      .chart-wrap,.table {
        width:100%;
      }
      .chart-wrap {
        margin-bottom:45px;
        margin-right:0;
      }
    .table {
      border-top-width: 2px;
      thead {
        tr {
            th{
              &:first-child {
                padding-left:17px;
              }
              &:last-child {
                padding-right:17px;
              }
            }
          }
        }
      tbody {
        tr {
          &:first-child {
            td,th {
              padding-top:26px;
            }
          }
          &:last-child {
            th,td {
              padding-bottom:30px;
            }
          }
        th,td{
            &:first-child {
              padding-left:17px;
            }
            &:last-child {
              padding-right:17px;
              width: 65px;
            }
          }
        }
      }
      tfoot {
        tr {
          th,td {
            font-size:13px;
            padding:17px 0;
            &:first-child {
              padding-left:17px;
            }
            &:last-child {
              padding-right:17px;
            }
          }
        }
      }
      }
    }
  }
}
</style>
