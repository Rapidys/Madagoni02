import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {PrivacyRoutes, PublicRoutes} from "../routes";
import withTracker from "../withTracker";
import {connect} from "react-redux";
import {LoadingAC, setIsAuth} from "../Reducers/AuthReducer";
import Preloader from "../Preloader/Preloader";


const AppRouter = (props) => {

  useEffect(() => {
    props.setIsLoading(false)
    if (localStorage.getItem('token')) {
      props.setIsAuth(true)
    }
  }, [])

  if (props.isLoading) {
    return <Preloader/>
  }

  return (


    props.isAuth

      ?

      <Switch>
        {PrivacyRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          );
        })}
        <Redirect to='/blog-overview'/>


      </Switch>
      :
      <Switch>
        {PublicRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          );
        })}
        <Redirect to='/login'/>
      </Switch>


  )
};
let MapStateToProps = (state) => ({
  isAuth: state.Auth.isAuth,
  isLoading: state.Auth.isLoading
})
let MapDispatchToProps = (dispatch) => {
  return {
    setIsAuth: (setAuth) => {
      dispatch(setIsAuth(setAuth))
    },
    setIsLoading: (loading) => {
      dispatch(LoadingAC(loading))
    }
  }
}
let AppRouterContainer = connect(MapStateToProps, MapDispatchToProps)(AppRouter)

export default AppRouterContainer;
