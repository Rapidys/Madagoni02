import React, {useEffect, useState} from 'react';
import {CardBody} from "shards-react";
import {Card} from "@material-ui/core";
import SpreadSheet from "./spreadSheet";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {
  setChangePage,
  setSuccessModalClose
} from "../../../Reducers/files/UpdateFileReducer";
import SuccessModal from "../successModa/successModal";
import styled from "styled-components";


const Files = () => {
  const [data, setData] = useState([
    [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
    [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}]
  ]);

  let successModal = useSelector((state => state.updateFile.successModal))
  let [needRedirect, setNeedRedirect] = useState(false)

  let onClose = () => {
    dispatch(setSuccessModalClose())
    setNeedRedirect(true)
  }
  let dispatch = useDispatch()
  let history = useHistory()
  let url = history.location.pathname

  useEffect(() => {
    dispatch(setChangePage())
  }, [url])

  if (needRedirect) {
    return <Redirect to='/MyFiles'/>
  }
  return (
    <div>
      <div className={'wrapper mb-5 h-auto'}>

        <Card>

          <CardBody>
            <h5>ფაილის შექმნა</h5>
            <SpreadSheet
              data={data}
              setData={setData}
            />
          </CardBody>

          <SuccessModal
            successModal={successModal}
            onClose={onClose}
            title={'წარმატებით შეიქმნა'}
          />
        </Card>
      </div>
    </div>

  );
};

export default Files;
