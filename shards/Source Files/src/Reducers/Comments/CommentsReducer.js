import API from "../../API/ApiBase";

let initialState = {
  comments: [],
  isVisibleModal: false,
  isVisibleBtn: true,
}


let setComments = 'SET-COMMENTS'
let modalVisible = 'MODAL-VISIBLE'
let setVisibleBtn = 'SET-VISIBLE-BUTTON'

let commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case setComments:
      return {
        ...state,
        comments: action.comments
      }
    case modalVisible:
      return {
        ...state,
        isVisibleModal: action.visible
      }
    case setVisibleBtn:
      return {
        ...state,
        isVisibleBtn: action.visBtn
      }
    default:
      return state
  }

}

export let setCommentsAC = (comments) => ({type: setComments, comments})
export let setModalVisible = (visible) => ({type: modalVisible, visible})
export let setVisibleBtnAC = (visBtn) => ({type: setVisibleBtn, visBtn})


export let getComments = (documentId) => {
  return dispatch => {
    API.getCommentsapi(documentId).then((response) => {
      try {
        dispatch(setCommentsAC(response.data))
      } catch (e) {
        console.log(e)
      }
    })
  }
}
export default commentsReducer
