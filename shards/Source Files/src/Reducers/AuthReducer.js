import API from "../API/ApiBase";

let initialState = {
  isAuth: false,
  currentUser: {},
  email: '',
  password: '',
  isLoading: true,
  token: null,
  errorMessage: false,
}
const Loading = 'SETLOADING'
const Token = 'TOKEN'
const setERROR = 'SET-ERROR'
let AuthReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET-AUTH': {
      return {
        ...state,
        isAuth: action.setAuth
      }
    }
    case 'SET-USER': {
      return {
        ...state,
        currentUser: action.payload,
      }

    }

    case 'LogOut': {
      localStorage.removeItem('token')

      return {
        ...state,
        currentUser: {},
        isAuth: false,

      }
    }
    case Loading: {
      return {
        ...state,
        isLoading: action.loading
      }
    }
    case Token: {
      return {
        ...state,
        token: action.tok
      }
    }
    case setERROR : {
      return {
        ...state,
        errorMessage: action.error
      }
    }


    default:
      return state
  }

}
export default AuthReducer

export let setIsAuth = (setAuth) => ({type: 'SET-AUTH', setAuth})
export let Logout = () => ({type: 'LogOut'})
export let setUser = (user) => ({type: "SET-USER", payload: user})
export let LoadingAC = (loading) => ({type: Loading, loading})
export let TokenAC = (tok) => ({type: Token, tok})
export let setErrorAC = (error) => ({type: setERROR, error})

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(LoadingAC(true))
    try {
      API.AuthAPI(email, password)
        .then(response => {

          dispatch(setUser({email, password}))
          if (!response) {
            dispatch(LoadingAC(false))
            dispatch(setIsAuth(false))
          }
          if (response && response.data) {
            localStorage.setItem('token', response.data.token)
            API.assignToken()
            dispatch(setIsAuth(true))
            dispatch(TokenAC(response.data.token))
            dispatch(LoadingAC(false))
          }

        }).catch(function (error) {
        if (error && error.response.status === 403) {
          dispatch(LoadingAC(false))
          dispatch(setIsAuth(false))
          dispatch(setErrorAC(true))
        }

      })

    } catch (e) {
      console.log(e)
    }
  }
}
