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
  newPostAPI(newPost) {
    return $ApiBase.post('/docs/create', newPost)
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
  getDocTypes() {
    return $ApiBase.get(`/reference/GetReference/DocumentTypes`)
  },
  getDocument(params) {
    return $ApiBase.get(`/docs/GetDocument/${params}`)
  },
  getDocuments(documentStatus) {
    return $ApiBase.post(`/docs/GetDocuments`, documentStatus,)
  },
  signDocument(id) {
    return $ApiBase.get(`/docs/SignDocument/${id}`,)
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
  getNotification() {
    return $ApiBase.get(`/Notifications/GetNotifications`)
  },
  createNewComment(newComment) {
    return $ApiBase.post(`/DocComments/CreateComment`, newComment)
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
$ApiBase.interceptors.response.use((config) => {
  return config
}, (error) => {
  if (error && error.status === 403 || 400 || 401) {
    return <Redirect to='/login'/> && localStorage.clear()
  }

  return Promise.reject(error);
})

export default API
