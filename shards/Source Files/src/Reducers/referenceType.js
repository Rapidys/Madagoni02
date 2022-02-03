import API from "../API/ApiBases";

let initialState = {
  referenceTypes: [],
}

let setReferenceTypes = 'SET-REFERENCE-TYPES'
let referenceTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case setReferenceTypes :
      return {
        ...state,
        referenceTypes: action.refTypes
      }
    default:
      return state
  }
}

export let setReferenceTypesAC = (refTypes) => ({
  type: setReferenceTypes,
  refTypes
})

export default referenceTypesReducer

export let getReferenceTypes = () => {
  return dispatch => {
    try {
      API.getReferenceTypes().then(response => {

        dispatch(setReferenceTypesAC(response.data))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
