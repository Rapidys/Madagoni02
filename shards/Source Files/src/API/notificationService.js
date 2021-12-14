import {setNotificationAC} from "../Reducers/notificationReducer";
import API from "./ApiBase";


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
