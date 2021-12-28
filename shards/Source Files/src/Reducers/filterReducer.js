import API from "../API/ApiBase";
import {GetDocumentAC} from "./getDocReducer";

let initialState = {
  filteredDocument: [],
  divisionId: {},
  executorId: {},
  authorId: {},
  filterLoading: false
}
let setDivisionId = 'SET-DIVISION-ID'
let setExecutorId = 'SET-EXECUTOR-ID'
let setAuthorId = 'SET-AUTHOR-ID'
let setFilteredDoc = 'SET-FILTERED-DOC'
let filterLoading = 'SET-FILTERED-LOADING'
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
    case setFilteredDoc :
      return {
        ...state,
        filteredDocument: action.filtered
      }
    case filterLoading :
      return {
        ...state,
        filterLoading: action.loading
      }
    default:
      return state
  }
}

export default filterReducer

export let setDivisionIdAC = (id) => ({type: setDivisionId, id})
export let setExecutorIdAC = (id) => ({type: setExecutorId, id})
export let setAuthorIdAC = (id) => ({type: setAuthorId, id})
export let setFilteredDocAC = (filtered) => ({type: setFilteredDoc, filtered})
export let filterLoadingAC = (loading) => ({type: filterLoading, loading})

export let getFilteredDocs = (filter) => {

  return dispatch => {
    dispatch(filterLoadingAC(true))

    try {
      API.getFilterDocuments(filter).then(response => {
        dispatch(GetDocumentAC(response.data.documentList))
        dispatch(setFilteredDocAC(filter))
        dispatch(filterLoadingAC(false))
      })
    } catch (e) {
      console.log(e)
    }
  }
}

