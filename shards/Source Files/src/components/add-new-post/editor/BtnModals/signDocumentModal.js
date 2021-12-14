import React from 'react';
import MyModal from "../../../MyModal/MyModal";

const SignDocumentModal = ({openSign, closeSign}) => {
  return (

    <MyModal
      open={openSign}
      onClose={closeSign}
      maxWidth={"sm"}
      title={''}
    >
      <i className="fas fa-check-circle"
         style={{color: 'green', fontSize: '30px'}}/>
      <span
        className={"ml-2"}>დოკუმენტი წარმატებით დავიზირდა</span>
    </MyModal>

  );
};

export default SignDocumentModal;
