<template>
  <div class="HomeAppBanner" v-if="false">
    <h2 class="app-banner-title">
        <span v-bind:style="{ color: mcolor }">{{ name }}</span> 앱에서 투자정보/소식을 받아보고, <br />
         IR담당자와 소통할 수 있습니다.
    </h2>
    <div class="app-banner-banner">
      <a>
        <img width="213px" src="@/assets/Type_B/img/Google_Play.png" />
      </a>
      <a>
        <img width="213px" src="@/assets/Type_B/img/Apple_Store.png"/>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeAppBanner',
  data () {
    return {
      mcolor: '',
      name: ''
    }
  },
  components: {
  },
  computed: {
    ...mapGetters(['getMainColor', 'getCompName'])
  },
  watch: {
    getMainColor () {
      const _self = this
      _self.mcolor = '#' + _self.getMainColor
    },
    getCompName () {
      const _self = this
      _self.name = _self.getCompName
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
.HomeAppBanner {
    padding: 120px 0;
    background: #F2F2F2;

    .app-banner-title {
        font-size: 34px;
        text-align: center;
        letter-spacing: -0.5px;
        color: $font-color-base;
    }
    .app-banner-banner {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
        img {
            margin-right: 18px;
            cursor: pointer;
            // &:last-child {
            //     margin-right: 0;
            // }
        }
    }

    @media ( max-width: 899px ) {
    }
}
</style>
