import React from 'react';
import {Formik} from "formik";
import {Button, Form, FormInput} from "shards-react";
import * as yup from "yup";

const RegisterModalNew = ({Type, addUser}) => {
  let validationSchema = yup.object().shape({
    name: yup.string().required('შეიყვანეთ სახელი'),
    lastName: yup.string().required('შეიყვანეთ გვარი'),
    email: yup.string().email('შეიყვანეთ ელ-ფოსტა').required('აუცილებელი ველი')
  })
  return (
    <div>
      {
        Type === 'ახალი თანამშრომელი'
        &&
        <Formik
          initialValues={{
            name: '',
            lastName: '',
            email: ''
          }}
          validateOnBlur
          onSubmit={(values => {
            addUser(values)
          })}
          validationSchema={validationSchema}
        >
          {({
              values, handleSubmit, handleBlur, errors,
              dirty, handleChange, touched, isValid
            }) => (
            <Form className={'mt-2'}>
              <FormInput
                type="text"
                placeholder={'სახელი'}
                name='name'
                className={'name'}
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.name && errors.name &&
                <label style={{color: 'red'}}>{errors.name}</label>

              }
              <FormInput
                type="text" placeholder={'გვარი'}
                name='lastName'
                className={'lastName mt-2'}
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.lastName && errors.lastName &&
                <label style={{color: 'red'}}>{errors.lastName}</label>

              }
              <FormInput
                type="text" placeholder={'ელ-ფოსტა'}
                name='email'
                id='#email'
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className={'email mt-2'}
              />
              {touched.email && errors.email &&
                <label style={{color: 'red'}}>{errors.email}</label>

              }
              <br/>
              <Button className={'mt-3'}
                      onClick={handleSubmit}
                      disabled={!isValid || !dirty}
              >
                დამატება
              </Button>
            </Form>
          )
          }
        </Formik>


      }
    </div>
  );
};

export default RegisterModalNew;
