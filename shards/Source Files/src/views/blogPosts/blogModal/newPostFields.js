import React from 'react';
import {
  FormGroup,
  FormInput,
} from "shards-react";
import {TextField} from "@mui/material";
import ReactQuill from "react-quill";
import styled from 'styled-components'

let Styles = styled.div`
  .ql-editor {
    min-height: 200px !important;
    max-height: 300px;
    overflow: hidden;
    overflow-y: scroll;
  }
`

const NewPostFields = ({
                         setTitle,
                         setBody,
                         uploadImg,
                         fileName,
                         body,
                         ValidUntil,
                         setValidUntil,
                         title
                       }) => {


  let onTitleChange = (e) => {
    setTitle(e.target.value)
  }
  let onBodyChange = (e) => {
    setBody(e)
  }

  return (
    <Styles>
      <h6>პოსტის შექმნა</h6>


      <FormGroup>
        <FormInput
          placeholder="სათაური"
          type={'text'}
          value={title}
          onChange={onTitleChange}
        />
      </FormGroup>
      <FormGroup>
        <ReactQuill
          value={body}
          onChange={onBodyChange}
          placeholder={'აღწერა'}
        />
      </FormGroup>
      <FormGroup>
        <div className="p-3 mt-3 border rounded">
          <div className="custom-file mb-3">
            <input type="file"
                   name="file"
                   className="custom-file-input"
                   id="customFile2"
                   onChange={(e) => uploadImg(e)}
            />
            <label className="custom-file-label" htmlFor="customFile2">
              აირჩიეთ სურათი...
            </label>
            <div className={'mt-4'}>
              <span>{fileName}</span>

            </div>

            <br/>
          </div>
        </div>
      </FormGroup>


      <FormGroup>

        <TextField
          id="date"
          label={'მდე'}
          type="date"
          inputformat="MM/dd/yyyy"
          value={ValidUntil}
          onChange={(newValue) => {
            setValidUntil(newValue.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{width: '100%', color: 'red'}}
          size="small"

        />
      </FormGroup>
    </Styles>
  );
};

export default NewPostFields;
