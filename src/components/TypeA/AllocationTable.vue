<template>
  <div class="table-wrap">
    <div class="title-wrap">
      <strong>배당내역</strong>
    </div>
    <div class="table">
      <table>
        <colgroup>
          <col style="width:190px">
          <col style="auto">
          <col style="max-width:186px">
          <col style="max-width:186px">
          <col style="max-width:186px">
          <col style="max-width:70px" class="is_pc">
        </colgroup>
        <thead>
          <tr>
            <th scope="col" colspan="2" class="textLeft">구분</th>
            <th scope="col" v-for="(item, idx) in divi" v-bind:key="idx">{{item.F_YEAR}}</th>
            <th scope="col" class="is_pc"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colspan="2">당기순이익<span>(백만원)</span></th>
            <td v-for="(item, idx) in divi" v-bind:key="idx">{{ item.F_NET_PROFIT | v_data }}</td>
            <td class="is_pc"></td>
          </tr>
          <tr>
            <th colspan="2">배당성향<span>(%)</span></th>
            <td v-for="(item, idx) in divi" v-bind:key="idx">{{ item.F_PAYOUT_RATIO | v_data }}</td>
            <td class="is_pc"></td>
          </tr>
          <tr>
            <th rowspan="2">주당 현금배당(원)</th>
            <td class="textLeft">보통주</td>
            <td v-for="(item, idx) in divi" v-bind:key="idx">{{ item.F_CASH_DIV_COMMON | v_data }}</td>
            <td class="is_pc"></td>
          </tr>
          <tr>
            <td class="textLeft">우선주</td>
            <td v-for="(item, idx) in divi" v-bind:key="idx">{{ item.F_CASH_DIV_PERFERRED | v_data }}</td>
            <td class="is_pc"></td>
          </tr>
          <tr>
            <th rowspan="2">주당 주식배당(주)</th>
            <td class="textLeft">보통주</td>
            <td v-for="(item, idx) in divi" v-bind:key="idx">{{ item.F_STOCK_DIV_COMMON | v_data }}</td>
            <td class="is_pc"></td>
          </tr>
          <tr>
            <td class="textLeft">우선주</td>
            <td v-for="(item, idx) in divi" v-bind:key="idx">{{ item.F_STOCK_DIV_PERFERRED | v_data }}</td>
            <td class="is_pc"></td>
          </tr>
          <tr>
            <th class="textLeft">배당총액<span>(백만원)</span></th>
            <td class="textLeft total">소계</td>
            <td class="total" v-for="(item, idx) in divi" v-bind:key="idx">{{ item.F_DIV_TOTAL | v_data }}</td>
            <td class="is_pc"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="noti" v-if="comments">{{ comments }}</p>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      comments: ''
    }
  },
  props: ['divi'],
  filters: {
    v_data: (datas) => {
      if (datas) {
        return datas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return '-'
      }
    }
  },
  watch: {
    divi () {
      const _self = this
      _self.comments = _self.divi[0].F_DIV_COMMENT
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
 .table-wrap {
   @include contentWidth($width:1200px);
   .table {
     border-top:2px solid $black;
     border-bottom:1px solid #e9e9e9;
     .textLeft {
       text-align: left;
     }
     thead {
       tr {
         th {
           padding:26px 30px 26px 30px;
           font-size:17px;
           font-weight: 700;
           color:$black3;
           border-bottom:1px solid #e9e9e9;
           text-align: right;
         }
       }
     }
     tbody {
       tr {
         th {
           text-align: left;
           padding:26px 30px;
           font-size:17px;
           font-weight:500;
           color:$black3;
           vertical-align: middle;
           span {
             font-weight:400;
           }
         }
         & + tr {
           td,th {
             border-top:1px solid #e9e9e9;
           }
         }
          td {
            padding:26px 30px 26px 40px;
            font-size:17px;
            color:$gray7;
            text-align: right;
          &.total {
            font-weight:500;
            color:$black3;
            }
          }
       }
     }
   }
   .noti {
     position:relative;
     padding-left:10px;
     margin-top:30px;
     font-size:14px;
     line-height:16px;
     color:$gray8;
  //    &::after {
  //      display: inline-block;
  //      position:absolute;
  //      left:0;
  //      top:50%;
  //      content:"*";
  //      font-size:15px;
  //      line-height:16px;
  //      margin-top:-4px;
  //      color:$gray8;
  //    }
   }
 }
 @media screen and (max-width: 1000px) {
   .table-wrap  {
     .table {
       border-top-width: 2px;
       thead {
         tr {
           th {
             padding:20px 0 20px 4px;
             font-size:11px;
           }
          &:last-child{
            th {
              padding-right:4px;
            }
          }
         }
       }
       tbody {
         tr {
           th {
              padding:20px 0 20px 4px;
              font-size:11px;
           }
           td {
             font-size:11px;
             padding:20px 0 20px 4px;
             width:60px;
           }
         }
          &:last-child{
            th,td {
              padding-right:4px;
            }
          }
       }
     }
    .noti {
      font-size:11px;
      margin-top:10px;
      }
   }
 }
</style>
