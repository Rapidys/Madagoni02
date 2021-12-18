import API from "../API/ApiBase";
import {getMessagePage} from "../API/sentDocumentService";

let initialState = {
  documentId: null,
  isSign: false,
  reloadDoc: false,
}
let setDoCid = 'SET-DOC-ID'
let isSign = 'IS-SIGN-DOCUMENT'
let setRealoadDOC = 'set-reload-doc'
let signDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case setDoCid:
      return {
        ...state,
        documentId: action.id
      }
    case isSign :
      return {
        ...state,
        signDocument: action.issign
      }
    case setRealoadDOC :
      return {
        ...state,
        reloadDoc: action.reloadDoc
      }
    default:
      return state
  }
}

export let signDocIdAC = (id) => ({type: setDoCid, id})
export let isSignAC = (issign) => ({type: isSign, issign})
export let setRealoadDOCAC = (reloadDoc) => ({type: setRealoadDOC, reloadDoc})

export default signDocumentReducer

export let setSignDocument = (id, reloadId) => {
  return dispatch => {
    API.signDocument(id).then(() => {
      try {
        dispatch(signDocIdAC(id))
        dispatch(isSignAC(true))
        dispatch(getMessagePage(reloadId))
        dispatch(setRealoadDOCAC(true))
      } catch (e) {
        console.log(e)
      }
    })
  }
}
