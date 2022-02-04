import React, {useEffect, useState} from 'react';
import {useHistory, useLocation, useParams} from "react-router-dom";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../../../Preloader/Preloader";
import API from "../../../API/ApiBases";
import {Card, CardBody,} from "shards-react";
import {
  setChangePage,
  setFileInfoAC, setSuccessModalClose, sharedValueUserAC, shareUsersAC,
} from "../../../Reducers/files/UpdateFileReducer";
import SuccessModal from "../successModa/successModal";
import SpreadSheet from "../MySpreadSheet/spreadSheet";


const ChosenFile = () => {

  let [loading, setLoading] = useState(true)
  let params = useParams()

  let dispatch = useDispatch()
  let history = useHistory()
  let url = history.location.pathname

  let successModal = useSelector((state => state.updateFile.successModal))
  let shareUsers = useSelector((state => state.updateFile.shareUsers))
  let file = useSelector((state => state.updateFile.file))


  let onClose = () => {
    dispatch(setSuccessModalClose())
  }

  useEffect(() => {
    dispatch(setChangePage())
  }, [url])

  useEffect(() => {

    try {
      setLoading(true)
      API.getFile(params.id).then(response => {
        dispatch(shareUsersAC(response.data.shareUsers))
        setFiles(response.data.fileData)
        setFileInfo(response.data)
        setLoading(false)
        dispatch(setFileInfoAC(response.data))
      })

    } catch (e) {
      console.log(e)
    }
  }, [file])


  let [files, setFiles] = useState([])
  let [fileInfo, setFileInfo] = useState({})


  if (loading) {
    return <Preloader/>
  }

  return (
    <div>
      <div className={'mb-5 h-auto'}>
        <Card>
          <CardBody>
            <h5 className={'ml-3'}>
              {fileInfo && fileInfo.fileTitle}
            </h5>
            <SpreadSheet data={files} setData={setFiles} fileInfo={fileInfo}/>
          </CardBody>
        </Card>
        <SuccessModal
          successModal={successModal}
          onClose={onClose}
          title={'წარმატებით შეიცვალა'}
        />

      </div>

    </div>

  );
};

export default ChosenFile;
