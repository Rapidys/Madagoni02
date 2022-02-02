import API from "../../API/ApiBase";

let initialState = {
  file: [],
  isLoading: false,
}

export let getFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-FILE':
      return {
        ...state,
        file: action.payload,
        isLoading: false,
      }
    case 'SET-LOADING-FILE':
      return {
        ...state,
        isLoading: true
      }
    default:
      return state
  }
}
let setFileAC = (payload) => ({type: 'SET-FILE', payload})
let setLoadingFile = () => ({type: 'SET-LOADING-FILE'})


export let getFile = (id) => {
  return dispatch => {
    try {
      dispatch(setLoadingFile())
      API.getFile(id).then(response => {
        dispatch(setFileAC(response.data))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
