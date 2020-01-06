<template>
  <div class="sub-visual">
    <img :src="subimg" alt="">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      subimg: ''
    }
  },
  computed: {
    ...mapGetters(['getSUBIMG'])
  },
  watch: {
    getSUBIMG () {
      const _self = this
      _self.subimg = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + _self.getSUBIMG
    }
  },
  mounted () {
    const _self = this
    if (_self.getSUBIMG) {
      _self.subimg = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + _self.getSUBIMG
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
 .sub-visual-wrap {
   position:relative;
   .sub-visual {
     overflow: hidden;
     img {
       position:relative;
       left:50%;
       width:1920px;
       margin-left:-960px;
     }
   }
   .inner {
     @include contentWidth($width:1200px);
     display:flex;
   }
   .sub-title {
     display:flex;
     align-items: flex-end;
     position:relative;
     padding-top:18px;
     font-size:56px;
     line-height:58px;
     color:$white;
     font-weight: bold;
      &::after {
        @include virtual();
        width:54px;
        height:2px;
        background-color:$white;
       }
       span {
         display:inline-block;
         padding-left:30px;
         margin-left:30px;
         font-weight: 700;
         font-size:30px;
         line-height:32px;
         color:$white;
         @include bgImg(arrow/arrow_2depth,$pos:left center);
       }
    }
   .sub-info-txt {
     position:absolute;
     width:100%;
     bottom:50px;
   }
   .history{
     display:flex;
     align-items: flex-end;
     margin-left:auto;
     .icon-home {
       cursor: pointer;
       display:inline-block;
       padding-right:27px;
       margin-right:21px;
       @include bgImg(arrow/arrow_history ,$pos:right center);
     }
     span {
       font-size:14px;
       line-height:18px;
       color:$white;
     }
   }
 }
  @media screen and (max-width: 1000px) {
     .sub-visual-wrap {
       .sub-visual {
         img {
           width:1200px;
           margin-left:-600px;
         }
       }
       .sub-info-txt {
         padding:0 30px;
         .sub-title {
           align-items: flex-start;
           flex-direction: column;
           padding-top:15px;
           font-size:38px;
           line-height:40px;
           &::after {
             width:25px;
             height:2px;
           }
           span {
             padding-left:15px;
             margin-top:18px;
             margin-left:0;
             font-size:17px;
             line-height:18px;
             background-size:4px 8px;
           }
         }
       }
       .history {
         .icon-home {
            padding-right: 10px;
            margin-right:10px;
            line-height: 0;
            background-size:5px auto;
           img {
             width:14px;
           }
         }
         span {
           font-size:12px;
           line-height:12px;
         }
       }
     }
  }
</style>
