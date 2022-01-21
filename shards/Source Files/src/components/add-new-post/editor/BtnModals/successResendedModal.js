import React from 'react';
import MyModal from "../../../MyModal/MyModal";

const SuccessResendedModal = ({successResended, onSuccessResend}) => {
  return (
    <MyModal
      open={successResended}
      onClose={onSuccessResend}
      maxWidth={'sm'}
    >
      <div className={'d-flex align-items-center'}>
        <i className="fas fa-check-circle"

           style={{color: 'green', fontSize: '30px'}}/>
        <span className={'ml-2'}>
                          წარმატებით გადაიგზავნა
            </span>
      </div>

    </MyModal>
  );
};

export default SuccessResendedModal;
