import API from "../API/ApiBase";

let initialState = {
  folderCount: {},
}
let setFolderCount = 'SET-FOLDER-COUNT'
let folderCounterReducer = (state = initialState, action) => {
  switch (action.type) {
    case setFolderCount:
      return {
        ...state,
        folderCount: action.count
      }

    default:
      return state
  }

}
export let setFolderCountAC = (count) => ({type: setFolderCount, count})


export let setCounter = () => {
  return dispatch => {
    try {
      API.GetFolderCounters().then(response => {
        if(response){
          dispatch(setFolderCountAC(response.data))
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}


export default folderCounterReducer
