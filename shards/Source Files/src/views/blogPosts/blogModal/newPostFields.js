import React from 'react';
import {
  FormGroup,
  FormInput,
} from "shards-react";
import {TextField} from "@mui/material";
import ReactQuill, {Quill} from "react-quill";
import styled from 'styled-components'
import Editor from "../../../components/add-new-post/editor/Editor";

let Styles = styled.div`
  .ql-editor {
    min-height: 200px !important;
    max-height: 300px;
    overflow: hidden;
    overflow-y: scroll;
  }

  .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input {
    height: auto;
    padding: 0.4375rem 0.75rem;

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

  let icons = Quill.import('ui/icons');
  icons['video'] = '<i class="fas fa-chart-bar text-secondary"/>';

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
        <TextField id="outlined-basic"
                   label={'სათაური'}
                   variant="outlined"
                   value={title}
                   onChange={onTitleChange}
                   size="small"
                   sx={{width: '100%'}}


        />

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
          sx={{width: '100%'}}
          size="small"

        />
      </FormGroup>
      <FormGroup>
        <ReactQuill
          value={body}
          onChange={onBodyChange}
          modules={Editor.newPostModule}
          formats={Editor.newPostFormats}
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


    </Styles>
  );
};
Editor.newPostModule = {

  toolbar: [
    [{header: '1'}, {header: '2'}, {header: [3, 4, 5, 6]},],
    [{size: []}],
    [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['link', 'image', 'video'],
  ],

}

Editor.newPostFormats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block',
  'align'
]

export default NewPostFields;
