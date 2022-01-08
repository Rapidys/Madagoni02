let initialState = {
  isLoading: false,
  isChanged: false,
}

let isChangeLoading = 'IS-CHANGE-LOADING'
let isChanged = 'IS-CHANGE-Changed'

let changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case isChangeLoading:
      return {
        ...state,
        isLoading: action.loading
      }
    case isChanged:
      return {
        ...state,
        isChanged: action.changed
      }
    default:
      return state
  }
}

export let isLoadingAC = (loading) => ({type: isChangeLoading, loading})
export let isChangedAC = (changed) => ({type: isChanged, changed})

export default changePasswordReducer
