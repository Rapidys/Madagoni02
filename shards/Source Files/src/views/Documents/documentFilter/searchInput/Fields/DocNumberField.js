import React, {useState} from 'react';
import {TextField} from "@mui/material";

const DocNumberField = ({docNumberVal, setDocNumberVal,...props}) => {


  let onValueChange = (e) => {
    setDocNumberVal(e.target.value)
  }

  return (
    <TextField id="outlined-basic"
               label={'დოკ.ნომერი'}
               variant="outlined"
               value={docNumberVal}
               onChange={onValueChange}
               {...props}
    />

  );
};

export default DocNumberField;
