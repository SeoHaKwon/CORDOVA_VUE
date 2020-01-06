<template>
  <div class="contant-wrap">
    <div class="contact-section">
      <p class="title-wrap"><strong>IR Team</strong></p>
      <div class="company-info">
        <p class="call en">
          <span>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path :fill="mcolor" d="M15,12H17A5,5 0 0,0 12,7V9A3,3 0 0,1 15,12M19,12H21C21,7 16.97,3 12,3V5C15.86,5 19,8.13 19,12M20,15.5C18.75,15.5 17.55,15.3 16.43,14.93C16.08,14.82 15.69,14.9 15.41,15.18L13.21,17.38C10.38,15.94 8.06,13.62 6.62,10.79L8.82,8.59C9.1,8.31 9.18,7.92 9.07,7.57C8.7,6.45 8.5,5.25 8.5,4A1,1 0 0,0 7.5,3H4A1,1 0 0,0 3,4A17,17 0 0,0 20,21A1,1 0 0,0 21,20V16.5A1,1 0 0,0 20,15.5Z" />
            </svg>
          </span>
          <span>
            {{ IRO_TEL }}
          </span>
        </p>
        <p class="email en">
          <span>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path :fill="mcolor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
            </svg>
          </span>
          <span>
            {{ IRO_EMAIL }}
          </span>
        </p>
        <p class="address">
          <span>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path :fill="mcolor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
            </svg>
          </span>
          <span>
            {{ IR_ADDR }}
          </span>
        </p>
      </div>
    </div>
    <div class="contact-section" v-if="false">
      <p class="title-wrap"><strong>IR 전용 App</strong></p>
      <div class="app-download">
        <div class="app-box">
          <div class="txt-box google">
            <strong class="app-tit en">
              Google play
            </strong>
            <p class="en">Download for Android</p>
            <a href="#" class="link"></a>
          </div>
        </div>
        <div class="app-box">
          <div class="txt-box apple">
            <strong class="app-tit en">
              App Store
            </strong>
            <p class="en">Download for iOS</p>
            <a href="#" class="link"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-section">
      <p class="title-wrap"><strong>SNS</strong></p>
      <div class="sns-list">
        <a class="facebook" v-if="facebook_url" v-on:click="getURL(facebook_url)"></a>
        <a class="instagram" v-if="insta_url" v-on:click="getURL(insta_url)"></a>
        <a class="twitter" v-if="twitter_url" v-on:click="getURL(twitter_url)"></a>
        <a class="youtube" v-if="youtube_url" v-on:click="getURL(youtube_url)"></a>
        <a class="blog" v-if="naver_url" v-on:click="getURL(naver_url)"></a>
        <a class="naver" v-if="navertv_url" v-on:click="getURL(navertv_url)"></a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import SubVisual from '@/components/SubVisual'
// import Footer from '@/components/Footer'

export default {
  name: 'status',
  components: {
    // SubVisual,
    // Footer
  },
  data: () => {
    return {
      IR_ADDR: '',
      IRO_EMAIL: '',
      IRO_TEL: '',
      naver_url: '',
      facebook_url: '',
      twitter_url: '',
      insta_url: '',
      youtube_url: '',
      mcolor: '',
      navertv_url: ''
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getMainColor'])
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.getIRData()
    },
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
    }
  },
  methods: {
    getURL (url) {
      window.open(url, '_BLANK')
    },
    getIRData () {
      const _self = this
      const param = {
        seq: _self.getCompSeq
      }
      _self.$store.dispatch('GET_CONTACT', param)
        .then(res => {
          _self.IR_ADDR = res[0].IR_ADDR
          _self.IRO_EMAIL = res[0].IRO_EMAIL
          _self.IRO_TEL = res[0].IRO_TEL
          _self.naver_url = res[0].IRPAGE_SNS_BLOG
          _self.facebook_url = res[0].IRPAGE_SNS_FACEBOOK
          _self.twitter_url = res[0].IRPAGE_SNS_TWITTER
          _self.insta_url = res[0].IRPAGE_SNS_INSTA
          _self.youtube_url = res[0].IRPAGE_SNS_YOUTUBE
          _self.navertv_url = res[0].IRPAGE_SNS_NAVERTV
        })
    }
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.getIRData()
    }
    if (_self.getMainColor) {
      _self.mcolor = '#' + _self.getMainColor
    }
  }
}
</script>

<style lang="scss">
@import "@/style/_color.scss";
@import "@/style/_mixin.scss";
.gray-bg {
  position: relative;
  &::after {
    position: absolute;
    left: 0;
    top: 0;
    content: "";
    display: inline-block;
    width: 100%;
    height: 321px;
    background-color: #f3f3f7;
  }
}
.contact-section {
  & + .contact-section {
    margin-top: 140px;
  }
}
.app-download {
  display: flex;
  .app-box {
    width: calc(50% - 5px);
    padding: 66px 60px;
    border: 1px solid #e5e5e5;
    border-top: 2px solid $black;
    & + .app-box {
      margin-left: 10px;
    }
  }
  .txt-box {
    position: relative;
    padding-left: 70px;
    @each $obj in google, apple {
      &.#{$obj} {
        @include bgImg(icon/icon_#{$obj}, $pos: left center);
      }
    }
    .app-tit {
      font-size: 20px;
      font-weight: 500;
      color: $black3;
    }
    p {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 500;
      color: $gray8;
    }
    .link {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      width: 22px;
      height: 25px;
      margin-left: auto;
      @include bgImg(bg/bg_more_bottom);
    }
  }
}
.contant-wrap {
  position: relative;
  z-index: 5;
  @include contentWidth($width: 1200px);
  .company-info {
    display: flex;
    flex-wrap: wrap;
    padding: 90px 100px;
    border-top: 2px solid $black;
    background-color: $white;
    @include shadow();
    p {
      width: 50%;
      padding-left: 44px;
      font-size: 20px;
      line-height: 23px;
      color: $black3;
      font-weight: 500;
      @each $obj in call, email, address {
        &.#{$obj} {
          // @include bgImg(icon/icon_#{$obj}, $pos: left bottom);
          span:nth-child(2) {
            padding-left: 12px;
          }
        }
      }
      &.address {
        width: 100%;
        padding-top: 34px;
        margin-top: 34px;
        border-top: 1px solid #f3f3f7;
      }
    }
  }
  .sns-list {
    display: flex;
    padding: 66px 0;
    justify-content: center;
    border: 1px solid #e5e5e5;
    border-top: 2px solid $black;
    a {
      display: inline-block;
      width: 60px;
      height: 60px;
      @each $obj in facebook, instagram, twitter, youtube, blog, naver {
        &.#{$obj} {
          @include bgImg(icon/icon_#{$obj});
        }
      }
      & + a {
        margin-left: 104px;
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .contant-wrap {
    .company-info {
      padding: 50px 30px;
      border-top-width: 2px;
      p.email,
      p.call,p {
        width: 100%;
        padding-left: 25px;
        font-size: 13px;
        line-height: 20px;
        background-size: auto 12px;
        background-position: left center;
        &.address {
          padding-top: 0px;
          margin-top: 40px;
          background-position: left center;
          border-top: none;
        }
        & + p {
          position: relative;
          margin-top: 40px;
          &::after {
            display: block;
            content: "";
            position: absolute;
            left: 0;
            top: -20px;
            width: 100%;
            height: 1px;
            background-color: #f3f3f7;
          }
        }
      }
    }
    .sns-list {
      padding: 10px 0 45px 0;
      justify-content: cener;
      flex-wrap: wrap;
      border-top-width: 2px;
      a {
        margin-top: 35px;
        background-size: cover;
        background-size: 32px 32px;
        & + a {
          margin-left: 0;
        }
      }
    }
  }
  .contact-section {
    & + .contact-section {
      margin-top: 70px;
    }
  }
  .app-download {
    display: block;
    .app-box {
      width: 100%;
      padding: 30px;
      border-top-width: 2px;
      .txt-box {
        padding-left: 40px;
        background-size: auto 25px;
        strong {
          display: inline-block;
          font-size: 16px;
        }
        p {
          margin-top: 5px;
          font-size: 10px;
        }
        .link {
          width: 16px;
          height: 15px;
          transform: rotate(-90deg);
          background-size: cover;
        }
      }
      & + .app-box {
        margin-left: 0;
        border-top:none;
      }
    }
  }
}
</style>
