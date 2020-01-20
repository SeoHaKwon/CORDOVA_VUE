import axios from 'axios'

const config = {
  baseUrl: 'api.irpage.co.kr/api/irgo/'
}

async function getAPIData (payload) {
  return axios.post(`https://${config.baseUrl}${payload.url}`, payload.data)
}

async function JoinModule (payload) {
  return axios.post(`https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb`, payload.data)
}

export { getAPIData, JoinModule }
