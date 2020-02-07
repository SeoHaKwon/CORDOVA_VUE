<template>
  <div class="PerformanceContents">
    <ul class="performance-group-tab" style="margin-bottom: 0px;">
      <li v-for="(items, idx) in silq" v-on:click="getContents(items, idx)" :class="isActive[idx]" v-bind:key="idx">
        <a>{{ items }}</a>
      </li>
      <li v-for="item in 5 - silq.length" :key="`A-${item}`"></li>
    </ul>
      <div class="performance-select">
        <div class="select-warp">
          <select v-on:change="SelectContent($event)">
            <option v-for="(items, idx) in silq" v-bind:key="idx">{{ '20' + items }}</option>
          </select>
          <div class="select-arrow">▲</div>
        </div>
      </div>
    <div class="performance-contents container" v-if="datas.length > 1 && silj.length > 0">
      <div class="performance-main">
        <div v-if="datas.length > 2" class="main-title" v-on:click="getGoURL(silj.UPLOAD_FILE1, silj.SITEURL)">
          <h2 class="title" v-html="silj.TITLE">
          </h2>
          <div class="download">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path v-bind:fill="mcolor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
            </svg>
          </div>
        </div>
        <div>
          <img v-if="bimg" width="100%" :src="bimg"/>
        </div>
      </div>
      <div class="performance-info">
        <div class="main-title" v-if="datas.length == 2 && silj.length > 0" v-on:click="getGoURL(silj.UPLOAD_FILE1, silj.SITEURL)">
          <h2 class="title" v-html="silj.TITLE">
          </h2>
          <div class="download">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path v-bind:fill="mcolor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
            </svg>
          </div>
        </div>
        <ul>
          <li v-for="(data, idx) in datas" :class="{'less-length': datas.length < 4}" v-bind:key="idx" v-on:click="getGoURL(data.UPLOAD_FILE1, data.SITEURL)">
            <h5>{{ data.TITLE }}</h5>
            <h6>
              <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="data.TYPE == 'URL'">
                <path :fill="mcolor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
              </svg>
              <svg viewBox="0 0 24 24" style="width: 24px; height: 24px;" v-else>
                <path :fill="mcolor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"></path>
              </svg>
              <span class="data-type" :style="{color: mcolor}">{{ data.TYPE }}</span>
            </h6>
          </li>
        </ul>
      </div>
    </div>
    <ul class="SmallType-Performance" v-else>
      <li v-on:click="getGoURL(silj.UPLOAD_FILE1, silj.SITEURL)" v-if="silj.length > 0">
        <h5>{{ silj.TITLE }}</h5>
        <h6>
          <a>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="silj.TYPE == 'URL'">
              <path :fill="mcolor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
            </svg>
            <svg viewBox="0 0 24 24" style="width: 24px; height: 24px;" v-else>
              <path :fill="mcolor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"></path>
            </svg>
          <span class="data-type" :style="{color: mcolor}">{{ (silj.TYPE)?silj.TYPE:'PDF' }}</span>
          </a>
        </h6>
      </li>
      <li v-for="(item, idx) in datas" v-on:click="getGoURL(item.UPLOAD_FILE1, item.SITEURL)" v-bind:key="idx">
        <h5>{{ item.TITLE }}</h5>
        <h6>
          <a>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="item.TYPE == 'URL'">
              <path :fill="mcolor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
            </svg>
            <svg viewBox="0 0 24 24" style="width: 24px; height: 24px;" v-else>
              <path :fill="mcolor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"></path>
            </svg>
          <span class="data-type" :style="{color: mcolor}">{{ item.TYPE }}</span>
          </a>
        </h6>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PerformanceContents',
  props: [
    'datas',
    'silq',
    'silj'
  ],
  data: () => {
    return {
      nActive: 0,
      isActive: {
        0: 'active',
        1: '',
        2: '',
        3: '',
        4: ''
      },
      ori_active: 0,
      mcolor: '',
      bimg: ''
    }
  },
  computed: {
    ...mapGetters(['getMainColor', 'getPerFormImg'])
  },
  methods: {
    getGoURL (pdf, url) {
      // const _self = this
      if (pdf) {
        window.open('https://file.irgo.co.kr/data/BOARD/ATTACH_PDF/' + pdf, '_system', 'toolbar=no,titlebar=no,location=no,EnableViewPortScale=yes,hardwareback=no')
      } else if (url) {
        window.open(url, '_BLANK', 'width=500,height=550,top=100,left=100,fullscreen=yes,menubar=no,status=no,toolbar=no,titlebar=no,location=no')
      }
    },
    getContents (quat, idx) {
      const _self = this
      _self.setActive(idx)
      _self.$emit('changeQuarter', quat)
    },
    SelectContent (e) {
      const _self = this
      _self.setActive(e.target.selectedIndex)
      _self.$emit('changeQuarter', e.target.value.substr(2))
    },
    setActive (idx) {
      const _self = this
      _self.isActive[_self.ori_active] = ''
      _self.isActive[idx] = 'active'
      _self.ori_active = idx
    }
  },
  watch: {
    getPerFormImg () {
      this.bimg = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + this.getPerFormImg
    },
    silj () {
      // const _self = this
      // _self.thumbnail = 'http://file.irgo.co.kr/data/BOARD/ATTACH_IMG/' + _self.silj.UPLOAD_THUMBNAIL
    },
    getMainColor () {
      this.mcolor = '#' + this.getMainColor
    }
  },
  mounted () {
    if (this.getPerFormImg) {
      this.bimg = 'https://file.irgo.co.kr/data/IRPAGE/IMG/' + this.getPerFormImg
    }
    if (this.getMainColor) {
      this.mcolor = '#' + this.getMainColor
    }
  }
}
</script>
<style lang="scss">
@import "@/style/_variables.scss";
.download {
  cursor: pointer;
}
svg {
  margin-right: 5px;
}
.PerformanceContents {
  .SmallType-Performance {
    // margin-top:106px;
    margin-top:60px;
    list-style:none;
    margin-bottom:0;
    & li:first-child {
      border-top: 1px solid #E5E5EA;
    }

    li {
      display:flex;
      justify-content: space-between;
      padding: 40px 20px;
      align-items: center;
      -webkit-box-pack: justify;
      border-bottom: 1px solid #E5E5EA;
      height: 120px;
      font-weight: inherit;
      cursor: pointer;

      h5, h6 {
        font-size: 21px;
      }
    }
  }
  @media ( max-width: 899px ) {
    .SmallType-Performance {
      padding: 0 16px;
      margin-top:16px;

      & li:first-child {
        border-top: 0;
      }
      li {
        padding: 20px 0;
        height: auto;
        h5, h6 {
          font-size: 16px;
        }
      }

      .data-type {
        display: none;
      }
    }
  }
}
.PerformanceContents {
  .performance-select {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .performance-contents {
    background: #F2F2F2;
    padding: 50px;
    margin-top: 53px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .performance-main {
      flex-basis: 50%;
      padding-right: 50px;
    }
    .main-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 56px;
      margin-top: 14px;
      cursor: pointer;

      & .title {
        /* 추가 */
        // margin-left:20px;
        /* 추가 */
        margin: 0 40px 0 0px;
        font-size: 30px;
        line-height: 1.5;
        font-weight: normal;
        text-decoration-line: underline;
        color: $font-color-base;
      }

      .download {
        background: #FFFFFF;
        border: 1px solid #D2D3D3;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 92px;
        height: 92px;
        svg {
          margin: 0;
        }
      }
    }
    .performance-info {
      flex-basis: 50%;
      padding-left: 50px;
      align-self: flex-start;
      ul {
        list-style: none;

        li {
          cursor: pointer;
          border-bottom: 1px solid $border-color;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 0px;

          &:last-child {
            margin-bottom: 0;
            border-bottom: 0;
            // padding-bottom: 0;
          }

          & h5 {
            font-size: 20px;
            letter-spacing: -0.5px;
            color: $font-color-base;
          }
          & h6 {
            display: flex;
            align-items: center;
            font-size: 18px;
            letter-spacing: -0.5px;
            color: $brand-color;
          }
        }
      }
    }
  }
  @media ( max-width: 899px ) {
    .performance-select {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      display: none;
    }

    .performance-contents {
      width: 100%;
      margin: 0 auto;
      background: #F2F2F2;
      padding: 30px 16px;
      margin-top: 0;
      display: block;
      justify-content: space-between;

      .performance-main {
        flex-basis: 50%;
        padding-right: 0;
        .main-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;

          & .title {
          /* 추가 */
            width: 385px;
          /* 추가 */
            font-size: 22px;
            font-weight: normal;
            text-decoration-line: underline;
            color: $font-color-base;
          }

          .download {
            background: #FFFFFF;
            border: 1px solid #D2D3D3;
            box-sizing: border-box;
            border-radius: 4px;
            padding: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 64px;
            height: 64px;
          }
        }
      }
      .performance-info {
        flex-basis: 50%;
        padding-left: 0;
        margin-top: 27px;

        .main-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;

          & .title {
            font-size: 22px;
            font-weight: normal;
            text-decoration-line: underline;
            color: #1B1D20;
          }
          .download {
            background: #FFFFFF;
            border: 1px solid #D2D3D3;
            box-sizing: border-box;
            border-radius: 4px;
            padding: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 64px !important;
            height: 64px !important;
          }
        }
        ul {
          list-style: none;

          li {
            padding-bottom: 16px;
            border-bottom: 1px solid $border-color;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;

            &.less-length {
              padding: 16px 0;
              margin-bottom: 0;
              cursor:pointer;
            }

            &:last-child {
              margin-bottom: 0;
            }

            & h5 {
              font-size: 16px;
              letter-spacing: -0.5px;
              color: $font-color-base;
            }
            & h6 {
              display: flex;
              align-items: center;
              font-size: 21px;
              letter-spacing: -0.5px;
              color: $brand-color;

              .data-type {
                display: none;
              }
            }
          }
        }
      }
    }
    .performance-main {
      flex-basis: 50%;
      padding-right: 0 !important;
      .main-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;

        & .title {
          font-size: 22px;
          font-weight: normal;
          text-decoration-line: underline;
          color: #1B1D20;
        }

        .download {
          background: #FFFFFF;
          border: 1px solid #D2D3D3;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 64px;
          height: 64px;
        }
      }
    }
  }
}
</style>
