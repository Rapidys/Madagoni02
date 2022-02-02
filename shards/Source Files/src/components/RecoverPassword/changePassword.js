import React, {useState} from 'react';
import {Button, Card, CardBody, Form, FormGroup, FormInput} from "shards-react";
import {Formik} from "formik";
import styled from "styled-components";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import API from "../../API/ApiBase";
import {isChangedAC, isLoadingAC} from "../../Reducers/changePasswordReducer";
import Preloader from "../../Preloader/Preloader";

let Styles = styled.div`

  .test {
    margin-top: 150px;
  }

  .loginWrapper {
    max-width: 400px;
    margin: auto;

  }
`
const ChangePassword = () => {
  let validationSchema = yup.object().shape({
    password: yup.string().typeError('უნდა იყოს ციფრები').required('შეიყვანეთ პაროლი'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'პაროლები არ ემთხვევა')
  })

  let [redirectWhileChangePass, setRedirectWhileChangePass] = useState(false)
  let dispatch = useDispatch()
  let isLoading = useSelector((state => state.changePassword.isLoading))

  let Params = useParams()

  if (redirectWhileChangePass === true) {
    return <Redirect to='/login'/>
  }

  return (
    <Styles>
      <div className={'test'}>
        <Card className="loginWrapper mt-5">
          {
            isLoading && <Preloader/>
          }
          <CardBody>
            <Formik
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              validateOnBlur
              validationSchema={validationSchema}
              onSubmit={(values) => {
                dispatch(isLoadingAC(true))

                API.passwordChange({
                  RecoveryGuid: Params.id,
                  NewPassword: values.password
                }).then(response => {
                  setRedirectWhileChangePass(true)
                  dispatch(isLoadingAC(false))
                  dispatch(isChangedAC(true))
                })
              }}

            >
              {({
                  values, touched, handleBlur,
                  handleSubmit, handleChange, errors, isValid
                }) => (
                <Form className="m-auto"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmit();
                        }
                      }}
                >
                  <FormGroup>
                    <label htmlFor="#password">პაროლი</label>
                    <FormInput type="password"
                               id="#password"
                               placeholder="პაროლი"
                               name='password'
                               value={values.password}
                               onChange={handleChange}
                               onBlur={handleBlur}
                    />
                    {touched.password && errors.password &&
                      <span className={'text-danger'}>{errors.password}</span>}
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="#confirmPassword">გაიმეორეთ პაროლი</label>
                    <FormInput type="password"
                               id="#confirmPassword"
                               placeholder="გაიმეორეთ პაროლი"
                               name='confirmPassword'
                               value={values.confirmPassword}
                               onChange={handleChange}
                               onBlur={handleBlur}
                    />
                    {touched.confirmPassword && errors.confirmPassword &&
                      <span
                        className={'text-danger'}>{errors.confirmPassword}</span>}
                  </FormGroup>
                  <div className={'mt-3'}
                  >
                    <Button theme="secondary"
                            onClick={handleSubmit}
                    >
                      შეცვლა
                    </Button>

                  </div>

                </Form>
              )

              }
            </Formik>

          </CardBody>

        </Card>
      </div>

    </Styles>
  );
};

export default ChangePassword;
