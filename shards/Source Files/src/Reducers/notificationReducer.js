let initialState = {
  notification: []

}

let setNotification = 'SET-NOTIFICATION'
let notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case setNotification :
      return {
        ...state,
        notification: action.notification
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
