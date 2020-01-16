<template>
  <div class="FooterBody">
    <h3>
        © 2019 {{ COM_NAME_E }}. All rights reserved.
    </h3>
    <!-- <h4>
        (주){{ COM_NAME }} | 대표이사 {{ CEO_NAME }} | 사업자등록번호 {{ SAUP }} <br />
        {{ ADDRESS }}
    </h4> -->
    <h5>
        서비스 제공 ©irpage.co.kr
    </h5>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FooterBody',
  components: {
  },
  mounted () {
    const _self = this
    if (_self.getCompSeq) {
      _self.getData()
    }
  },
  data: () => {
    return {
      COM_NAME: '',
      CEO_NAME: '',
      ADDRESS: '',
      SAUP: '',
      COM_NAME_E: ''
    }
  },
  computed: {
    ...mapGetters(['getCompName', 'getCompSeq'])
  },
  watch: {
    getCompSeq () {
      const _self = this
      _self.getData()
    }
  },
  methods: {
    getData () {
      const _self = this
      const param = {
        seq: _self.getCompSeq
      }
      _self.$store.dispatch('GET_COMINFO', param)
        .then(res => {
          _self.COM_NAME = res[0].COMP_NAME
          _self.CEO_NAME = res[0].CEO_NAME
          _self.ADDRESS = res[0].COMP_ADDR
          _self.SAUP = res[0].COMP_REG_NUM
          _self.COM_NAME_E = res[0].COMP_NAME_E
        })
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
.FooterBody {
  padding: 60px 0;
  width: 1150px;
  margin: 0 auto;

  h3 {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #1B1D20;
  }
  h4 {
    font-size: 14px;
    color: #545454;
    margin-top: 10px;
  }
  h5 {
    font-size: 14px;
    color: #4DA1FF;
    margin-top: 8px;
  }
      @media (min-width: 900px) and (max-width: 1149px) {
        padding: 60px 0;
        width: 900px;
        margin: 0 auto;
      }
    @media ( max-width: 899px ) {
        padding: 20px 16px;
        width: 100%;
        margin: 0 auto;
        // margin-top: 75px;
        border-top: 1px solid $border-color;

        h3 {
          font-size: 14px;
          color: #1B1D20;
        }
        h4 {
          font-size: 12px;
          color: #545454;
          margin-top: 10px;
        }
        h5 {
          font-size: 12px;
          color: #4DA1FF;
          margin-top: 8px;
        }
    }
}

</style>
