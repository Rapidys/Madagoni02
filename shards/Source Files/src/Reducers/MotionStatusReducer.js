let initialState = {
  motionStatus: null,
}
let setMotionStatus = 'SET-MOTION-STATUS'
let MotionStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case setMotionStatus:
      return {
        ...state,
        motionStatus: action.status
      }
    default:
      return state
  }
}


export let motionStatusAC = (status) => ({type: setMotionStatus, status})

export default MotionStatusReducer
