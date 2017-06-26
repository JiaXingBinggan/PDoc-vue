import { userApi } from './api'
import axios from 'axios'

export default {
  getUser () {
    let url = userApi.getUserUrl()
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  addUser (email, pass, name) {
    return axios({
      method: 'post',
      url: userApi.addUserUrl(),
      data: {
        email: email,
        pass: pass,
        name: name
      },
      withCredentials: true
    })
  },
  updateUser (id, name, tel, birthdate, sex, desc) {
    let url = userApi.updateUserUrl(id)
    return axios({
      method: 'put',
      url: url,
      data: {
        name: name,
        tel: tel,
        birthdate: birthdate,
        sex: sex,
        desc: desc
      },
      withCredentials: true
    })
  },
  deleteUser (id) {
    let url = userApi.deleteUserUrl(id)
    return axios({
      method: 'delete',
      url: url,
      withCredentials: true
    })
  },
  getUserByEmail (email) {
    let url = userApi.getUserByEmailUrl(email)
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  getSingleUser (id) {
    let url = userApi.getSingleUserUrl(id)
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  getUserList (row, start) { // 具体参数随需求定
    let url = userApi.getUserListUrl() + '?row=' + row + '&start=' + start
    return axios({
      method: 'GET',
      url: url,
      withCredentials: true
    })
  },
  modifyUserPass (id, pass, cap) {
    let url = userApi.modifyUserPassUrl(id)
    return axios({
      method: 'put',
      url: url,
      data: {
        password: pass,
        svgCaptcha: cap
      },
      withCredentials: true
    })
  },
  addUserPortrait (id, formdata) {
    let url = userApi.addUserPortraitUrl(id)
    return axios({
      method: 'post',
      url: url,
      data: formdata
    })
  }
}
