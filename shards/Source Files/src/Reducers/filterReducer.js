import API from "../API/ApiBase";
import {GetDocumentAC} from "./getDocReducer";

let initialState = {
  divisionId: {},
}
let setDivisionId = 'SET-DIVISION-ID'
let filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case setDivisionId :
      return {
        ...state,
        divisionId: action.id
      }
    default:
      return state
  }
}

export default filterReducer

export let setDivisionIdAC = (id) => ({type: setDivisionId, id})

export let getFilteredDocs = (filter) => {
  return dispatch => {
    try {
      API.getFilterDocuments(filter).then(response => {
        dispatch(GetDocumentAC(response.data.documentList))
      })
    } catch (e) {
      console.log(e)
    }
  }
}

