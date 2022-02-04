import API from "../../API/ApiBases";

let initialState = {
  File: {},
  fileId: [],
  isFetching: false,
  imgUrl:'',
}

const setFile = 'SET-FILE'
const setFileId = 'SET-FILE-ID'
const isFetch = 'isFetching'
const delActive = 'delActive'
const setImgUrl = 'SET-IMG-URL'
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
      case setImgUrl :
      return {
        ...state,
        imgUrl: action.payload,
      }
    default:
      return state
  }
}
export let uploadFileAC = (data) => ({type: setFile, data})
export let FileIdAC = (id) => ({type: setFileId, id})
export let isFetchingAC = (fetching) => ({type: isFetch, fetching})
export let delActiveAC = (active) => ({type: delActive, active})
export let setImgUrlAC = (payload) => ({type: setImgUrl, payload})

export const uploadFile = (file, isComment) => {
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
          if (isComment && isComment === true) {
            API.downloadFile(response.data).then(response => {
              // const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
              // const link = document.createElement('img');
              // link.src = downloadUrl;
              console.log(response)
              dispatch(setImgUrlAC(response.request.responseURL))
            })
          }

        })

    } catch (e) {
      console.log(e)
    }
  }
}

export default uploadFileReducer
