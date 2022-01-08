import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import {Button, ModalBody} from "shards-react";


const MyModal = ({open, onClose, maxWidth, children, title,...props}) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={maxWidth}
      {...props}
    >
      <div className={'d-flex justify-content-between'}>
        <DialogTitle>{title}</DialogTitle>
        <i className="fas fa-times p-4" style={{cursor: 'pointer'}}
           onClick={onClose}/>
      </div>
      <DialogContent>
        <ModalBody>
          {children}
        </ModalBody>
      </DialogContent>

    </Dialog>
  );
};

export default MyModal;
