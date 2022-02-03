import React, {useState} from 'react';
import {Collapse} from "shards-react";
import {useDispatch, useSelector} from "react-redux";
import {
  uploadFile,
} from "../../../../../Reducers/addNewPost/UploadFileReducer";
import ChosenFiles from "./ChosenFiles";
import Preloader from "../../../../../Preloader/Preloader";
import {useHistory} from "react-router-dom";
import {AttachedFilesStyles} from "./attachedFilesStyles";



const AttachedFiles = (props) => {

  let history = useHistory()
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
    <AttachedFilesStyles>

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
                <span>აირჩიეთ</span>

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
    </AttachedFilesStyles>
  )
    ;
};

export default AttachedFiles;
