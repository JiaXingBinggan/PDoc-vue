import { captchaApi } from './api'
import axios from 'axios'

export default {
  getEmailCaptcha (toEmail) {
    let url = captchaApi.getCaptchaEmailUrl() + '?email=' + toEmail
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  vaildEmailCaptcha (toEmail, captchaCode) {
    let url = captchaApi.captchaEmailUrl()
    return axios({
      method: 'post',
      url: url,
      data: {
        email: toEmail,
        captcha: captchaCode
      },
      withCredentials: true
    })
  },
  getImgCaptcha () {
    let url = captchaApi.getImgCaptchaUrl()
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  }
}
