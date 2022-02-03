import API from "../../API/ApiBases";
import {getNotification} from "../../API/notificationService";

let initialState = {
  notification: [],
  isRead: false,
}

let setNotification = 'SET-NOTIFICATION'
let setIsRead = 'SET-IS-READ'
let notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case setNotification :
      return {
        ...state,
        notification: action.notification
      }
    case setIsRead :
      return {
        ...state,
        isRead: action.isread
      }
    default:
      return state
  }
}

export default notificationReducer

export let setNotificationAC = (notification) => ({
  type: setNotification,
  notification
})
export let setIsReadAC = (isread) => ({type: setIsRead, isread})

export let getReadNotification = (id) => {
  return dispatch => {
    try {
      API.ReadNotification(id).then(response => {
        dispatch(setIsReadAC(true))
        dispatch(getNotification())
      })
    } catch (e) {
      console.log(e)
    }
  }
}
