import React, {useState} from 'react';
import MyModal from "../../MyModal/MyModal";
import MySelect from "../../../MySelect/MySelect";
import {Button, FormInput} from "shards-react";
import {setReference} from "../../../Reducers/updateReferenceReducer";
import {useDispatch} from "react-redux";

const ChangeReferenceModal = ({
                                setEditModal,
                                editModal,
                                items,
                                referenceTypeUrl
                              }) => {
  let dispatch = useDispatch()

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
    dispatch(setReference(referenceTypeUrl, items))
    setEditModal(false)

  }
  let changeTypeName = () => {
    items.displayName = newNameOfType
    dispatch(setReference(referenceTypeUrl, items))
    setNewNameOfType('')
    setEditModal(false)

  }
  return (
    <MyModal
      maxWidth={'sm'}
      open={editModal}
      onClose={onCloseEditModal}
      title = {optionValue !== 'სახელის შეცვლა' ? 'სარჩევის წაშლა' : 'სახელის შეცვლა'}
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
