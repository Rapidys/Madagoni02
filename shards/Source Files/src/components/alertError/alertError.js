import React, {useEffect} from 'react';
import {Alert} from "@mui/material";
import {SetGlobalErrors} from "../../Reducers/errors/ErrorsReducer";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const AlertError = () => {

  let Errors = useSelector((state => state.Errors.Errors))
  let history = useHistory()
  let url = history.location.pathname
  let dispatch = useDispatch()

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(SetGlobalErrors(false))
    }, 5000);

    return () => clearInterval(interval);
  }, [])


  return (
    <div>
      {
        Errors &&

        <div
          className={`alert position-fixed`}
          role="alert"
          style={{
            zIndex: 999999,
            right: '0px',
            top: url === '/login' ? '20px' : '60px',
            transition:'0.5s'
          }}
        >
          <div className={'d-flex justify-content-between text-danger'}>
            <Alert severity="error"
                   action={
                     <i className="far fa-times-circle mt-2"
                        onClick={() => {
                          dispatch(SetGlobalErrors(false))
                        }}
                     />
                   }
            >შეცდომა !!!</Alert>

          </div>
        </div>

      }
    </div>
  );
};

export default AlertError;
