import API from "../API/ApiBase";

let initialState = {
  newUser: {},

}
let setUser = 'EMAIL'
let registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case setUser :
      return {
        ...state,
        newUser: action.user
      }
  }
}

export let setUserAC = (user) => ({type: setUser, user})


export let setNewUser = (newUser) => {
  return dispatch => {
    API.registerUser(newUser)
      .then(response => {
        dispatch(setUserAC(newUser))
      })
  }
}
export default registerReducer
