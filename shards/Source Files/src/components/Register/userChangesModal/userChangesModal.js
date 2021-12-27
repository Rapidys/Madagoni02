import React, {useEffect, useState} from 'react';
import MyModal from "../../MyModal/MyModal";
import {Button, Form, FormInput} from "shards-react";
import MySelect from "../../../MySelect/MySelect";
import {useDispatch, useSelector} from "react-redux";
import {getPositions} from "../../../Reducers/PositionsReducer";
import RegisterModalNew from "../registerModalTypes/RegisterModalNew";
import TreeList from "../../CompaignTree/TreeList";

const UserChangesModal = ({
                            userControlOpen,
                            controlClose,
                            delUser,
                            changeUserName,
                            setUserNewName,
                            userNewName,
                            changePositionName,
                            PositionValue,
                            setPositionValue,
                            getPositionReferenceId,
                            userAppointment,
                            userInfoForAppoinment,
                            setUserControlOpen,

                          }) => {

  let [isUserChangeName, setIsUserChangeName] = useState(true)
  let [userPosition, setUserPosition] = useState(false)
  let [appointment, setAppointment] = useState(false)
  let [nameError, setNameError] = useState('')
  let [lastNameError, setLastNameError] = useState('')
  let Positions = useSelector((state => state.positions.positions))
  let [openTree, setOpenTree] = useState(false)
  let dispatch = useDispatch()
  const [chosenAppointmentDep, setChosenAppointmentDep] = useState([])


  useEffect(() => {
    dispatch(getPositions())
  }, [])


  let setChosenAppointments = (value) => {
    setChosenAppointmentDep([value])
  }


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
    setUserPosition(false)
    setAppointment(false)

  }
  let onUserPositionClose = () => {
    setUserPosition(v => !v)
    setIsUserChangeName(false)
    setAppointment(false)
  }
  let onAppointmentClose = () => {
    setAppointment(v => !v)
    setIsUserChangeName(false)
    setUserPosition(false)
  }
  let onPositionChange = (e) => {
    setPositionValue(e.target.value)
    getPositionReferenceId(e.target.selectedIndex)

  }
  let closeTree = () => {
    setOpenTree(v => !v)
  }
  let handleMiniDepartmentDree = () => {
    setOpenTree(true)
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
        <Button className={'d-flex bg-primary mr-2'}
                onClick={onAppointmentClose}
        >გადანიშვნა</Button>
        <Button className={'bg-danger border-0 '}
                onClick={delUser}
        >წაშლა</Button>
      </div>
      {
        userPosition === true &&

        <Form>
          <div className={'mt-2 mb-2'}>
            <MySelect
              defaultValue={'თანამდებობები'}
              options={Positions}
              onChange={onPositionChange}
              value={PositionValue}
            />
          </div>

          <Button
            className={'bg-warning border-0'}
            onClick={changePositionName}

          >
            შეცვლა
          </Button>
        </Form>

      }
      {appointment === true

        && <>
          <RegisterModalNew
            addUser={userAppointment}
            PositionValue={PositionValue}
            setPositionValue={setPositionValue}
            getPositionReferenceId={getPositionReferenceId}
            userInfoForAppoinment={userInfoForAppoinment}
            handleMiniDepartmentDree={handleMiniDepartmentDree}
            chosenAppointmentDep={chosenAppointmentDep}
            setUserControlOpen={setUserControlOpen}
            forAppointment={true}
            userAppointment = {userAppointment}

          />

          <MyModal
            open={openTree}
            onClose={closeTree}
            maxWidth={'sm'}
          >
            <TreeList
              isAppointment = {true}
              setChosenAppointments = {setChosenAppointments}
              setOpenTree={setOpenTree}
              userInfoForAppoinment = {userInfoForAppoinment}
              userAppointment={userAppointment}

            />
          </MyModal>

        </>

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
