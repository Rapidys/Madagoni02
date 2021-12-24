// import React from 'react';
// import {Formik} from "formik";
// import {Button, Form, FormInput} from "shards-react";
// import MySelect from "../../../MySelect/MySelect";
//
// const UserAppointment = () => {
//   return (
//     <div>
//       {
//         Type === 'ახალი თანამშრომელი'
//         &&
//         <Formik
//           initialValues={{
//             name: '',
//             lastName: '',
//             email: '',
//             mobile: '',
//             position: ''
//
//           }}
//           validateOnBlur
//           onSubmit={(values => {
//             addUser(values)
//           })}
//           validationSchema={validationSchema}
//         >
//           {({
//               values, handleSubmit, handleBlur, errors,
//               dirty, handleChange, touched, isValid
//             }) => (
//             <Form className={'mt-2'}>
//               <FormInput
//                 type="text"
//                 placeholder={'სახელი'}
//                 name='name'
//                 className={'name'}
//                 value={values.name}
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//               />
//               {touched.name && errors.name &&
//                 <label style={{color: 'red'}}>{errors.name}</label>
//
//               }
//               <FormInput
//                 type="text" placeholder={'გვარი'}
//                 name='lastName'
//                 className={'lastName mt-2'}
//                 value={values.lastName}
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//               />
//               {touched.lastName && errors.lastName &&
//                 <label style={{color: 'red'}}>{errors.lastName}</label>
//
//               }
//               <FormInput
//                 type="text" placeholder={'ელ-ფოსტა'}
//                 name='email'
//                 id='#email'
//                 value={values.email}
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 className={'email mt-2'}
//               />
//               {touched.email && errors.email &&
//                 <label style={{color: 'red'}}>{errors.email}</label>
//
//               }
//               <FormInput
//                 type="text" placeholder={'მობ.ნომერი'}
//                 name='mobile'
//                 id='#mobile'
//                 value={values.mobile}
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 className={'mt-2'}
//               />
//               {touched.mobile && errors.mobile &&
//                 <label style={{color: 'red'}}>{errors.mobile}</label>
//
//               }
//               <div className={'mt-2'}>
//                 <MySelect
//                   defaultValue={'თანამდებობები'}
//                   options={Positions}
//                   onChange={onPositionChange}
//                   value={PositionValue}
//
//                 />
//               </div>
//
//               <Button className={'mt-3'}
//                       onClick={handleSubmit}
//                       disabled={!isValid || !dirty}
//               >
//                 დამატება
//               </Button>
//             </Form>
//           )
//           }
//         </Formik>
//
//
//       }
//     </div>
//   );
// };
//
// export default UserAppointment;
