import React, {useState} from 'react';
import {TextField} from "@mui/material";
import AuthorField from "./documentFilter/searchInput/Fields/authorField";


const Author = ({Author}) => {

  let [AuthorModal, setAuthorModal] = useState(false)

  let onCloseAuthor = () => {
    setAuthorModal(v => !v)
  }

  return (
    <>
      <TextField type="text" onClick={onCloseAuthor}
                 placeholder={'დეპარტამენტი'}
                 id="outlined-basic"
                 variant="outlined"
                 value={Author.displayName}
                 label={!Author.displayName && 'ავტორი'}
      />

      <AuthorField
        onCloseAuthor={onCloseAuthor}
        AuthorModal={AuthorModal}
        setAuthorModal={setAuthorModal}

      />
    </>
  );
};

export default Author;
