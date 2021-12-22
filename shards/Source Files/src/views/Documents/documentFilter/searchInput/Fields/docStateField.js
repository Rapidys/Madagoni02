import React from 'react';
import {TextField} from "@mui/material";

const DocStateField = ({stateField, setStateField, ...props}) => {


  let onValueChange = (e) => {
    setStateField(e.target.value)
  }

  return (
    <TextField id="outlined-basic"
               label={'დოკ.მდგომარეობა'}
               variant="outlined"
               value={stateField}
               onChange={onValueChange}
               {...props}
    />

  );
};

export default DocStateField;
