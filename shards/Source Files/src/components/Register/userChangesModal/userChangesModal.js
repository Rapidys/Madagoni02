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
                            positonName,
                            setPositonName,
                            changePositionName

                          }) => {

  let [isUserChangeName, setIsUserChangeName] = useState(true)
  let [userPosition, setUserPosition] = useState(false)

  let [nameError, setNameError] = useState('')
  let [lastNameError, setLastNameError] = useState('')
  let [positionError, setPositionError] = useState('')


  let blurName = () => {
    if (userNewName.name === '') {
      setNameError('შეიყვანეთ ახალი სახელი')
    }
  }
  let blurPosition = () => {
    if (positonName === '') {
      setPositionError('შეიყვანეთ თანამდებობა')
    }
  }


  let BlurLastName = () => {
    if (userNewName.lastName === '') {
      setLastNameError('შეიყვანეთ ახალი გვარი')
    }
  }
  let userChangeNameInput = () => {
    setIsUserChangeName(v => !v)
    setUserPosition(false)
  }
  let onUserPositionClose = () => {
    setUserPosition(v => !v)
    setIsUserChangeName(false)
  }
  return (
    <MyModal
      open={userControlOpen}
      onClose={controlClose}
      title={'რედაქტირება'}
    >

      <div className={'d-flex'}>

        <Button className={'d-flex bg-primary mr-2'}
                onClick={userChangeNameInput}
        >სახელის შეცვლა</Button>
        <Button className={'d-flex bg-primary mr-2'}
                onClick={onUserPositionClose}
        >თანამდებობა</Button>
        <Button className={'bg-danger border-0 '}
                onClick={delUser}
        >წაშლა</Button>
      </div>
      {
        userPosition === true &&

        <Form>
          <FormInput
            type="text"
            placeholder={'თანამდებობა'}
            className={'mt-2'}
            value={positonName}
            onChange={(e) => {
              setPositonName(e.target.value)
            }}
            onBlur={blurPosition}
          />

          <label style={{color: 'red'}}>{positionError}</label>
          <br/>
          <Button
            className={'bg-warning border-0'}
            onClick={changePositionName}
            disabled={positonName === '' && true}

          >
            შეცვლა
          </Button>
        </Form>

      }
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
