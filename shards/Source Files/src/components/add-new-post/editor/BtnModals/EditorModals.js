import React from 'react';
import SuccessResendedModal from "./successResendedModal";
import SignDocumentModal from "./signDocumentModal";
import FinishButtonModal from "./FinishButtonModal";

const EditorModals = (
  {
    successResended,
    onSuccessResend,
    openSign,
    onCloseSignature,
    finishCategories,
    finishModal,
    setFinishCategories
  }
) => {
  return (
    <div>
      <SuccessResendedModal
        successResended={successResended}
        onSuccessResend={onSuccessResend}
      />
      <SignDocumentModal
        openSign={openSign}
        closeSign={onCloseSignature}
      />
      <FinishButtonModal finishCategories={finishCategories}
                         finishModal={finishModal}
                         setFinishCategories={setFinishCategories}
      />
    </div>
  );
};

export default EditorModals;
