<template>
  <div class="wrap">
    <div class="header">
      <a href="javascript:void(0);" class="btn-link"></a>
      <strong>문의하기</strong>
    </div>
    <div class="content">
     <div class="textarea-wrap">
       <strong class="tit">문의 내용</strong>
       <div class="textarea">
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <p class="txt">
          <strong>질문 내용을 입력해주세요.</strong>
          (작성글은 300자 내로 제한됩니다.) <br>
          반말, 욕설, 비방, 홍보, 광고 등 부적절한 내용의 문의 내용에 대해서는 답변을 드릴 수 없으며 추후 이용에 제한을 둘 수 있습니다.
        </p>
        <div class="max-txt"><span>17</span>/300</div>
       </div>
     </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AskPage'
}
</script>
<style lang="scss" scoped>
 .wrap {
   height:100%;
   min-height:568px;
   padding-bottom:100px;
   .content {
     padding:0 34px;
   }
 }
 .header {
   position: relative;;
   padding-top:14px;
   margin-bottom:56px;
   text-align: center;
   .btn-link {
     display:inline-block;
     position:absolute;
     left:34px;
     top:22px;
     width:10px;
     height:10px;
     transform: rotate(45deg);
     border:2px solid #000;
     border-top:none;
     border-right:none;
     -webkit-tap-highlight-color:transparent;
   }
   strong {
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
     }
   }
  .btn-bottom {
    display:block;
    position: fixed;
    left:0;
    bottom:0;
    width:100%;
    padding:13px 0 53px 0;
    background-color:#E91E63;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    &.active {
      background-color:#D1D1D6;
    }
  }
  .textarea-wrap {
    .tit {
      display:inline-block;
      margin-bottom:10px;
      font-weight: 500;
      font-size: 16px;
      line-height: 23px;
      letter-spacing: -0.005em;
      color: #1B1D20;
    }
  }
  .textarea {
    position:relative;
    background: #FFFFFF;
    border: 1px solid #EFEFF4;
    box-sizing: border-box;
    border-radius: 4px;
    padding:17px 18px;
    textarea {
      position: relative;
      width:100%;
      height:100%;
      resize:none;
      border:none;
      box-sizing: border-box;
      outline: none;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: -0.5px;
      color: #545454;
      background-color: transparent;
      z-index: 50;
      &::placeholder {
        font-size: 16px;
        line-height: 22px;
        letter-spacing: -0.5px;
        color: #8E8E93;
      }
      &:focus {
        & + .txt {
          display:none;
        }
      }
    }
    .txt {
      position:absolute;
      width:calc(100% - 36px);
      left:18px;
      top:17px;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: -0.5px;
      color: #8E8E93;
      strong {
        display: inline-block;
        width:100%;
        margin-bottom:6px;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: -0.5px;
        color: #8E8E93;
      }
    }
    .max-txt {
      position:absolute;
      right:15px;
      bottom:14px;
      font-size: 14px;
      line-height: 22px;
      color: #8E8E93;
      span {
        color:#2f80ed;
      }
    }
  }
 </style>
