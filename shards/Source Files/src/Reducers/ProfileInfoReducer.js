import API from "../API/ApiBases";

let initialState = {
  ProfileInfo: {},
  signatureDefaultValue: '',
  setSignature: {},
  loading: false,
}

let setProfileInfo = 'SET-PROFILE-INFO'
let setSignatureDefaultValue = 'SET-SIGNATURE-VALUE'
let onSignatureValueChange = 'SET-SIGNATURE-CHANGE'
let setSignature = 'SET-SIGNATURE'
let setLoadingProfile = 'SET-LOADING-PROFILE-INFO'


let ProfileInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case setProfileInfo :
      return {
        ...state,
        ProfileInfo: action.info,
        loading: false,
      }
    case setSignature :
      return {
        ...state,
        setSignature: action.signature,
        loading: false,
      }
    case setSignatureDefaultValue :
      return {
        ...state,
        signatureDefaultValue: action.signatureText ? action.signatureText : `პატივისცემით,
${action.department}
${action.position}
${action.firstName} ${action.lastName}`,
        loading: false,
      }
    case onSignatureValueChange :
      return {
        ...state,
        signatureDefaultValue: state.signatureDefaultValue = action.change
      }
    case setLoadingProfile:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

export let setProfileInfoAC = (info) => ({type: setProfileInfo, info})
export let setSignatureAC = (signature) => ({type: setSignature, signature})
export let setLoadingAC = () => ({type: setLoadingProfile})

export let onSignatureValueChangeAC = (change) => ({
  type: onSignatureValueChange,
  change
})
export let setSignatureDefaultValueAC = ({
                                           department,
                                           position,
                                           firstName,
                                           lastName,
                                           signatureText
                                         }) => ({
  type: setSignatureDefaultValue, department,
  position,
  firstName,
  lastName,
  signatureText
})

export default ProfileInfoReducer

export let GetProfileInfo = () => {
  return dispatch => {
    try {
      dispatch(setLoadingAC())
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
      dispatch(setLoadingAC())
      API.setSignature(signature).then(response => {
        dispatch(setSignatureAC(signature))
        dispatch(GetProfileInfo())
      }).catch(error => {
        dispatch(GetProfileInfo())
      })
    } catch (e) {
      console.log(e)
    }
  }
}



