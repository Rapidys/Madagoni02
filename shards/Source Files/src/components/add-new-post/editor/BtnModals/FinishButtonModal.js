import React, {useEffect, useState} from 'react';
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import {Button, ModalBody} from "shards-react";
import MySelect from "../../../../MySelect/MySelect";
import API from "../../../../API/ApiBase";
import {useDispatch, useSelector} from "react-redux";
import {
  GetFinishDocument,
  setFinishOptionsAC,
  setSelectedDocIdAC
} from "../../../../Reducers/getDocReducer";
import {useParams} from "react-router-dom";
import MyModal from "../../../MyModal/MyModal";

const FinishButtonModal = ({
                             finishCategories,
                             finishModal,
                             setFinishCategories
                           }) => {

  let params = useParams()
  let dispatch = useDispatch()
  let Options = useSelector((state => state.GetDoc.Options))


  let selectedDocId = useSelector(state => state.GetDoc.selectedDocId)
  let [finishDocType, setFinishDocType] = useState()
  useEffect(() => {
    API.FinishDocumentSelectTypes().then((response) => {
      if (response) {
        dispatch(setFinishOptionsAC(response.data))
      }
    })
  }, [])

  let onFinishChange = (e) => {
    setFinishDocType(e.target.value)
    dispatch(setSelectedDocIdAC(e.target.selectedIndex))
  }

  let finishDocument = () => {
    dispatch(GetFinishDocument(params.id, selectedDocId))
    setFinishCategories(false)
  }
  return (

    <MyModal
      open={finishCategories}
      onClose={finishModal}
      maxWidth={"sm"}
      title = 'დასრულება'
    >
      <MySelect
        defaultValue={'დასრულების ტიპი'}
        options={Options}
        onChange={onFinishChange}
        value={finishDocType}
      />

      <Button className={"mt-5"}
              onClick={finishDocument}
      >
        დასრულება
      </Button>
    </MyModal>

  );
};

export default FinishButtonModal;
