import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import {Button, Col, ModalBody, Row} from "shards-react";
import TreeList from "../../CompaignTree/TreeList";
import ShearUsers from "./shearUsers";
import {useDispatch, useSelector} from "react-redux";
import {
  setChangePage,
  setCloseTreeAC,
  UpdateFile
} from "../../../Reducers/files/UpdateFileReducer";
import {useHistory, useParams} from "react-router-dom";
import styled from 'styled-components'

let Styles = styled.div`
  .wrapper:first-child {
    padding-top: 0;
  }

  @media (max-width: 500px) {
    .wrapper {
      padding: 0;
      margin:0 0 0 5px;
    }
    .modal-body{
      padding: 0;
    }
    .MuiTypography-h6{
      font-size: 1rem;
    }
  }

`
const ShearUsersModal = ({onClose, open, titleValue, data, fileInfo}) => {

  let sharedUsers = useSelector((state => state.updateFile.shareUsers))

  let params = useParams()
  let history = useHistory()
  let dispatch = useDispatch()
  let url = history.location.pathname


  let handleSheareUsers = () => {
    if (url !== '/newFile') {
      let FileData = {
        fileId: params.id ? Number(params.id) : 0,
        fileTitle: fileInfo.fileTitle,
        fileData: data,
        shareUsers: sharedUsers
      }
      dispatch(UpdateFile(FileData))
      dispatch(setCloseTreeAC())
      dispatch(setChangePage()) // gaziarebaze daklikebisas masivi saidanac vigebt dashearebul userebs rom ganuldes

    }

  }

  let handleSaveUsers = () => {
    dispatch(setCloseTreeAC())

  }
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth={true}
        maxWidth={'lg'}
      >
        <Styles>

        <div className={'d-flex justify-content-between'}>
          <DialogTitle>ფაილის გაზიარება</DialogTitle>
          <i className="fas fa-times p-4" style={{cursor: 'pointer'}}
             onClick={onClose}/>

        </div>
          <DialogContent className={'wrapper'}>
            <ModalBody>
              <Row className={'w-100'}>
                <Col lg={8} className={'treeCol'}>
                  <TreeList
                    isAppointment={false}
                    isSharedUsers = {true}
                  />
                </Col>
                <Col lg={4} className={'border-left'}>
                  <ShearUsers
                    sharedUsers={sharedUsers}
                  />
                </Col>
              </Row>

            </ModalBody>
          </DialogContent>
          <DialogActions className={'footer'}>
            {
              url !== '/newFile'
                ? <Button className={'float-right'}
                          onClick={handleSheareUsers}
                >გაზიარება</Button>
                : <Button className={'float-right'}
                          onClick={handleSaveUsers}
                >შენახვა</Button>

            }
          </DialogActions>
        </Styles>

      </Dialog>
    </>

  );
};

export default ShearUsersModal;
