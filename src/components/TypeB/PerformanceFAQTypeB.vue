<template>
  <div class="PerformanceFAQTypeB contaner" v-if="totalArray.length > 0 && qtype == 'N'">
    <h2 class="section-title-roboto">FAQ</h2>
    <h3 class="section-sube">
      Frequently Asked Questions
    </h3>
    <ul class="FAQ-type-B">
      <li v-for="(data, idx) in totalArray" @click="isShowFAQ(data.id, data.is_show)" v-bind:key="idx">
        <div class="FAQ-header">
          <h6 class="number">{{ data.id }}</h6>
          <h6 class="title">{{ data.title }}</h6>
          <img class="arrow" width="32px" src="@/assets/Type_B/img/FAQ_type_B.png" :class="{'active': data.is_show}"/>
        </div>

        <div v-if="data.is_show" class="FAQ-contents">
          <div v-for="(info, idx) in data.info" class="info-box" v-bind:key="idx">
            <h5 class="info-title">
              {{ info.title }}
            </h5>
            <h6 class="info-description">
              <p v-html="info.description"/>
            </h6>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'PerformanceFAQ',
  data () {
    return {
      totalArray: [],
      faqContents: [],
      qtype: ''
    }
  },
  methods: {
    isShowFAQ (id, isOpen) {
      this.totalArray.map(data => {
        data.is_show = false

        if (data.id === id && !isOpen) {
          data.is_show = true
        }
      })
    },
    getData () {
      const _self = this
      const aram = {
        seq: _self.getCompSeq
      }
      this.$store.dispatch('GET_FAQ', aram)
        .then(response => {
          if (_self.qtype === 'N' && response.length > 0) {
            _self.$store.commit('SET_QALEN', response.length)
          }
          _self.faqContents = response
          for (var i = 0; i < response.length; i++) {
            let array = {
              'title': response[i].QUESTION,
              'is_show': false,
              'id': i + 1,
              info: [{
                'title': response[i].QUESTION,
                'description': response[i].ANSWER
              }]
            }
            if (i === 0) {
              array.is_show = true
            }
            _self.totalArray.push(array)
          }
        })
    }
  },
  computed: {
    ...mapGetters(['getCompSeq', 'getQaType'])
  },
  watch: {
    getQaType () {
      this.qtype = this.getQaType
    },
    getCompSeq () {
      this.getData()
    }
  },
  mounted () {
    if (this.getCompSeq) {
      this.getData()
    }
    if (this.getQaType) {
      this.qtype = this.getQaType
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
.PerformanceFAQTypeB {
  padding-top: 200px;
  margin: 0 auto;
  .FAQ-type-B {
    padding-top: 106px;
    list-style: none;

    li {
      padding: 40px 20px;
      border-bottom: 1px solid $border-color;
      cursor: pointer;

      &:first-child {
        border-top: 1px solid $border-color;
      }

      .FAQ-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .FAQ-contents {
        padding: 20px;
        margin-top: 40px;
        .info-box {
          margin-bottom: 40px;
        }
        .info-title {
          font-weight: bold;
          font-size: 19px;
          letter-spacing: -0.5px;
          color: $font-color-base;
        }
        .info-description {
          font-size: 16px;
          margin-top: 20px;
          letter-spacing: -0.5px;
          color: #8E8E93;
        }
      }

      .number {
        width: 36px;
        flex-basis: 36px;
        height: 36px;
        flex-shrink: 0;
        border: 2px solid $font-color-base;
        font-size: 20px;
        text-align: center;
        letter-spacing: -0.5px;
        color: $font-color-base;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
      }
      .title {
        flex-basis: calc(100% - 68px);
        padding-left: 18px;
        font-weight: bold;
        font-size: 26px;
        letter-spacing: -0.5px;
        color: $font-color-base;
      }
      .arrow {
        width: 32px;
        flex-basis: 32px;
        transform: rotate(180deg);
        cursor: pointer;

        &.active {
          transform: rotate(0);
        }
      }
    }
  }

  @media ( max-width: 899px ) {
    // padding: 38px 0;
    padding: 55px 0;
    border-top: 8px solid #EFEFF4;

    .FAQ-type-B {
      padding: 50px 16px;
      list-style: none;

      li {
        padding: 16px 0;
        border-bottom: 1px solid $border-color;

        &:first-child {
          border-top: 1px solid $border-color;
        }

        .FAQ-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .FAQ-contents {
          padding: 20px;
          margin-top: 15px;
          .info-box {
            margin-bottom: 26px;
          }
          .info-title {
            font-weight: bold;
            font-size: 14px;
            letter-spacing: -0.5px;
            color: $font-color-base;
          }
          .info-description {
            font-size: 14px;
            margin-top: 20px;
            letter-spacing: -0.5px;
            color: #8E8E93;
          }
        }

        .number {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 24px;
          flex-basis: 24px;
          height: 24px;
          flex-shrink: 0;
          border: 2px solid $font-color-base;
          font-size: 14px;
          text-align: center;
          letter-spacing: -0.5px;
          color: $font-color-base;
          border-radius: 50%;
          font-weight: bold;
        }
        .title {
          flex-basis: calc(100% - 68px);
          padding-left: 0;
          font-weight: bold;
          font-size: 18px;
          letter-spacing: -0.5px;
          color: $font-color-base;
        }
        .arrow {
          width: 24px;
          flex-basis: 24px;
          transform: rotate(180deg);
          cursor: pointer;

          &.active {
            transform: rotate(0);
          }
        }
      }
    }
  }
}
</style>
