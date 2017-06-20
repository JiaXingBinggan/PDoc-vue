import { authApi } from './api'
import axios from 'axios'

export default {
  login (email, pass) {
    let url = authApi.loginUrl()
    return axios({
      method: 'post',
      url: url,
      data: {
        email: email,
        password: pass
      },
      withCredentials: true
    })
  },
  loginOut () {
    return axios({
      method: 'get',
      url: authApi.loginOutUrl(),
      withCredentials: true
    })
  }
}
