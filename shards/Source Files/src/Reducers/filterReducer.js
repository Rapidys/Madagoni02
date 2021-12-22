import API from "../API/ApiBase";
import {GetDocumentAC} from "./getDocReducer";

let initialState = {}

let filterReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default filterReducer


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

