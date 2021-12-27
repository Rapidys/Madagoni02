import React, {useState} from 'react';
import MyModal from "../../MyModal/MyModal";
import {Button, FormInput} from "shards-react";

const AddTypeModal = ({
                        addTypeModalOpen,
                        closeAddTypeModal,
                        options,
                        setAddTypeModalOpen,
                        setOptions
                      }) => {

  let [TypeName, setTypeName] = useState('')

  let addNewType = () => {
    let newType = {
      referenceId: 0,
      displayName: TypeName,
      isActive: true,
    }
    options = [...options, newType]
    setOptions(options)
    setTypeName('')
    setAddTypeModalOpen(false)
  }

  let handleTypeName = (e) => {
    setTypeName(e.target.value)
  }
  return (
    <MyModal
      maxWidth={'sm'}
      open={addTypeModalOpen}
      onClose={closeAddTypeModal}
    >
      <FormInput placeholder="სახელი"
                 className={'mt-2 mb-3'}
                 value={TypeName}
                 onChange={handleTypeName}
      />
      <Button
        onClick={addNewType}
      >
        დამატება
      </Button>
    </MyModal>
  );
};

export default AddTypeModal;
