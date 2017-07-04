import { imgApi } from './api'
import axios from 'axios'

export default {
  addUserPortrait (id, formdata) {
    let url = imgApi.imgPortraitUrl(id)
    return axios({
      method: 'post',
      url: url,
      data: formdata,
      withCredentials: true
    })
  },
  getUserPortrait (id) {
    let url = imgApi.getImgPortraitUrl(id)
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  addQiniuPortrait (id, formdata) {
    let url = imgApi.qiniuPortraitUrl(id)
    return axios({
      method: 'post',
      url: url,
      data: formdata,
      withCredentials: true
    })
  },
  getQiniuPortrait (id) {
    let url = imgApi.getQiniuPortraitUrl(id)
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  addMdImgs (formdata) {
    let url = imgApi.addMdImgsUrl()
    return axios({
      method: 'post',
      url: url,
      data: formdata,
      withCredentials: true
    })
  }
}
