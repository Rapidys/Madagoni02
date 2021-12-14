let initialState = {
  DestinationIdInfo: []
}

let destinationValueInfo = (state = initialState, action) => {

  switch (action.type) {
    case 'SET-DATA': {
      return {
        ...state,
        destinationValueInfo: action.destination
      }
    }
    default:
      return state
  }
}

export let destinationValueInfoAC = (destination) => ({
  type: 'SET-DATA',
  destination
})


export default destinationValueInfo
