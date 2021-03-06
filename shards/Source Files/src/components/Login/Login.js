import React, {useEffect} from 'react';
import {Button, Card, CardBody, Form, FormGroup, FormInput} from "shards-react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {login, setErrorAC} from "../../Reducers/AuthReducer";
import {Formik} from "formik";
import * as yup from 'yup'
import {Link} from "react-router-dom";
import MyModal from "../MyModal/MyModal";
import {isChangedAC} from "../../Reducers/changePasswordReducer";

let Styles = styled.div`

  .test {
    margin-top: 150px;
  }

  .loginWrapper {
    max-width: 400px;
    margin: auto;

  }
`

const Login = () => {


  let validationSchema = yup.object().shape({
    email: yup.string().email('შეიყვანეთ ელ-ფოსტა').required('შეიყვანეთ ელ-ფოსტა'),
    password: yup.string().typeError('').required('შეიყვანეთ პაროლი')
  })


  let errorMessage = useSelector((state => state.Auth.errorMessage))
  let isChangedPass = useSelector((state => state.changePassword.isChanged))
  let dispatch = useDispatch()
  let onClose = () => {
    dispatch(isChangedAC(false))
  }
  return (
    <Styles>
      <div className={'test'}>
        <Card className="loginWrapper mt-5">
          <MyModal
            open={isChangedPass}
            onClose={onClose}
            maxWidth={'sm'}
            title={'შეტყობინება'}
          >
            <i className="fas fa-check-circle"
               style={{color: 'green', fontSize: '30px'}}/>
            <span
              className={"ml-2"}>წარმატებით შეიცვალა</span>
          </MyModal>
          <CardBody>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validateOnBlur
              validationSchema={validationSchema}
              onSubmit={(values) => {
                dispatch(login(values.email, values.password))
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
                  <FormGroup className={'mb-0'}>
                    <label htmlFor="#username">ელ-ფოსტა</label>
                    <FormInput id="#username"
                               placeholder="ელ-ფოსტა"
                               name='email'
                               value={values.email}
                               onChange={handleChange}
                               onBlur={handleBlur}
                    />
                  </FormGroup>
                  {errors.email && touched.email &&
                    <span className={'text-danger'}>{errors.email}</span>}
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
                    {errors.password && touched.password &&
                      <span className={'text-danger'}>{errors.password}</span>}
                  </FormGroup>
                  {
                    errorMessage === true &&
                    <p style={{color: 'red'}}>
                      ელ-ფოსტა ან პაროლი არასწორია
                    </p>
                  }
                  <Button theme="secondary"
                          onClick={handleSubmit}

                  >
                    შესვლა
                  </Button>
                  <Link to='/RecoverPassword' className={'ml-2'}>
                    პაროლის აღდგენა
                  </Link>
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

export default Login;
