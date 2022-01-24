import API from "../API/ApiBase";

let initialState = {
  ProfileInfo: {},
  signatureDefaultValue: '',
  setSignature: {},
}

let setProfileInfo = 'SET-PROFILE-INFO'
let setSignatureDefaultValue = 'SET-SIGNATURE-VALUE'
let onSignatureValueChange = 'SET-SIGNATURE-CHANGE'
let setSignature = 'SET-SIGNATURE'


let ProfileInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case setProfileInfo :
      return {
        ...state,
        ProfileInfo: action.info
      }
    case setSignature :
      return {
        ...state,
        setSignature: action.signature,

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
export let setSignatureAC = (signature) => ({type: setSignature, signature})

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
export let setNewSignature = (signature) => {
  return dispatch => {
    try {
      API.setSignature(signature).then(response => {
        dispatch(setSignatureAC(signature))
      })
    } catch (e) {
      console.log(e)
    }
  }
}



