import axios from "axios";

let initialState = {
  Files: []
}
let setFiles = 'SET-FILES'
let MyFilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case setFiles:
      return {
        ...state,
        Files: action.getFiles
      }
    default:
      return state
  }
}
export let setFilesAC = (getFiles) => ({type: setFiles, getFiles})

export default MyFilesReducer


export let getFiles = (limit,page) => {
  return dispatch => {
    try {
      axios.get('https://jsonplaceholder.typicode.com/posts',{
        params : {
          _limit:limit,
          _page:page,
        }
      }).then(response => {
        dispatch(setFilesAC(response.data))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
