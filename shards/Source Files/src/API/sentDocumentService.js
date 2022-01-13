import {
  GetDocumentAC, setDocLoadingAC,
} from "../Reducers/getDocReducer";
import API from "./ApiBase";
import {setToTalPages} from "../Reducers/PaginationReducer";
import {
  chosenDocPageAC,
  chosenIsLoadingAC
} from "../Reducers/chosenDocumentReducer";
import {setIsAuth} from "../Reducers/AuthReducer";


export let getMessagePage = (params) => {
  return dispatch => {
    dispatch(chosenIsLoadingAC(true))
    try {
      API.getDocument(params)

        .then(response => {
          dispatch(chosenIsLoadingAC(false))
          dispatch(chosenDocPageAC(response.data))

        })
    } catch (e) {
      console.log(e)
    }
  }
}
export let getDocs = (documentStatus) => {


  return dispatch => {
    dispatch(setDocLoadingAC(true))
    try {
      API.getDocuments(documentStatus)
        .then(response => {
          dispatch(setDocLoadingAC(false))

          if (!response) {
            return dispatch(setIsAuth(false))
          }
          dispatch(GetDocumentAC([]))

          dispatch(GetDocumentAC(response.data.documentList))
          dispatch(setToTalPages(response.data.totalCount))
        })

    } catch (e) {
      console.log(e)
    }
  }
}
