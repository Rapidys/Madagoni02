import {setNotificationAC} from "../Reducers/notifications/notificationReducer";
import API from "./ApiBases";


export let getNotification = () => {
  return dispatch => {
    API.getNotification().then((response) => {
      try {
        dispatch(setNotificationAC(response.data))
      } catch (e) {
        console.log(e)
      }
    })
  }
}
