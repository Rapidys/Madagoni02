import API from "../API/ApiBase";
import {GetDocumentAC} from "./getDocReducer";

let initialState = {
  divisionId: {},
  executorId: {},
  authorId: {},
}
let setDivisionId = 'SET-DIVISION-ID'
let setExecutorId = 'SET-EXECUTOR-ID'
let setAuthorId = 'SET-AUTHOR-ID'
let filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case setDivisionId :
      return {
        ...state,
        divisionId: action.id
      }
    case setExecutorId :
      return {
        ...state,
        executorId: action.id
      }
    case setAuthorId :
      return {
        ...state,
        authorId: action.id
      }
    default:
      return state
  }
}

export default filterReducer

export let setDivisionIdAC = (id) => ({type: setDivisionId, id})
export let setExecutorIdAC = (id) => ({type: setExecutorId, id})
export let setAuthorIdAC = (id) => ({type: setAuthorId, id})

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

