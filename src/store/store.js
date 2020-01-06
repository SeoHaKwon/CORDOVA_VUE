import Vue from 'vue'
import Vuex from 'vuex'
import { getAPIData } from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    companyType: '',
    seq: '',
    code: '',
    name: '',
    COMP_DATAP: '',
    flag: true,
    type: '',
    mainColor: '',
    logo: '',
    sublogo: '',
    banner: '',
    qaType: '',
    isIPO: '',
    performImg: '',
    IRPAGE_STOCK_YN: '',
    IRPAGE_FINANCE_YN: '',
    IRPAGE_DIVIDEND_YN: '',
    IRPAGE_SHOLDER_YN: '',
    IRPAGE_DISCLOSURE_YN: '',
    IRPAGE_IRMEETING_YN: '',
    IRPAGE_ISVIEW: [],
    MReportLength: 0,
    QALEN: 0,
    FINLEN: 0,
    IRPAGE_TYPE: '',
    SubImg: ''
  },
  getters: {
    getCompCode (state) {
      return state.code
    },
    getPerFormImg (state) {
      return state.performImg
    },
    getCompSeq (state) {
      return state.seq
    },
    getCompName (state) {
      return state.name
    },
    getCompType (state) {
      return state.type
    },
    getMainColor (state) {
      return state.mainColor
    },
    getLogo (state) {
      return state.logo
    },
    getSubLogo (state) {
      return state.sublogo
    },
    getBanner (state) {
      return state.banner
    },
    getQaType (state) {
      return state.qaType
    },
    getIsIPO (state) {
      return state.isIPO
    },
    GETISVIEW (state) {
      return state.IRPAGE_ISVIEW
    },
    getmReportlen (state) {
      return state.MReportLength
    },
    getQALEN (state) {
      return state.QALEN
    },
    getFINLEN (state) {
      return state.FINLEN
    },
    getSUBIMG (state) {
      return state.SubImg
    },
    getPageType (state) {
      return state.IRPAGE_TYPE
    }
  },
  mutations: {
    setIsAgreeCertification (state, data) {
      state.isAgreeCertification = data
    },
    setIsUserType (state, data) {
      state.isUserType = data
    },
    setCompany (state, data) {
      state.company = data
    },
    setJob (state, data) {
      state.job = data
    },
    setIsSelectedCompany (state, data) {
      state.isSelectedCompanyModal = data
    },
    setCompanyType (state, data) {
      state.companyType = data
    },
    SET_DATA (state, payload) {
      if (state.flag) {
        state.seq = payload.COMP_SEQ
        state.name = payload.COMP_NAME
        state.code = payload.COMP_CODE
        state.mainColor = payload.IRPAGE_MAIN_COLOR
        state.logo = payload.IRPAGE_LOGO
        state.sublogo = payload.IRPAGE_SUB_LOGO
        state.banner = payload.IRPAGE_MAIN_IMG
        state.qaType = payload.IRPAGE_QNA_YN
        state.isIPO = payload.COMP_TYPE
        state.performImg = payload.IRPAGE_EARNING_IMG
        state.flag = false
        state.IRPAGE_STOCK_YN = payload.IRPAGE_STOCK_YN
        state.IRPAGE_TYPE = payload.IRPAGE_TYPE
        state.SubImg = payload.IRPAGE_SUB_IMG
        const arrays = {
          'stock': payload.IRPAGE_STOCK_YN,
          'Finance': payload.IRPAGE_FINANCE_YN,
          'dividend': payload.IRPAGE_DIVIDEND_YN,
          'ShareHolder': payload.IRPAGE_SHOLDER_YN,
          'Disclosure': payload.IRPAGE_DISCLOSURE_YN,
          'irmeeting': payload.IRPAGE_IRMEETING_YN
        }
        state.IRPAGE_ISVIEW = arrays
      }
    },
    SET_REPORTLEN (state, payload) {
      state.MReportLength = payload
    },
    SET_QALEN (state, payload) {
      state.QALEN = payload
    },
    SET_FINLEN (state, payload) {
      state.FINLEN = payload
    }
  },
  actions: {
    async SET_INFO ({ commit }, url) {
      let param = {
        data: url,
        url: 'getSettingInfo'
      }
      const res = await getAPIData(param)
      commit('SET_DATA', res.data[0])
      return res.data[0]
    },
    async GET_KRX (context, payload) {
      let param = {
        data: payload,
        url: 'getKrxXMLData'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_SILQ (context, payload) {
      let param = {
        data: payload,
        url: 'getSilQuarter'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_ASILQ (context, payload) {
      let param = {
        data: payload,
        url: 'getAtypeQuarter'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_SILJ (context, payload) {
      let param = {
        data: payload,
        url: 'getPerformance'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_IPOJ (context, payload) {
      let param = {
        data: payload,
        url: 'getIPOperform'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_FAQ (context, payload) {
      let param = {
        data: payload,
        url: 'getFAQ'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_IRNEWS (context, payload) {
      let param = {
        data: payload,
        url: 'getIrNews'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_MREPORT ({ commit }, payload) {
      let param = {
        data: payload,
        url: 'getManagementReport'
      }
      const res = await getAPIData(param)
      commit('SET_REPORTLEN', res.data.length)
      return res.data
    },
    async GET_FINANCE (context, payload) {
      let param = {
        data: payload,
        url: 'getFinancialStatements'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_DIS (context, payload) {
      let param = {
        data: payload,
        url: 'getDisclosure'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_SHOLDER (context, payload) {
      let param = {
        data: payload,
        url: 'getShareHolder'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_DIVI (context, payload) {
      let param = {
        data: payload,
        url: 'getDividend'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_CONTACT (context, payload) {
      let param = {
        data: payload,
        url: 'getContactLink'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_SCH (context, payload) {
      let param = {
        data: payload,
        url: 'getComeSchedule'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_COMINFO (context, payload) {
      let param = {
        data: payload,
        url: 'getCompInfo'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_IPO (context, payload) {
      let param = {
        data: payload,
        url: 'getIPOprocess'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_QRE (context, payload) {
      let param = {
        data: payload,
        url: 'getQreport'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_PAGETYPE (context, payload) {
      let param = {
        data: payload,
        url: 'getPageType'
      }
      const res = await getAPIData(param)
      return res.data[0]
    },
    async GET_BDETAIL (context, payload) {
      let param = {
        data: payload,
        url: 'getBoardDetail'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_OLDSCHE (context, payload) {
      let param = {
        data: payload,
        url: 'getOldSchedule'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_SDETAIL (context, payload) {
      let param = {
        data: payload,
        url: 'getScheduleDetail'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_SREPORT (context, payload) {
      let param = {
        data: payload,
        url: 'getSaveReport'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_VREPORT (context, payload) {
      let param = {
        data: payload,
        url: 'getVarReport'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async GET_MAINDATA (context, payload) {
      let param = {
        data: payload,
        url: 'getTypeAMainData'
      }
      const res = await getAPIData(param)
      return res.data
    },
    async IS_MENU (context, payload) {
      let param = {
        data: payload,
        url: 'IsMenuTitle'
      }
      const res = await getAPIData(param)
      return res.data[0]
    }
  }
})
