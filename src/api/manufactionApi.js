import { manufactionApi } from './api'
import axios from 'axios'

export default {
  getManufaction (level, status, timeType, startTime, endTime, limit, offset) {
    let url = manufactionApi.manufactionUrl() + '?level=' + level + '&status=' + status + '&timeType=' + timeType + '&startTime=' + startTime + '&endTime=' + endTime + '&limit=' + limit + '&offset=' + offset
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  addManufaction (proposer, proposeTime, description, level) {
    return axios({
      method: 'post',
      url: manufactionApi.addManufactionUrl(),
      data: {
        proposer: proposer,
        proposeTime: proposeTime,
        description: description,
        level: level
      },
      withCredentials: true
    })
  },
  updateManufaction (id, levelUpdate, proposerUpdate, proposeTimeUpdate, descriptionUpdate) {
    let url = manufactionApi.updateManufactionUrl(id)
    return axios({
      method: 'put',
      url: url,
      data: {
        levelUpdate: levelUpdate,
        proposerUpdate: proposerUpdate,
        proposeTimeUpdate: proposeTimeUpdate,
        descriptionUpdate: descriptionUpdate
      },
      withCredentials: true
    })
  },
  deleteManufaction (id) {
    let url = manufactionApi.deleteManufactionUrl(id)
    return axios({
      method: 'delete',
      url: url,
      withCredentials: true
    })
  },
  getSingleManufaction (id) {
    let url = manufactionApi.getSingleManufactionUrl(id)
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  handleManufactionStart (id, handler, diagnosis) {
    let url = manufactionApi.handleManufactionStartUrl(id)
    return axios({
      method: 'put',
      url: url,
      data: {
        handler: handler,
        diagnosis: diagnosis
      },
      withCredentials: true
    })
  },
  handleManufactionConfirm (id, prosessStep) {
    let url = manufactionApi.handleManufactionConfirmUrl(id)
    return axios({
      method: 'put',
      url: url,
      data: {
        prosessStep: prosessStep
      },
      withCredentials: true
    })
  }
}
