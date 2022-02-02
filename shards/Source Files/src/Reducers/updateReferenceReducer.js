import API from "../API/ApiBase";

let initialState = {
  updatedReference: {}
}


let setUpdatedReference = 'SET-UPDATE-REFERENCE'
let updateReferenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case setUpdatedReference:
      return {
        ...state,
        updatedReference: action.reference
      }
    default:
      return state
  }
}

export let setUpdatedReferenceAC = (reference) => ({
  type: setUpdatedReference,
  reference
})

export default updateReferenceReducer


export let setReference = (referenceType, newReference) => {
  return dispatch => {
    try {
      API.updateReference(referenceType, newReference).then(response => {
        dispatch(setUpdatedReferenceAC(newReference))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
