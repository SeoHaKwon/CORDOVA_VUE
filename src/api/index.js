import axios from 'axios'

const config = {
  baseUrl: 'api.irpage.co.kr/api/irgo/'
}

async function getAPIData (payload) {
  return axios.post(`https://${config.baseUrl}${payload.url}`, payload.data)
}

export { getAPIData }
