let initialState = {
  Errors: false,
  ErrorText: '',
}

export let ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GLOBAL-SET-ERROR':
      return {
        ...state,
        Errors: action.payload,
      }
    case 'GLOBAL-SET-ERROR-TRUE':
      return {
        ...state,
        Errors: true,
      }
    default:
      return state
  }
}

export let SetGlobalErrors = (payload) => ({type: 'GLOBAL-SET-ERROR', payload})
export let SetGlobalErrorsTrue = () => ({type: 'GLOBAL-SET-ERROR-TRUE'})
