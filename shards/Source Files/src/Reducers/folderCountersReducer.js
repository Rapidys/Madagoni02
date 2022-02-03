import API from "../API/ApiBases";
import {LoadingAC, setIsAuth} from "./AuthReducer";

let initialState = {
  folderCount: {},
  sesiaDie: false,
}
let setFolderCount = 'SET-FOLDER-COUNT'
let setSesiaDie = 'setSesiaDie'
let folderCounterReducer = (state = initialState, action) => {
  switch (action.type) {
    case setFolderCount:
      return {
        ...state,
        folderCount: action.count
      }
    case setSesiaDie:
      return {
        ...state,
        sesiaDie: action.sesia
      }

    default:
      return state
  }

}
export let setFolderCountAC = (count) => ({type: setFolderCount, count})
export let setSesiaDieAC = (sesia) => ({type: setSesiaDie, sesia})


export let setCounter = () => {
  return dispatch => {
    try {
      API.GetFolderCounters().then(response => {
        if (response) {
          dispatch(setFolderCountAC(response.data))
        }
      }).catch(function (error) {
        if (error.response && error.response.status === 401) {
          dispatch(LoadingAC(false))
          dispatch(setIsAuth(false))
          localStorage.clear()
          dispatch(setSesiaDieAC(true))
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}


export default folderCounterReducer
