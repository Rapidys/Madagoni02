import React from 'react';
import {TextField} from "@mui/material";
import MyModal from "../../../../../components/MyModal/MyModal";
import TreeList from "../../../../../components/CompaignTree/TreeList";

const DivisionField = ({
                         divisionModal,
                         onCloseDivision,
                         setDivision,
                         setDivisionModal,
                         ...props
                       }) => {


  return (
    <MyModal
      open={divisionModal}
      onClose={onCloseDivision}
      maxWidth={'sm'}

    >
      <TreeList
        setDivisionModal={setDivisionModal}

      />
    </MyModal>

  );
};

export default DivisionField;
