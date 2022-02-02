import React, {useState} from 'react';
import {TextField} from "@mui/material";
import DivisionField from "./documentFilter/searchInput/Fields/DivisionField";

const Division = ({division}) => {

  let [divisionModal, setDivisionModal] = useState(false)

  let onCloseDivision = () => {
    setDivisionModal(v => !v)
  }

  return (
    <>
      <TextField type="text" onClick={onCloseDivision}
                 placeholder={'დეპარტამენტი'}
                 value={division.displayName || ''}
                 id="outlined-basic"
                 label={!division.displayName && 'დეპარტამენტი'}
                 variant="outlined"
                 sx ={{width:'100%'}}
                 size="small"

      />

      <DivisionField
        divisionModal={divisionModal}
        onCloseDivision={onCloseDivision}
        setDivisionModal={setDivisionModal}

      />
    </>
  );
};

export default Division;
