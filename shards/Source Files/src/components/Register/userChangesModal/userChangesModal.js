import React, {useState} from 'react';
import MyModal from "../../MyModal/MyModal";
import {Button, Form, FormInput} from "shards-react";

const UserChangesModal = ({
                            userControlOpen,
                            controlClose,
                            delUser,
                            changeUserName,
                            setUserNewName,
                            userNewName,
                          }) => {

  let [isUserChangeName, setIsUserChangeName] = useState(true)


  let [nameError, setNameError] = useState('')
  let [lastNameError, setLastNameError] = useState('')
  let blurName = () => {
    if (userNewName.name === '') {
      setNameError('შეიყვანეთ ახალი სახელი')
    }

  }
  let BlurLastName = () => {
    if (userNewName.lastName === '') {
      setLastNameError('შეიყვანეთ ახალი გვარი')
    }
  }
  let userChangeNameInput = () => {
    setIsUserChangeName(v => !v)
  }
  return (
    <MyModal
      open={userControlOpen}
      onClose={controlClose}
      title={'თანამშრომლის წაშლა'}
    >

      <div className={'d-flex'}>

        <Button className={'d-flex bg-primary mr-2'}
                onClick={userChangeNameInput}
        >სახელის შეცვლა</Button>

        <Button className={'bg-danger border-0'}
                onClick={delUser}
        >წაშლა</Button>

      </div>

      {isUserChangeName === true

        && <Form>
          <FormInput
            type="text"
            placeholder={'სახელი'}
            className={'mt-2'}
            value={userNewName.name}
            onChange={(e) => {
              setUserNewName({
                ...userNewName,
                name: e.target.value
              })
              setNameError('')
            }}
            onBlur={blurName}
          />

          <label style={{color: 'red'}}>{nameError}</label>
          <FormInput
            type="text"
            placeholder={'გვარი'}
            value={userNewName.lastName}
            onChange={(e) => {
              setUserNewName({
                ...userNewName,
                lastName: e.target.value,
              })
              setLastNameError('')

            }}
            onBlur={BlurLastName}

          />
          <label style={{color: 'red'}}>{lastNameError}</label>
          <br/>
          <Button
            className={'bg-warning border-0'}
            onClick={changeUserName}
            disabled={userNewName.name === '' || userNewName.lastName === ''}
          >
            შეცვლა
          </Button>
        </Form>
      }
    </MyModal>
  );
};

export default UserChangesModal;
