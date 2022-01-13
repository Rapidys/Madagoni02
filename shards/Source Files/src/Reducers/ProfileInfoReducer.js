import API from "../API/ApiBase";

let initialState = {
  ProfileInfo: {},
  signatureDefaultValue: ''
}

let setProfileInfo = 'SET-PROFILE-INFO'
let setSignatureDefaultValue = 'SET-SIGNATURE-VALUE'
let onSignatureValueChange = 'SET-SIGNATURE-CHANGE'


let ProfileInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case setProfileInfo :
      return {
        ...state,
        ProfileInfo: action.info
      }
    case setSignatureDefaultValue :
      return {
        ...state,
        signatureDefaultValue: `პატივისცემით,
${action.department}
${action.position}
${action.firstName} ${action.lastName}`
      }
    case onSignatureValueChange :
      return {
        ...state,
        signatureDefaultValue: state.signatureDefaultValue = action.change
      }
    default:
      return state
  }
}

export let setProfileInfoAC = (info) => ({type: setProfileInfo, info})
export let onSignatureValueChangeAC = (change) => ({
  type: onSignatureValueChange,
  change
})
export let setSignatureDefaultValueAC = ({
                                           department,
                                           position,
                                           firstName,
                                           lastName
                                         }) => ({
  type: setSignatureDefaultValue, department,
  position,
  firstName,
  lastName
})

export default ProfileInfoReducer

export let GetProfileInfo = () => {
  return dispatch => {
    try {
      API.ProfileInfo().then(response => {
        dispatch(setProfileInfoAC(response.data))
        dispatch(setSignatureDefaultValueAC(response.data))
      })
    } catch (e) {
      console.log(e)
    }
  }
}



