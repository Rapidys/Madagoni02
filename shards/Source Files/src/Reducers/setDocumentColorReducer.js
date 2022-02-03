import API from "../API/ApiBases";

let initialState = {
  documentColor: {}
}
let setColor = 'SetColor'
let documentColorReducer = (state = initialState, action) => {
  switch (action.type) {
    case setColor:
      return {
        ...state,
        documentColor: action.color
      }
    default:
      return state
  }
}


export let setDocumentColorAC = (color) => ({type: setColor, color})


export default documentColorReducer


export let setDocumentColor = (color) => {
  return dispatch => {
    API.setDocumentColor(color)
      .then(response => {
        dispatch(setDocumentColorAC(color))
      })
  }
}
