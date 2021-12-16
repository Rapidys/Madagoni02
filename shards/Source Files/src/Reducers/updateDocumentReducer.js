import API from "../API/ApiBase";

let initialState = {
  updatedDocument: {},
  destinations: [],
}
let setUpdateDocument = 'SET-UPDATE-DOCUMENT'
let getUpdateDestinates = 'GET-UPDATE-DESTINATES'
let updateDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case setUpdateDocument:
      return {
        ...state,
        updatedDocument: action.document
      }
    case getUpdateDestinates:
      return {
        ...state,
        destinations: action.destinations
      }
    default:
      return state
  }
}

export let setUpdateDocumentAC = (document) => ({
  type: setUpdateDocument,
  document
})
export let getUpdateDestinatesAC = (destinations) => ({
  type: getUpdateDestinates,
  destinations
})

export default updateDocumentReducer

export let updateDocument = (documentTitle, documentBody, selectType, destinations, fileId) => {
  return dispatch => {
    let updatedDocument = {
      DocumentId: 0,
      DocumentDate: null,
      DocumentTitle: documentTitle,
      DocumentBody: documentBody,
      isActive: true,
      DocumentTypeId: 0,
      DocumentMotions: destinations,
      Attachments: fileId
    }
    try {
      API.updateDocument(updatedDocument).then(response => {
        dispatch(setUpdateDocumentAC(updatedDocument))
      })
    } catch (e) {
      console.log(e)
    }
  }

}
