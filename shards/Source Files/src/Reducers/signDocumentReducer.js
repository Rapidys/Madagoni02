import API from "../API/ApiBase";

let initialState = {
  documentId: null,
  isSign: false,
}
let setDoCid = 'SET-DOC-ID'
let isSign = 'IS-SIGN-DOCUMENT'
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
  }
}

export let signDocIdAC = (id) => ({type: setDoCid, id})
export let isSignAC = (issign) => ({type: isSign, issign})

export default signDocumentReducer

export let setSignDocument = (id) => {
  return dispatch => {
    API.signDocument(id).then(() => {
      try {
        dispatch(signDocIdAC(id))
        dispatch(isSignAC(true))
      } catch (e) {
        console.log(e)
      }
    })
  }
}
