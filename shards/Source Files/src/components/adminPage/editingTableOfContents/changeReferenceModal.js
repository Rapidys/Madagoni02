import React, {useState} from 'react';
import MyModal from "../../MyModal/MyModal";
import MySelect from "../../../MySelect/MySelect";
import {Button, FormInput} from "shards-react";

const ChangeReferenceModal = ({setEditModal, editModal, items, options}) => {

  let onCloseEditModal = () => {
    setEditModal(v => !v)
  }
  let [optionValue, setOptionValue] = useState('')
  let [changeOptions, setChangeOptions] = useState([
    {id: 1, displayName: 'სახელის შეცვლა'},
    {id: 2, displayName: 'წაშლა'}
  ])

  let [newNameOfType, setNewNameOfType] = useState('')
  let handleNameOfType = (e) => {
    setNewNameOfType(e.target.value)
  }
  let onValueChange = (e) => {
    setOptionValue(e.target.value)
  }
  let deleteType = () => {
    items.isActive = false
    setEditModal(false)

  }
  let changeTypeName = () => {
    items.displayName = newNameOfType
    setEditModal(false)

  }
  return (
    <MyModal
      maxWidth={'sm'}
      open={editModal}
      onClose={onCloseEditModal}
    >
      <MySelect
        options={changeOptions}
        defaultValue={'ტიპები'}
        value={optionValue}
        onChange={onValueChange}
      />
      {
        optionValue === 'სახელის შეცვლა'
        && <>
          <FormInput placeholder="სახელი" className={'mt-2'}
                     value={newNameOfType}
                     onChange={handleNameOfType}
          />
          <Button className={'bg-danger border-0 mt-3'}
                  onClick={changeTypeName}
                  disabled={!newNameOfType.length && true}
          >შეცვლა</Button>
        </>
      }
      {
        optionValue === 'წაშლა'
        && <Button className={'bg-danger border-0 mt-3'}
                   onClick={deleteType}
        >წაშლა</Button>
      }

    </MyModal>
  );
};

export default ChangeReferenceModal;
