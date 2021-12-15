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
                         setChangedDepNames
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
      <RegisterModalNew Type={Type}
                        addUser={addUser}/>


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
