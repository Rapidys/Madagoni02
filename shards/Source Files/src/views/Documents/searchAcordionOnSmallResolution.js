import React from 'react';
import MyModal from "../../components/MyModal/MyModal";
import styled from "styled-components";


let Styles = styled.div`
.modal-body{
  padding: 0;
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
    <Styles>
      <MyModal
        open={smallResSearchModal}
        onClose={onModalClose}
        fullWidth={true}
        maxWidth={'xl'}
        title = {title}
        className = {'modal-body'}
        // disableEnforceFocus
      >
        {children}
      </MyModal>
    </Styles>


  );
};

export default SearchAcordionOnSmallResolution;
