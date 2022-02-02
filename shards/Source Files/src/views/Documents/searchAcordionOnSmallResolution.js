import React from 'react';
import styled from "styled-components";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import {ModalBody} from "shards-react";


let Styles = styled.div`
  @media (max-width: 400px) {
    .MuiDialogContent-root {
      padding: 0;
    }
  }
  @media (max-width: 330px) {
    .modal-body {
      padding: 1rem;
    }
  }

`

const SearchAcordionOnSmallResolution = ({
                                           children,
                                           smallResSearchModal,
                                           setSmallResSearchModal,
                                           title
                                         }) => {
  let onModalClose = () => {
    setSmallResSearchModal(v => !v)
  }


  return (
    <Dialog
      open={smallResSearchModal}
      onClose={onModalClose}
      fullWidth={true}
      maxWidth={'xl'}
      title={title}
    >
      <Styles>

        <div className={'d-flex justify-content-between'}>
          <DialogTitle>{title}</DialogTitle>
          <i className="fas fa-times p-4" style={{cursor: 'pointer'}}
             onClick={onModalClose}/>
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

export default SearchAcordionOnSmallResolution;
