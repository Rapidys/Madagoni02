import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  delActiveAC,
} from "../../../../../Reducers/addNewPost/UploadFileReducer";
import {Link, useHistory,} from "react-router-dom";
import styled from "styled-components";


const ChosenFiles = ({fileNames}) => {
  let url = useHistory()

  let PageUrl = url.location.pathname

  let dispatch = useDispatch()
  let fileId = useSelector(state => state.uploadFile.fileId)

  let filterAttachment = useMemo(() => {
    return (nameId) => dispatch(delActiveAC(fileId[nameId].isActive = false))
  }, [fileId])

  let handlefilterAttachments = (nameId) => {
    filterAttachment(nameId)
  }
  let chosen = useSelector(state => state.chosenDocument.currentMessagePage)

  return (
    <div>
      <label
        className={"mt-2"}>
        {PageUrl === '/add-new-post'
          ? fileNames && fileNames.map((name, i) => {

          return <div
            className={"fileNamesWrapper"}
            key={i}>
            <div>
              <b>{i + 1}.</b><span
              className={fileId[i].isActive === false ? 'deleteAttachment' : ''}>
              {name}</span>
            </div>
            <div>
              <i className="fa fa-times ml-5"
                 onClick={() => {
                   handlefilterAttachments(i)
                 }}
              />
            </div>
          </div>
        })
          :
          chosen.attachments && chosen.attachments.map((name, index) => {
            return <div
              className={"fileNamesWrapper"}
              key={name.attachmentId}>
              <div className={'d-flex'}>
                <b>{index + 1}.</b>
                <a target="_blank"
                   href={`https://cyberdocapiservice20211103000756.azurewebsites.net/api/Docs/DownloadFile/${name.attachmentId}`}
                   className="link-primary">
                  <span className={'mt-3 link'}>{name.fileName}</span>
                </a>

              </div>
            </div>
          })

        }


      </label>
    </div>
  );
};

export default ChosenFiles;
