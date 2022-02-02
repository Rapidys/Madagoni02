import React from 'react';
import {TextField} from "@mui/material";

const DocTypeField = ({docType, setDocType, ...props}) => {


  let onValueChange = (e) => {
    setDocType(e.target.value)
  }

  return (
    <TextField id="outlined-basic"
               label={'დოკ.ტიპი'}
               variant="outlined"
               value={docType}
               onChange={onValueChange}
               {...props}
    />

  );
};

export default DocTypeField;
