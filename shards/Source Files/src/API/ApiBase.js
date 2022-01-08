import axios from 'axios'
import {Redirect} from "react-router-dom";


let baseUrl = 'https://cyberdocapiservice20211103000756.azurewebsites.net/api'


const API = {
  AuthAPI(email, password) {
    return $ApiBase.post('/auth/authenticate', {
        email,
        password
      }
    )
  },
  passwordRecovery(data) {
    return $ApiBase.post('/auth/PasswordRecovery', data)
  },
  passwordChange(data) {
    return $ApiBase.post('/auth/PasswordChange', data)
  },
  ProfileInfo() {
    return $ApiBase.get('/Profile/GetProfileInfo')
  },
  getPosts(post) {
    return $ApiBase.get('/Posts/GetPosts' , post)
  },
  newPostAPI(newPost) {
    return $ApiBase.post('/docs/create', newPost)
  },
  CreatePost(newPost) {
    return $ApiBase.post('/Posts/CreatePost', newPost)
  },
  registerUser(newUser) {
    return $ApiBase.post('/admin/UpdateStructure', newUser)
  },
  GetStructure() {
    return $ApiBase.get('/admin/GetStructure')
  },
  FinishDocumentSelectTypes() {
    return $ApiBase.get('/reference/GetReference/CompletionResults')
  },
  FinishDocument(id, CompleteMotion) {
    return $ApiBase.post(`/docs/CompleteMotion/${id}`, CompleteMotion)
  },
  UploadFileApi(file) {
    return $ApiBase.post(`/docs/UploadFile`, file)
  },
  downloadFile(id) {
    return $ApiBase.get(`/Docs/DownloadFile/${id}`, {responseType: 'blob'})
  },
  getDocTypes() {
    return $ApiBase.get(`/reference/GetReference/DocumentTypes`)
  },
  getDocument(params) {
    return $ApiBase.get(`/docs/GetDocument/${params}`)
  },
  getDocuments(documentStatus) {
    return $ApiBase.post(`/docs/GetDocuments`, documentStatus,)
  },
  getFilterDocuments(document) {
    return $ApiBase.post(`/docs/GetDocuments`, document)
  },

  updateDocument(document) {
    return $ApiBase.post(`/docs/UpdateDocument`, document,)
  },
  signDocument(id) {
    return $ApiBase.get(`/docs/SignDocument/${id}`,)
  },
  RejectDocument(id) {
    return $ApiBase.get(`/docs/RejectDocument/${id}`,)
  },
  setDocumentColor(documentColor) {
    return $ApiBase.post(`/docs/SetDocumentColor`, documentColor)
  },
  GetFolderCounters() {
    return $ApiBase.get(`/docs/GetFolderCounters`)
  },
  getCommentsapi(documentId) {
    return $ApiBase.get(`/docComments/GetComments/${documentId}`)
  },
  getPositions() {
    return $ApiBase.get(`/reference/GetReference/Positions`)

  },
  getNotification() {
    return $ApiBase.get(`/Notifications/GetNotifications`)
  },
  ReadNotification(id) {
    return $ApiBase.get(`/Notifications/Read/${id}`)
  },
  createNewComment(newComment) {
    return $ApiBase.post(`/DocComments/CreateComment`, newComment)
  },
  updateReference(referenceType, newReference) {
    return $ApiBase.post(`/reference/UpdateReference/${referenceType}`, newReference)
  },
  getReferenceTypes() {
    return $ApiBase.get(`/reference/GetReferenceTypes`)
  },
  axiosCreate() {
    return axios.create({
      baseURL: baseUrl,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  },
  assignToken() {
    $ApiBase = API.axiosCreate()
  }
}

let $ApiBase = API.axiosCreate()


export default API
