import API from "../API/ApiBases";

let initialState = {
  positions: []
}

let setPositions = 'SET-POSITIONS'
let PositionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case setPositions :
      return {
        ...state,
        positions: action.position
      }
    default:
      return state
  }
}

export let setPositionsAC = (position) => ({type: setPositions, position})

export default PositionsReducer

export let getPositions = () => {
  return dispatch => {
    try {
      API.getPositions().then(response => {
        dispatch(setPositionsAC(response.data))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
