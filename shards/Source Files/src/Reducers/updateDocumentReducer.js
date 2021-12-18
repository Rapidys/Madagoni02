import API from "../API/ApiBase";

let initialState = {
  updatedDocument: {},
  destinations: [],
  isUpdated: false,
}
let setUpdateDocument = 'SET-UPDATE-DOCUMENT'
let getUpdateDestinates = 'GET-UPDATE-DESTINATES'
let setIsUpdated = 'setIsUpdated'
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
    case setIsUpdated:
      return {
        ...state,
        isUpdated: action.updated
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
export let setIsUpdatedAC = (updated) => ({type: setIsUpdated, updated})
export default updateDocumentReducer

export let updateDocument = (updateDoc) => {
  return dispatch => {

    try {
      API.updateDocument(updateDoc).then(response => {
        dispatch(setUpdateDocumentAC(updateDoc))
      })
    } catch (e) {
      console.log(e)
    }
  }

}
