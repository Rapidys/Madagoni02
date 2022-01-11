import React, {useEffect, useState} from 'react';
import MyModal from "../../MyModal/MyModal";
import {Button, Form} from "shards-react";
import MySelect from "../../../MySelect/MySelect";
import {useDispatch, useSelector} from "react-redux";
import {getPositions} from "../../../Reducers/PositionsReducer";
import RegisterModalNew from "../registerModalTypes/RegisterModalNew";
import TreeList from "../../CompaignTree/TreeList";
import defaultValue from '../../../assets/user.png'

const UserChangesModal = ({
                            userControlOpen,
                            controlClose,
                            delUser,
                            changePositionName,
                            PositionValue,
                            setPositionValue,
                            getPositionReferenceId,
                            userAppointment,
                            userInfoForAppoinment,
                            setUserControlOpen,
                            PositionReferenceId,
                            changeUserOptions

                          }) => {

  let [isUserChangeName, setIsUserChangeName] = useState(true)
  let [userPosition, setUserPosition] = useState(false)
  let [appointment, setAppointment] = useState(false)

  let [appointmentInformation, setAppointmentInformation] = useState({})
  let Positions = useSelector((state => state.positions.positions))
  let [openTree, setOpenTree] = useState(false)
  let dispatch = useDispatch()
  const [chosenAppointmentDep, setChosenAppointmentDep] = useState([])
  let [positionId, setPositionId] = useState(null)


  useEffect(() => {
    dispatch(getPositions())
  }, [])


  let setChosenAppointments = (value) => {
    setChosenAppointmentDep([value])
  }


  let userChangeNameInput = () => {
    setIsUserChangeName(v => !v)
    setUserPosition(false)
    setAppointment(false)

  }

  let onAppointmentClose = () => {
    setAppointment(v => !v)
    setIsUserChangeName(false)
    setUserPosition(false)
  }

  let onPositionChange = (e) => {
    let idx = Positions[e.target.selectedIndex - 1]
    setPositionValue(e.target.value)
    getPositionReferenceId(idx.referenceId)

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
      <div className={'d-flex align-items-center'}>
        <img
          src={userInfoForAppoinment.stringPhoto ? userInfoForAppoinment.stringPhoto : defaultValue}
          alt="ProfileImg"
          className="rounded-circle mb-3"
          style={{width: '80px', height: '80px'}}

        />
        <div className={'ml-3'}>
          <h4
            className="mb-0">{`${userInfoForAppoinment.firstName} ${userInfoForAppoinment.lastName}`}</h4>
          <span
            className="text-muted d-block mb-2">{userInfoForAppoinment.position}</span>
        </div>

      </div>

      <div className={'d-flex'}>


        <Button className={'d-flex bg-primary mr-2'}
                onClick={userChangeNameInput}
        >ცვლილება</Button>
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
              id={positionId}
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
            userAppointment={userAppointment}
            setAppointmentInformation={setAppointmentInformation}
            PositionReferenceId={PositionReferenceId}
            userChanges={false}
          />


          <MyModal
            open={openTree}
            onClose={closeTree}
            maxWidth={'sm'}
          >
            <TreeList
              isAppointment={true}
              setChosenAppointments={setChosenAppointments}
              setOpenTree={setOpenTree}
              userInfoForAppoinment={userInfoForAppoinment}
              userAppointment={userAppointment}
              saveChanges={false}
              setUserControlOpen={setUserControlOpen}
              appointmentInformation={appointmentInformation}
              PositionValue={PositionValue}
              PositionReferenceId={PositionReferenceId}
            />
          </MyModal>

        </>

      }
      {isUserChangeName === true

        && <>
          <RegisterModalNew
            addUser={changeUserOptions}
            PositionValue={PositionValue}
            setPositionValue={setPositionValue}
            getPositionReferenceId={getPositionReferenceId}
            userInfoForAppoinment={userInfoForAppoinment}
            handleMiniDepartmentDree={handleMiniDepartmentDree}
            chosenAppointmentDep={chosenAppointmentDep}
            setUserControlOpen={setUserControlOpen}
            forAppointment={false}
            userAppointment={userAppointment}
            setAppointmentInformation={setAppointmentInformation}
            PositionReferenceId={PositionReferenceId}
            userChanges={true}
            changeUserOptions={changeUserOptions}

          />

          <br/>


        </>
      }
    </MyModal>
  );
};

export default UserChangesModal;
