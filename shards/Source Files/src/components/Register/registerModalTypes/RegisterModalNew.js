import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import {Button, Form, FormInput} from "shards-react";
import * as yup from "yup";
import MySelect from "../../../MySelect/MySelect";
import {useDispatch, useSelector} from "react-redux";
import {getPositions, setPositionsAC} from "../../../Reducers/PositionsReducer";
import {TreeDataAC} from "../../../Reducers/TreeDataReducer";

const RegisterModalNew = ({
                            addUser, PositionValue,
                            setPositionValue,
                            getPositionReferenceId,
                            userInfoForAppoinment,
                            handleMiniDepartmentDree,
                            chosenAppointmentDep,
                            setUserControlOpen,
                            forAppointment,
                            setAppointmentInformation,
                            userChanges,
                            onPositionChange
                          }) => {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPositions())
  }, [])
  let Positions = useSelector((state => state.positions.positions))

  let validationSchema = yup.object().shape({
    name: yup.string().required('შეიყვანეთ სახელი'),
    lastName: yup.string().required('შეიყვანეთ გვარი'),
    email: yup.string().email('შეიყვანეთ ელ-ფოსტა').required('აუცილებელი ველი'),
    mobile: yup.string().required('შეიყვანეთ მობ.ნომერი'),
  })


  return (
    <div>

      <Formik
        initialValues={{
          name: userInfoForAppoinment.firstName ? userInfoForAppoinment.firstName : '',
          lastName: userInfoForAppoinment.lastName ? userInfoForAppoinment.lastName : '',
          email: userInfoForAppoinment.email  ? userInfoForAppoinment.email : '',
          mobile: userInfoForAppoinment.phone ? userInfoForAppoinment.phone : '',
          position: userInfoForAppoinment.position ? userInfoForAppoinment.position : '',
          positionid: userInfoForAppoinment.positionid ? userInfoForAppoinment.positionid : '',

        }}
        validateOnBlur
        onSubmit={(values => {
          addUser(values)
          setUserControlOpen(false)
          if (forAppointment === true) {
            handleMiniDepartmentDree(true)
            setUserControlOpen(true)
            setAppointmentInformation(values)
          }
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
            <FormInput
              type="text" placeholder={'მობ.ნომერი'}
              name='mobile'
              id='#mobile'
              value={values.mobile || ''}
              onBlur={handleBlur}
              onChange={handleChange}
              className={'mt-2'}
            />
            {touched.mobile && errors.mobile &&
              <label style={{color: 'red'}}>{errors.mobile}</label>

            }
            <div className={'mt-2'}>
              <MySelect
                defaultValue={'თანამდებობები'}
                options={Positions}
                onChange={onPositionChange}
                value={PositionValue}


              />

            </div>

            <div className={'mt-2'}>
              {!userChanges && chosenAppointmentDep &&
                <span>არჩეულია დეპარტამენტი : <p
                  className={'text-danger'}>{chosenAppointmentDep}</p></span>
              }
            </div>
            {userChanges === false
              ? <Button className={'mt-3'}
                        onClick={handleSubmit}
                        disabled={!isValid }
              >
                დამატება
              </Button>
              : <Button className={'mt-3 btn-warning'}
                        onClick={handleSubmit}
                        disabled={!isValid }

              >
                შეცვლა
              </Button>
            }


          </Form>
        )
        }
      </Formik>

    </div>
  );
};

export default RegisterModalNew;
