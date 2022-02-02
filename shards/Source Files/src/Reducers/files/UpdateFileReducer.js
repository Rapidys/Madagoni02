import API from "../../API/ApiBase";

let initialState = {
  isLoading: false,
  file: {},
  valueFromTree: null,
  shareUsers: [],
  openTree: false,
  fileInfo: {},
  successModal: false,
  shareUsersForNewFile: [],  // shareUsers Before Save
}

export let updateFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-SHARE-USER-NEW-FILE':
      return {
        ...state,
        shareUsersForNewFile: [...state.shareUsers, ...action.payload],
      }
    case 'SET-FILE-INFO':
      return {
        ...state,
        fileInfo: action.payload,
      }
    case 'LOAD-FILE':
      return {
        ...state,
        isLoading: true,
      }
    case 'UPDATE-FILE':
      return {
        ...state,
        file: action.payload,
        isLoading: false,
        successModal: true,
      }
    case 'valueFromTree':
      return {
        ...state,
        valueFromTree: action.payload,
      }
    case 'SHARE-USERS':
      return {
        ...state,
        shareUsers: [...state.shareUsers, ...action.payload],
        valueFromTree:[],
      }
    case 'SHARE-CHOSEN-USERS':
      return {
        ...state,
        shareUsers: [...action.payload],
      }
    case 'FILTER-USERS':
      return {
        ...state,
        shareUsers: [...state.shareUsers.filter(item => item.userId !== action.userId)],
      }
    case 'SET-OPEN-TREE':
      return {
        ...state,
        openTree: true
      }
    case 'SET-CLOSE-TREE':
      return {
        ...state,
        openTree: false
      }
    case 'SET-CHANGE-PAGE':
      return {
        ...state,
        shareUsers: []
      }
    case 'SET-SUCCESS-CLOSE':
      return {
        ...state,
        successModal: false
      }
    default:
      return state
  }
}
let loadingFileAC = () => ({type: 'LOAD-FILE'})
let UpdateFileAC = (payload) => ({type: 'UPDATE-FILE', payload})
export let shareUsersAC = (payload) => ({type: 'SHARE-USERS', payload})
export let shareChosenUsersAC = (payload) => ({
  type: 'SHARE-CHOSEN-USERS',
  payload
})

export let sharedValueUserAC = (payload) => ({type: 'valueFromTree', payload})
export let setOpenTreeAC = () => ({type: 'SET-OPEN-TREE'})
export let setCloseTreeAC = () => ({type: 'SET-CLOSE-TREE'})
export let FilterUsersAC = (userId) => ({type: 'FILTER-USERS', userId})
export let setChangePage = () => ({type: 'SET-CHANGE-PAGE'})
export let setFileInfoAC = (payload) => ({type: 'SET-FILE-INFO', payload})
export let setSuccessModalClose = () => ({type: 'SET-SUCCESS-CLOSE'})
export let shareUserInNewFile = (payload) => ({
  type: 'SET-SHARE-USER-NEW-FILE',
  payload
}) // shareUsers Before Save


export let UpdateFile = (data) => {
  return dispatch => {
    try {
      dispatch(loadingFileAC())
      API.updateFile(data).then(response => {
        dispatch(UpdateFileAC(data))
      })

    } catch (e) {
      console.log(e)
    }
  }
}
