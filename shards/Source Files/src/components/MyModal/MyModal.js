import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import {ModalBody} from "shards-react";
import styled from "styled-components";


let Styles = styled.div`
  @media (max-width: 550px) {
    .MuiDialogContent-root {
      padding: 0
    }

    .modal-body {
      padding: 1rem;
    }
    .MuiTypography-h6{
      font-size: 12px;
    }
  }
`

const MyModal = ({open, onClose, maxWidth, children, title, ...props}) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={maxWidth}
      {...props}
    >
      <Styles>
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
      </Styles>

    </Dialog>
  );
};

export default MyModal;
