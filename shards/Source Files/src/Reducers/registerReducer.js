import API from "../API/ApiBases";

let initialState = {
  newUser: {},
  newTree:[],

}
let setUser = 'EMAIL'
let setNewTree = 'NEW-TREE'
let registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case setUser :
      return {
        ...state,
        newUser: action.user
      }
      case setNewTree :
      return {
        ...state,
        newTree: action.newTree
      }
    default:
      return state
  }
}

export let setUserAC = (user) => ({type: setUser, user})
export let setNewTreeAC = (newTree) => ({type: setNewTree, newTree})


export let setNewUser = (newUser) => {
  return dispatch => {
    API.registerUser(newUser)
      .then(response => {
        dispatch(setUserAC(newUser))
      })
  }
}
export default registerReducer
