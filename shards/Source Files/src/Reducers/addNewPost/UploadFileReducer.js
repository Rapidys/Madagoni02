import API from "../../API/ApiBase";

let initialState = {
  File: {},
  fileId: [],
  isFetching: false,
}

const setFile = 'SET-FILE'
const setFileId = 'SET-FILE-ID'
const isFetch = 'isFetching'
const delActive = 'delActive'
let uploadFileReducer = (state = initialState, action) => {

  switch (action.type) {
    case setFile :
      return {
        ...state,
        File: {...state.File, ...action.data},

      }


    case setFileId :
      return {
        ...state,
        fileId: [...state.fileId, action.id],
      }
    case delActive :
      return {
        ...state,
        fileId: [...state.fileId],
      }

    case isFetch :
      return {
        ...state,
        isFetching: action.fetching,
      }
    default:
      return state
  }
}
export let uploadFileAC = (data) => ({type: setFile, data})
export let FileIdAC = (id) => ({type: setFileId, id})
export let isFetchingAC = (fetching) => ({type: isFetch, fetching})
export let delActiveAC = (active) => ({type: delActive, active})

export const uploadFile = (file) => {
  debugger
  return (dispatch) => {
    try {
      dispatch(isFetchingAC(true))
      API.UploadFileApi(file)
        .then(response => {
          dispatch(uploadFileAC(file))
          dispatch(FileIdAC({
            AttachmentId: response.data,
            isActive: true,

          }))
          dispatch(isFetchingAC(false))
        })

    } catch (e) {
      console.log(e)
    }
  }
}

export default uploadFileReducer
