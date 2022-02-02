import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  delActiveAC,
} from "../../../../../Reducers/addNewPost/UploadFileReducer";
import {useHistory,} from "react-router-dom";
import API from "../../../../../API/ApiBase";


const ChosenFiles = ({fileNames, file}) => {
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
  let downloadFile = (id, name) => {

    API.downloadFile(id).then(response => {
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${name}`); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
  }

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
              className={fileId[i].isActive === false ? 'deleteAttachment' : 'link'}
              onClick={() => {
                downloadFile(fileId[i].AttachmentId, name)
              }}

            >
              {name.length > 10 ? name.slice(0, 10) + '...' : name}
            </span>
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

                <span className={'link'}
                      onClick={() => {
                        downloadFile(name.attachmentId, name.fileName)
                      }}
                >{name.fileName.length > 10 ? name.fileName.slice(0, 10) + '...' : name.fileName}</span>

              </div>
            </div>
          })

        }


      </label>
    </div>
  );
};

export default ChosenFiles;
