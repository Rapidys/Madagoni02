import React from 'react';
import {TextField} from "@mui/material";

const ExecutorField = ({executor, setExecutor, ...props}) => {


  let onValueChange = (e) => {
    setExecutor(e.target.value)
  }

  return (
    <TextField id="outlined-basic"
               label={'შემსრულებელი'}
               variant="outlined"
               value={executor}
               onChange={onValueChange}
               {...props}
    />

  );
};

export default ExecutorField;
