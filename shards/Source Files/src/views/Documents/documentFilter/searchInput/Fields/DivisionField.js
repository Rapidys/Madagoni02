import React from 'react';
import {TextField} from "@mui/material";

const DivisionField = ({division,setDivision ,...props}) => {


  let onValueChange = (e) => {
    setDivision(e.target.value)
  }

  return (
    <TextField id="outlined-basic"
               label={'დეპარტამენტი'}
               variant="outlined"
               value={division}
               onChange={onValueChange}
               {...props}
    />

  );
};

export default DivisionField;
