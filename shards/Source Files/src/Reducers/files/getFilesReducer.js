import API from "../../API/ApiBase";

let initialState = {
  files: [],
  loading: false,
}

export let getFilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET-FILES':
      return {
        ...state,
        files: action.payload,
        loading: false,
      }
    case 'GET-FILES-LOADING':
      return {
        ...state,
        files: [],
        loading: true,
      }
    default:
      return state
  }
}

let SetFilesAC = (payload) => ({type: 'GET-FILES', payload})
let getFilesLoading = () => ({type: 'GET-FILES-LOADING'})


export let getFiles = (currentPage, rowsPerPage) => {
  return dispatch => {
    try {
      dispatch(getFilesLoading())
      API.getMyFiles(currentPage, rowsPerPage).then(response => {
        dispatch(SetFilesAC(response.data))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
