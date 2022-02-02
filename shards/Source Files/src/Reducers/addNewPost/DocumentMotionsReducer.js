let initialState = {
  MotionDest: [],
  MotionVis: []
}

let SetMotionDest = "SET-MOTION-DEST"
let SetMotionVis = "SET-MOTION-VIS"

let DocumentMotionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SetMotionDest: {
      return {
        ...state,
        MotionDest: state.MotionDest = action.data
      }
    }
    case SetMotionVis: {
      return {
        ...state,
        MotionVis: state.MotionVis = action.data
      }
    }
    default:
      return state
  }
}
export let setMotionDest = (data) => ({
  type: SetMotionDest, data
})
export let setMotionVis = (data) => ({
  type: SetMotionVis, data
})
export default DocumentMotionsReducer
