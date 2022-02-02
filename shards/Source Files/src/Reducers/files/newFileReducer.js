let initialState = {
  user: null,
  asideIndex: -1,
  insideIndex: -1,
  isClickedRow: false,
  isCallRow:false,
}

let setUserToFile = 'SET-USER-TO-FILE'
let setAsideIndex = 'SET-ASIDE-INDEX'
let setInsideIndex = 'SET-INSIDE-INDEX'
let setRowColsClicked = 'SET-ROW-COLS-CLICKED'
let SetisCallRow = 'IS-CALL-ROW'
let newFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case setUserToFile:
      return {
        ...state,
        user: action.payload
      }
    case setAsideIndex:
      return {
        ...state,
        asideIndex: action.payload
      }
    case setInsideIndex:
      return {
        ...state,
        insideIndex: action.payload
      }
    case setRowColsClicked:
      return {
        ...state,
        isClickedRow: action.payload
      }
      case SetisCallRow:
      return {
        ...state,
        isCallRow: action.payload
      }
    default:
      return state
  }
}

export default newFileReducer
export let setUserToFileAC = (payload) => ({type: setUserToFile, payload})
export let setAsideIndexAC = (payload) => ({type: setAsideIndex, payload})
export let SetisCallRowAC = (payload) => ({type: SetisCallRow, payload})
export let setInsideIndexAC = (payload) => ({type: setInsideIndex, payload})
export let setRowColsClickedAC = (payload) => ({
  type: setRowColsClicked,
  payload
})
