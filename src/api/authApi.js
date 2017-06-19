import { authApi } from './api'
import axios from 'axios'

export default {
  login (email, pass, cap) {
    let url = authApi.loginUrl()
    return axios({
      method: 'post',
      url: url,
      data: {
        email: email,
        password: pass,
        captcha: cap
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
