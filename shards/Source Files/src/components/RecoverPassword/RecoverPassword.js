import React, {useState} from 'react';
import {Button, Card, CardBody, Form, FormGroup, FormInput} from "shards-react";
import {Formik} from "formik";
import styled from "styled-components";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import API from "../../API/ApiBase";
import MyModal from "../MyModal/MyModal";
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
const RecoverPassword = () => {
  let validationSchema = yup.object().shape({
    email: yup.string().email('შეიყვანეთ ელ-ფოსტა').required('შეიყვანეთ ელ-ფოსტა'),
  })

  let [isSendedPassword, setIsSendedPassword] = useState(false)
  let [isLoading, setIsLoading] = useState(false)

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
            title={'შეტყობინება'}

          >
            შეამოწმეთ ელ-ფოსტა
          </MyModal>
          {isLoading && <Preloader/>}
          <CardBody>
            <Formik
              initialValues={{
                email: '',
              }}
              validateOnBlur
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setIsLoading(true)
                API.passwordRecovery(values).then(response => {
                  setIsSendedPassword(true)
                  setIsLoading(false)
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
