import React from 'react';
import MyModal from "../MyModal/MyModal";

const SuccesfullChanged = ({newTreeFinal,newTreeFinalClose}) => {
  return (
    <MyModal
      open={newTreeFinal}
      onClose={newTreeFinalClose}
      maxWidth={'sm'}
    >
      <div className={'d-flex align-items-center'}>
        <i className="fas fa-check-circle ml-3"
           style={{color: 'green', fontSize: '30px'}}/>
        <span className={'ml-4'}>წარმატებით შეიცვალა</span>
      </div>

    </MyModal>
  );
};

export default SuccesfullChanged;
