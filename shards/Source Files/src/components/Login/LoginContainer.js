import React from 'react';
import Login from "./Login";
import {connect} from "react-redux";
import {login} from "../../Reducers/AuthReducer";

let MapStateToProps = (state) => ({
  isAuth: state.Auth.isAuth
})

let MapDispatchToProps = (dispatch) => {
  return {
    setIsAuth: (email, password) => {
      dispatch(login(email, password))
    }
  }
}

const LoginContainer = connect(MapStateToProps, MapDispatchToProps)(Login)


export default LoginContainer
