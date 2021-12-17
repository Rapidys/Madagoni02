import API from "../API/ApiBase";

let initialState = {
  isAuth: false,
  currentUser: {},
  email: '',
  password: '',
  isLoading: true,
  token: null,
}
const Loading = 'SETLOADING'
const Token = 'TOKEN'
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
        }

      })

    } catch (e) {
      console.log(e)
    }
  }
}
