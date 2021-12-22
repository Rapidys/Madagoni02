import React from 'react';
import {TextField} from "@mui/material";

const AuthorField = ({author, setAuthor, ...props}) => {


  let onValueChange = (e) => {
    setAuthor(e.target.value)
  }

  return (
    <TextField id="outlined-basic"
               label={'ავტორი'}
               variant="outlined"
               value={author}
               onChange={onValueChange}
               {...props}
    />

  );
};

export default AuthorField;
