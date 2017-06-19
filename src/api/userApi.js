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
  addUser (email, pass) {
    return axios({
      method: 'post',
      url: userApi.addUserUrl(),
      data: {
        email: email,
        pass: pass
      },
      withCredentials: true
    })
  },
  updateUser (id, email) {
    let url = userApi.updateUserUrl(id)
    return axios({
      method: 'put',
      url: url,
      data: {
        email: email
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
  }
}
