import API from "../API/ApiBase";

let initialState = {
  ProfileInfo: {},
}

let setProfileInfo = 'SET-PROFILE-INFO'


let ProfileInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case setProfileInfo :
      return {
        ...state,
        ProfileInfo: action.info
      }

    default:
      return state
  }
}

export let setProfileInfoAC = (info) => ({type: setProfileInfo, info})

export default ProfileInfoReducer

export let GetProfileInfo = () => {
  return dispatch => {
    try {
      API.ProfileInfo().then(response => {
        dispatch(setProfileInfoAC(response.data))
      })
    } catch (e) {
      console.log(e)
    }
  }
}



