import React, {useEffect} from 'react';
import {Button, Card, CardBody, Form, FormGroup, FormInput} from "shards-react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {login, setErrorAC} from "../../Reducers/AuthReducer";
import {Formik} from "formik";
import * as yup from 'yup'
import {Link} from "react-router-dom";

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
    password: yup.string().typeError('უნდა იყოს ციფრები').required('შეიყვანეთ პაროლი')
  })


  let errorMessage = useSelector((state => state.Auth.errorMessage))
  let dispatch = useDispatch()

  return (
    <Styles>
      <div className={'test'}>
        <Card className="loginWrapper mt-5">

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
                  {errors.email &&
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
                    {errors.password &&
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
