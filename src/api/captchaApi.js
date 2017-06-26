import { captchaApi } from './api'
import axios from 'axios'

export default {
  getEmailCaptcha (toEmail) {
    let url = captchaApi.getCaptchaEmailUrl() + '?email=' + toEmail + '&expire=' + Date.now()
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
  },
  getGtCaptcha () {
    let url = captchaApi.getGtCaptchaUrl()
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  getSvgCaptcha () {
    let url = captchaApi.getSvgCaptchaUrl()
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  }
}
