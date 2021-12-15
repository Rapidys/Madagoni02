import React, {useState} from 'react';
import MyModal from "../MyModal/MyModal";
import {Button, Form, FormInput} from "shards-react";
import MySelect from "../../MySelect/MySelect";
import {Formik} from "formik";
import * as yup from 'yup'
import {color} from "chart.js/helpers";

const RegisterModal = ({
                         onClose,
                         setValues,
                         addUser,
                         open,
                         setType,
                         Type,
                         setDepValues,
                         depValues,
                         deleteDepOrUser
                       }) => {

  let onSortChange = (e) => {
    setType(e.target.value)
  }
  let [errorForDep, setErrorForDep] = useState('')
  let validationSchema = yup.object().shape({
    name: yup.string().required('აუცილებელი ველი'),
    lastName: yup.string().required('აუცილებელი ველი'),
    email: yup.string().email('შეიყვანეთ ელ-ფოსტა').required('აუცილებელი ველი')
  })
  let blur = () => {
    if (depValues.name === '') {
      setErrorForDep('შეიყვანეთ დეპარტამენტის სახელი')
    }
  }
  return (
    <MyModal
      open={open}
      onClose={onClose}
      title={'აირჩიეთ ქმედება'}
    >
      <MySelect
        options={[
          {id: 1, displayName: 'ახალი თანამშრომელი',},
          {id: 2, displayName: 'ახალი დეპარტამენტი'},
          {id: 3, displayName: 'წაშლა'},
        ]}
        defaultValue={'აირჩიეთ'}
        onChange={onSortChange}
        value={Type}
      />
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
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.name &&
                <label style={{color: 'red'}}>{errors.name}</label>

              }
              <FormInput
                type="text" placeholder={'გვარი'}
                name='lastName'
                className={'mt-2'}
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.lastName &&
                <label style={{color: 'red'}}>{errors.lastName}</label>

              }
              <FormInput
                type="text" placeholder={'ელ-ფოსტა'}
                name='email'
                id='#email'
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className={'mt-2'}
              />
              {errors.email &&
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
      {
        Type === 'ახალი დეპარტამენტი'
        && <Form>
          <FormInput
            type="text"
            placeholder={'სახელი'}
            value={depValues.name}
            className={'mt-2'}
            onChange={(e) => {
              setDepValues({...depValues, name: e.target.value})
              setErrorForDep('')
            }}
            onBlur={blur}
          />

          <label style={{color: 'red'}}>{errorForDep}</label>
          <br/>
          <Button className={'mt-3'}
                  onClick={addUser}
                  disabled={depValues.name === '' && true}
          >
            დამატება
          </Button>
        </Form>
      }
      {
        Type === 'წაშლა'
        &&
        <Form>
          <Button className={'bg-danger mt-3'}
                  onClick={deleteDepOrUser}
          >
            წაშლა
          </Button>
        </Form>

      }
    </MyModal>
  );
};

export default RegisterModal;
