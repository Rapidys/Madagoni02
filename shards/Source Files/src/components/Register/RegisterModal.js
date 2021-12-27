import React from 'react';
import MyModal from "../MyModal/MyModal";
import {Button, Form} from "shards-react";
import MySelect from "../../MySelect/MySelect";

import RegisterModalNew from "./registerModalTypes/RegisterModalNew";
import RegisterNewDep from "./registerModalTypes/RegisterNewDep";
import ChangeNames from "./registerModalTypes/changeNames";

const RegisterModal = ({
                         onClose,
                         addUser,
                         open,
                         setType,
                         Type,
                         setDepValues,
                         depValues,
                         deleteDepOrUser,
                         changeDepName,
                         changedDepNames,
                         setChangedDepNames,
                         PositionValue,
                         setPositionValue,
                         getPositionReferenceId,
                         userAppointment

                       }) => {

  let onSortChange = (e) => {
    setType(e.target.value)
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
          {id: 3, displayName: 'სახელის შეცვლა'},
          {id: 4, displayName: 'წაშლა'},
        ]}
        defaultValue={'აირჩიეთ'}
        onChange={onSortChange}
        value={Type}
      />
      {
        Type === 'ახალი თანამშრომელი'
        &&
        <RegisterModalNew
          addUser={addUser}
          PositionValue={PositionValue}
          setPositionValue={setPositionValue}
          getPositionReferenceId={getPositionReferenceId}
          forAppointment = {false}
          userAppointment = {userAppointment}

        />

      }
      <RegisterNewDep
        Type={Type}
        addUser={addUser}
        depValues={depValues}
        setDepValues={setDepValues}
      />
      <ChangeNames
        Type={Type}
        changedDepNames={changedDepNames}
        setChangedDepNames={setChangedDepNames}
        changeDepName={changeDepName}

      />


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
