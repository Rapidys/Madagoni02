import React from 'react';
import MyModal from "../MyModal/MyModal";
import {Button, Form, FormInput} from "shards-react";
import MySelect from "../../MySelect/MySelect";

const RegisterModal = ({
                         values,
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
  return (
    <MyModal
      open={open}
      onClose={onClose}
      title = {'აირჩიეთ ქმედება'}
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
        && <Form className={'mt-2'}>
          <FormInput
            type="text"
            placeholder={'სახელი'}
            value={values.name}
            onChange={(e) => {
              setValues({...values, name: e.target.value})
            }}
          />
          <FormInput
            type="text" placeholder={'გვარი'}
            className={'mt-2'}
            value={values.lastName}
            onChange={(e) => {
              setValues({...values, lastName: e.target.value})
            }}
          />
          <FormInput
            type="text" placeholder={'ელ-ფოსტა'}
            className={'mt-2'}
            value={values.email}
            onChange={(e) => {
              setValues({...values, email: e.target.value})
            }}
          />
          <br/>
          <Button className={'mt-3'}

                  onClick={addUser}
          >
            დამატება
          </Button>
        </Form>


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
            }}
          /><br/>
          <Button className={'mt-3'}
                  onClick={addUser}
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
