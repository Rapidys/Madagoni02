import React from 'react';
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
               sx={{width: '100%'}}
               size="small"

    />

  );
};

export default DocTitleField;
