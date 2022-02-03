import API from "../../API/ApiBases";
import {setMotionDest, setMotionVis} from "./DocumentMotionsReducer";
import {selectDocumentAC} from "./selectDocReducer";
import {SetGlobalErrorsTrue} from "../errors/ErrorsReducer";

let initialState = {
  newPost: {},
  documentDate: null,
  documentId: null,
  status: null,
  isSended: false,
  isSendedDraft: false,
  error: false,
}

const setNewPost = "SET-NEW-POST"
const setDocumentDate = "SET-DOCUMENT-DATE"
const setDocumentId = "SET-DOCUMENT-ID"
const status = "status"
const isSended = "isSended"
const isError = "IS-ERROR"
const isSendedDraft = "isSendedDraft"

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
    case isSendedDraft :
      return {
        ...state,
        isSendedDraft: action.draft
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
export let isSendedDraftAC = (draft) => ({type: isSendedDraft, draft})
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
            if (Motions.MotionDest[0].MotionStatusId === 2) {
              dispatch(isSendedAC(true))
            }
            if (Motions.MotionDest[0].MotionStatusId === 1) {
              dispatch(isSendedDraftAC(true))
            }
            dispatch(isErrorAC(false))
            dispatch(setMotionDest([]))
            dispatch(setMotionVis([]))
            dispatch(selectDocumentAC({}))
          }


        }).catch(function (error) {
        if (error.response.status === 400) {
          dispatch(isErrorAC(true))
          dispatch(SetGlobalErrorsTrue())
        }
      })
    } catch (e) {
      console.log(e.response)
    }
  }
}
