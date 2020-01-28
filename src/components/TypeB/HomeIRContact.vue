<template>
  <div class="HomeIRContact contaner" v-if="compname">
    <h2 class="section-title-roboto">IR Contact</h2>
    <h3 class="section-sube contact" style="margin-bottom: 40px;">
      {{ compname }} IR 페이지에 방문해 주셔서 감사합니다. <br />
      {{ compname }}는 주주의 권리 보호를 위해 노력하며 함께 성장하는 기업입니다.
    </h3>
    <div v-for="(contact, idx) in irContactData" class="ir-contact-contents" v-bind:key="idx">
        <h5 class="title">
            {{ contact.title }}
        </h5>
        <h5 class="info">
            {{ contact.info }}
        </h5>
    </div>
    <div class="contact-sns">
      <a v-if="naver_url" v-on:click="goURL(naver_url)">
        <img src="@/assets/Type_B/img/Naver.png"/>
      </a>
      <a v-if="facebook_url" v-on:click="goURL(facebook_url)">
        <img src="@/assets/Type_B/img/Facebook.png"/>
      </a>
      <a v-if="twitter_url" v-on:click="goURL(twitter_url)">
        <img src="@/assets/Type_B/img/Twitter.png"/>
      </a>
      <a v-if="insta_url" v-on:click="goURL(insta_url)">
        <img src="@/assets/Type_B/img/Instagram.png"/>
      </a>
      <a v-if="youtube_url" v-on:click="goURL(youtube_url)">
        <img src="@/assets/Type_B/img/Youtube.png"/>
      </a>
      <a v-if="navertv_url" v-on:click="goURL(navertv_url)">
        <img src="@/assets/Type_B/img/navertv.svg"/>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeIRContact',
  data () {
    return {
      irContactData: [
        {
          title: '주소',
          info: ''
        },
        {
          title: '전화',
          info: ''
        },
        {
          title: '이메일',
          info: ''
        }
      ],
      naver_url: '',
      facebook_url: '',
      twitter_url: '',
      insta_url: '',
      youtube_url: '',
      compname: '',
      navertv_url: ''
    }
  },
  components: {
  },
  methods: {
    goURL (url) {
      window.open(url, '_BLANK', 'location=no,toolbar=yes,titlebar=no,enableViewportScale=yes,closebuttoncaption=닫기,toolbarcolor=#ffffff,hardwareback=yes')
    },
    getData () {
      const _self = this
      const param = {
        seq: _self.getCompSeq
      }
      _self.$store.dispatch('GET_CONTACT', param)
        .then(res => {
          _self.compname = res[0].COMP_NAME
          _self.irContactData[0].info = res[0].IR_ADDR
          _self.irContactData[2].info = res[0].IRO_EMAIL
          _self.irContactData[1].info = res[0].IRO_TEL
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
    if (this.getCompSeq) {
      this.getData()
    }
  },
  computed: {
    ...mapGetters(['getCompSeq'])
  },
  watch: {
    getCompSeq () {
      this.getData()
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
.section-sube.contact {
  font-family: 'Noto Sans KR', sans-serif;
}
.HomeIRContact {
  padding: 200px 0;
  .ir-contact-contents {
    display: flex;
    align-items: center;
    font-size: 16px;
    letter-spacing: -0.5px;
    color: $font-color-base;
    margin-top: 10px;

    .title {
      flex-basis: 80px;
      font-size: 16px;
    }
    .info {
      flex-basis: calc(100% - 80px);
      font-size: 16px;
    }
  }
  .contact-sns {
    margin-top: 41px;
    img {
      width: 45px;
      margin-right: 34px;
    }
  }

  @media ( max-width: 899px ) {
    // padding: 38px 0;
    padding: 55px 0;
    border-top: 8px solid #EFEFF4;

    .section-sube {
      font-size: 14px !important;
    }
    .ir-contact-contents {
      display: block;
      align-items: center;
      font-size: 16px;
      letter-spacing: -0.5px;
      color: $font-color-base;
      margin-top: 10px;
      padding: 0 16px;

      &:last-child {
        padding-bottom: 20px;
        border-bottom: 1px solid #313439;
      }
      &:first-child {
        padding-top: 20px;
        border-top: 1px solid #313439;
      }

      .title {
        flex-basis: 80px;
        margin-bottom: 5px;
        font-size: 14px;
        color: #8E8E93;
      }
      .info {
        flex-basis: calc(100% - 80px);
        font-size: 14px;
        color: #313439;
      }
    }
    .contact-sns {
      margin-top: 24px;
      padding: 0 16px;
      img {
        width: 30px;
        margin-right: 23px;
      }
    }
  }
}
</style>
