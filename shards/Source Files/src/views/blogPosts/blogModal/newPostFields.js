import React, {useState} from 'react';
import {
  Button,
  Collapse,
  FormGroup,
  FormInput,
  FormTextarea
} from "shards-react";
import {TextField} from "@mui/material";

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
    setBody(e.target.value)
  }
  let [openChartData, setOpenChartData] = useState(false)
  let onChartDataClose = () => {
    setOpenChartData(v => !v)
  }
  return (
    <>
      <FormGroup>
        <FormInput
          placeholder="სათაური"
          type={'text'}
          value={title}
          onChange={onTitleChange}
        />
      </FormGroup>
      <FormGroup>
        <FormTextarea type="text"
                      id="#description"
                      placeholder="შინაარსი"
                      value={body}
                      onChange={onBodyChange}
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
      <Button className={'w-100 mb-3'}
              onClick={onChartDataClose}
      >
        დიაგრამის დამატება
      </Button>
      <Collapse open={openChartData}>

        <FormGroup>
          <FormInput
            placeholder="სათაური"
            type={'text'}
            value={title}
            onChange={onTitleChange}
          />

        </FormGroup>
      </Collapse>
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
    </>
  );
};

export default NewPostFields;
