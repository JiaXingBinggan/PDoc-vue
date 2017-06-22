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
  }
}
