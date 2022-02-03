import API from "../../API/ApiBases";

let initialState = {
  setOptions: null,
  selectType: {},
  type: null,
}

const selectValue = 'SELECT'
const setOptions = 'SET-SELECT'
const setDocType = 'setDocType'

let selectDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case selectValue :
      return {
        ...state,
        selectType: action.data
      }
    case setOptions :
      return {
        ...state,
        setOptions: action.options
      }
    case setDocType :
      return {
        ...state,
        type: action.value
      }
    default:
      return state
  }
}

export let selectDocumentAC = (data) => ({type: selectValue, data})
export let setOptionsAC = (options) => ({type: setOptions, options})
export let setDocTypeAC = (value) => ({type: setDocType, value})

export const getType = () => {
  return dispatch => {
    try {
      API.getDocTypes()
        .then(response => {
          if (response) {
            dispatch(setOptionsAC(response.data))

          }
        })

    } catch (e) {
      console.log(e);
    }
  }
}

export default selectDocumentReducer
