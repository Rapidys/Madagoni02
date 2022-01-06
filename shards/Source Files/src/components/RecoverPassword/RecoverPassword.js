import React, {useState} from 'react';
import {Button, Card, CardBody, Form, FormGroup, FormInput} from "shards-react";
import {Formik} from "formik";
import styled from "styled-components";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import API from "../../API/ApiBase";
import MyModal from "../MyModal/MyModal";

let Styles = styled.div`

  .test {
    margin-top: 150px;
  }

  .loginWrapper {
    max-width: 400px;
    margin: auto;

  }
`
const RecoverPassword = () => {
  let validationSchema = yup.object().shape({
    email: yup.string().email('შეიყვანეთ ელ-ფოსტა').required('შეიყვანეთ ელ-ფოსტა'),
    // password: yup.string().typeError('უნდა იყოს ციფრები').required('შეიყვანეთ პაროლი'),
    // confirmPassword: yup.string().oneOf([yup.ref('password')], 'პაროლები არ ემთხვევა')
  })

  let [isSendedPassword, setIsSendedPassword] = useState(false)

  let dispatch = useDispatch()
  let onClose = () => {
    setIsSendedPassword(v => !v)
  }
  return (
    <Styles>
      <div className={'test'}>
        <Card className="loginWrapper mt-5">
          <MyModal
            open={isSendedPassword}
            onClose={onClose}
            maxWidth={'sm'}
            title={'პაროლის აღდგენამ წარმატებით ჩაიარა'}
          >
            ახალი პაროლი იხილეთ მეილზე
          </MyModal>
          <CardBody>
            <Formik
              initialValues={{
                email: '',
              }}
              validateOnBlur
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values)
                API.passwordRecovery(values.email).then(response => {
                  setIsSendedPassword(true)
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
                  {touched.email && errors.email &&
                    <span className={'text-danger'}>{errors.email}</span>}
                  {/*<FormGroup>*/}
                  {/*  <label htmlFor="#password">პაროლი</label>*/}
                  {/*  <FormInput type="password"*/}
                  {/*             id="#password"*/}
                  {/*             placeholder="პაროლი"*/}
                  {/*             name='password'*/}
                  {/*             value={values.password}*/}
                  {/*             onChange={handleChange}*/}
                  {/*             onBlur={handleBlur}*/}
                  {/*  />*/}
                  {/*  {touched.password && errors.password &&*/}
                  {/*    <span className={'text-danger'}>{errors.password}</span>}*/}
                  {/*</FormGroup>*/}

                  {/*<FormGroup>*/}
                  {/*  <label htmlFor="#confirmPassword">გაიმეორეთ პაროლი</label>*/}
                  {/*  <FormInput type="password"*/}
                  {/*             id="#confirmPassword"*/}
                  {/*             placeholder="გაიმეორეთ პაროლი"*/}
                  {/*             name='confirmPassword'*/}
                  {/*             value={values.confirmPassword}*/}
                  {/*             onChange={handleChange}*/}
                  {/*             onBlur={handleBlur}*/}
                  {/*  />*/}
                  {/*  {touched.confirmPassword && errors.confirmPassword &&*/}
                  {/*    <span*/}
                  {/*      className={'text-danger'}>{errors.confirmPassword}</span>}*/}
                  {/*</FormGroup>*/}
                  <div className={'mt-3'}
                  >
                    <Button theme="secondary"
                            onClick={handleSubmit}
                    >
                      აღდგენა
                    </Button>
                    <Link to='/login' className={'ml-2'}>
                      შესვლა
                    </Link>
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

export default RecoverPassword;
