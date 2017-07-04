import { docApi } from './api'
import axios from 'axios'

export default {
  getDocs (ownerEmail) {
    let url = docApi.getDocsUrl() + '?ownerEmail=' + ownerEmail
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  addDoc (isRoot, pId, label, desc, docContent, mdHtml, docType, ownerEmail) {
    return axios({
      method: 'post',
      url: docApi.addDocUrl(),
      data: {
        isRoot: isRoot,
        pId: pId,
        label: label,
        desc: desc,
        docContent: docContent,
        mdHtml: mdHtml,
        docType: docType,
        ownerEmail: ownerEmail
      },
      withCredentials: true
    })
  },
  getSingleDoc (id) {
    let url = docApi.getSingleDocUrl(id)
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  modifyDoc (id, updateLabel, updateDesc, updateDoc, updateMdHtml) {
    let url = docApi.modifyDocUrl(id)
    return axios({
      method: 'put',
      url: url,
      data: {
        updateLabel: updateLabel,
        updateDesc: updateDesc,
        updateDoc: updateDoc,
        updateMdHtml: updateMdHtml
      },
      withCredentials: true
    })
  },
  deleteDoc (id) {
    let url = docApi.deleteDocUrl(id)
    return axios({
      method: 'delete',
      url: url,
      withCredentials: true
    })
  },
  getDocByLabel (docLabel) {
    let url = docApi.getDocByLabelUrl() + '?docLabel=' + docLabel
    return axios({
      method: 'get',
      url: url,
      withCredentials: true
    })
  }
}
