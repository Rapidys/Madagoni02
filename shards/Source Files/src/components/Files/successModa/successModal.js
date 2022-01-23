import React from 'react';
import MyModal from "../../MyModal/MyModal";


const SuccessModal = ({successModal, onClose, title}) => {


  return (
    <MyModal
      open={successModal}
      onClose={onClose}
    >
      <div className={'d-flex align-items-center'}>
        <i className="fas fa-check-circle"

           style={{color: 'green', fontSize: '30px'}}/>
        <span className={'ml-2'}>
                   {title}
            </span>

      </div>
    </MyModal>
  );
};

export default SuccessModal;
