import API from "../../API/ApiBases";
import {getComments} from "./CommentsReducer";

let initialState = {
  newComment: {},
}
let setNewComment = 'NEW-COMMENT'
let creatNewCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case setNewComment:
      return {
        ...state,
        newComment: action.newCom
      }
    default:
      return state
  }
}

export let newCommentAC = (newCom) => ({type: setNewComment, newCom})


export let createComment = (newComment,id) => {
  return dispatch => {
    API.createNewComment(newComment).then((newComment) => {
      try {
        dispatch(newCommentAC(newComment))
        dispatch(getComments(id))
      } catch (e) {
        console.log(e)
      }
    })
  }
}


export default creatNewCommentReducer
