import API from "../../API/ApiBase";
import {setMotionDest, setMotionVis} from "./DocumentMotionsReducer";
import {selectDocumentAC} from "./selectDocReducer";

let initialState = {
  newPost: {},
  documentDate: null,
  documentId: null,
  status: null,
  isSended: false,
  error: false,
}

const setNewPost = "SET-NEW-POST"
const setDocumentDate = "SET-DOCUMENT-DATE"
const setDocumentId = "SET-DOCUMENT-ID"
const status = "status"
const isSended = "isSended"
const isError = "IS-ERROR"

export let addNewPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case setNewPost :
      return {
        ...state,
        newPost: action.newPost
      }
    case setDocumentDate :
      return {
        ...state,
        documentDate: action.Date
      }
    case setDocumentId :
      return {
        ...state,
        documentId: action.id
      }
    case status :
      return {
        ...state,
        status: action.is
      }
    case isSended :
      return {
        ...state,
        isSended: action.send
      }
    case isError :
      return {
        ...state,
        error: action.err
      }

    default:
      return state
  }
}


export let setNewPostAC = (newPost) => ({type: setNewPost, newPost})
export let setDocumentDateAC = (Date) => ({type: setDocumentDate, Date})
export let setDocumentIdAC = (id) => ({type: setDocumentId, id})
export let statusAC = (is) => ({type: status, is})
export let isSendedAC = (send) => ({type: isSended, send})
export let isErrorAC = (err) => ({type: isError, err})


export let setNewObject = (
  Motions,
  selectType,
  documentBody,
  documentTitle,
  fileId
) => {
  return (dispatch) => {
    let newPost = {
      DocumentId: 0,
      DocumentDate: null,
      DocumentTitle: documentTitle,
      DocumentBody: documentBody,
      isActive: true,
      DocumentTypeId: selectType,
      DocumentMotions: [...Motions.MotionDest, ...Motions.MotionVis],
      Attachments: fileId
    }
    try {
      API.newPostAPI(newPost)
        .then(response => {
          if (response && response.status === 200) {
            dispatch(setNewPostAC(newPost))
            dispatch(setDocumentIdAC(response.data.documentId))
            dispatch(setDocumentDateAC(response.data.documentDate))
            dispatch(statusAC(response.status))
            dispatch(isSendedAC(true))
            dispatch(isErrorAC(false))
            dispatch(setMotionDest([]))
            dispatch(setMotionVis([]))
            dispatch(selectDocumentAC({}))
          }


        }).catch(function (error) {
        if (error.response.status === 400) {
          dispatch(isErrorAC(true))
        }
      })
    } catch (e) {
      console.log(e.response)
    }
  }
}
