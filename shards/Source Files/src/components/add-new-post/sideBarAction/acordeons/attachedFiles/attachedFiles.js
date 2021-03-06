import React, {useState} from 'react';
import {Collapse} from "shards-react";
import {useDispatch, useSelector} from "react-redux";
import {
  uploadFile,
} from "../../../../../Reducers/addNewPost/UploadFileReducer";
import styled from "styled-components";
import ChosenFiles from "./ChosenFiles";
import Preloader from "../../../../../Preloader/Preloader";
import {useHistory} from "react-router-dom";

let Styles = styled.div`

  .fileNamesWrapper {
    width: 40px;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    display: flex;
    justify-content: space-between;

  }

  .link {
    text-decoration: underline;
    cursor: pointer;
    color: rgba(6, 13, 231, 0.51);
  }

  .deleteAttachment {
    text-decoration: line-through
  }

  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile + label {
    font-size: 1em;
    color: white;
    background-color: #ffc107;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 6px;
    border-radius: 10px;
  }

  .inputfile:focus + label,
  .inputfile + label:hover {
    background-color: #6294ce;
  }

  .inputfile + label {
    cursor: pointer; /* "hand" cursor */
  }

  .drugWrapper {
    width: 100%;
    height: 60px;
    border: 1px dashed black;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .drop-area {
    width: 50%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const AttachedFiles = (props) => {

  let history = useHistory()
  let url = history.location.pathname
  let [fileNames, setFileNames] = useState([])
  let dispatch = useDispatch()
  let [file, setFile] = useState({})

  let [drag, setDrag] = useState(false)

  let dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
  }
  let dragLeaveHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }
  let onDropHandler = (e) => {
    e.preventDefault()
    let files = [...e.dataTransfer.files]
    const formData = new FormData();
    formData.append("File", files[0])
    formData.append("fileName", files[0].name)
    setFileNames([...fileNames, files[0].name])
    dispatch(uploadFile(formData))
    setFile(formData)
    setDrag(false)
  }
  let saveFile = async (e) => {
    try {
      const formData = new FormData();
      formData.append("File", e.target.files[0])
      formData.append("fileName", e.target.files[0].name)
      setFileNames([...fileNames, e.target.files[0].name])
      dispatch(uploadFile(formData))
      setFile(formData)
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

        <div className="p-3 mt-3 rounded"
             onDragStart={e => dragStartHandler(e)}
             onDragLeave={e => dragLeaveHandler(e)}
             onDragOver={e => dragStartHandler(e)}
             onDrop={e => onDropHandler(e)}
             style={{border: drag === true ? '1px dashed ' : '1px solid'}}

        >


          <div className="custom-file mb-3">
            <input type="file"
                   id="file"
                   name="file"
                   className="inputfile"
                   onChange={(e) => saveFile(e)}
            />
            <label htmlFor="file">
              <div>
                <span>?????????????????????</span>

              </div>
              <div>
                <i className="fas fa-cloud-upload-alt"/>

              </div>
            </label>


            <ChosenFiles
              fileNames={fileNames}
              file={file}
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
