import React from 'react';
import MyModal from "../../../MyModal/MyModal";

const DocCreateModal = ({getDocumentDate, getDocumentId, open, close}) => {
  return (

    <MyModal
      open={open}
      onClose={close}
      maxWidth={"sm"}
      title={`დოკუმენტის ნომერი : ${getDocumentId}`}
    >
      <i className="fas fa-check-circle"
         style={{color: 'green', fontSize: '30px'}}/>


      <span
        className={"ml-2"}>დოკუმენტის შექმნის თარიღი : {getDocumentDate && getDocumentDate.slice(0, 10)}</span>
    </MyModal>


  );
};

export default DocCreateModal;
