import React, {useState} from 'react';
import {TextField} from "@mui/material";

const DocTitleField = ({docTitleVal, setDocTitleVal, ...props}) => {


  let onValueChange = (e) => {
    setDocTitleVal(e.target.value)
  }

  return (
    <TextField id="outlined-basic"
               label={'ძებნა სათაურით'}
               variant="outlined"
               value={docTitleVal}
               onChange={onValueChange}
               {...props}
    />

  );
};

export default DocTitleField;
