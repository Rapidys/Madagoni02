import React, {useState} from 'react';
import {Collapse} from "shards-react";
import {useDispatch, useSelector} from "react-redux";
import {
  uploadFile,
} from "../../../../../Reducers/addNewPost/UploadFileReducer";
import styled from "styled-components";
import ChosenFiles from "./ChosenFiles";
import Preloader from "../../../../../Preloader/Preloader";

let Styles = styled.div`

  .fileNamesWrapper {
    width: 40px;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    display: flex;
    justify-content: space-between;

  }

  .deleteAttachment {
    text-decoration: line-through
  }

`

const AttachedFiles = (props) => {


  let [fileNames, setFileNames] = useState([])
  let dispatch = useDispatch()


  let saveFile = async (e) => {
    try {
      const formData = new FormData();
      formData.append("File", e.target.files[0])
      formData.append("fileName", e.target.files[0].name)
      setFileNames([...fileNames, e.target.files[0].name])
      dispatch(uploadFile(formData))
    } catch (e) {
      console.log(e)
    }
  };
  let fetching = useSelector(state => state.uploadFile.isFetching)

  if (fetching) {
    return <Preloader/>
  }
  return (
    <Styles>

      <Collapse open={props.attachedFiles}>

        <div className="p-3 mt-3 border rounded">



          <div className="custom-file mb-3">
            <label className="custom-file-label" htmlFor="customFile2">
              ფაილი...
            </label>
            <input type="file"
                   name="file"
                   className="custom-file-input"
                   id="customFile2"
                   onChange={(e) => saveFile(e)}
            />

            <ChosenFiles
              fileNames={fileNames}
            />
            <br/>

          </div>
        </div>
      </Collapse>
    </Styles>
  )
    ;
};

export default AttachedFiles;
