import React, {useEffect, useState} from 'react';
import {
  Button,
  Col,
  Row
} from "shards-react";
import TreeList from "../../../CompaignTree/TreeList";
import {useDispatch, useSelector} from "react-redux";
import {
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, FormControl, MenuItem
} from "@material-ui/core";
import ChosenVisitors from "./chosenPersons/ChosenVisitors";
import {
  setMotionVis
} from "../../../../Reducers/addNewPost/DocumentMotionsReducer";
import styled from "styled-components";

let Styles = styled.div`
  .wrapper:first-child {
    padding-top: 0;
  }
  @media (max-width: 500px) {
    .wrapper {
      padding: 0;
      margin: 0 0 0 7px;
    }

    .modal-body {
      padding: 0;
    }

    .MuiTypography-h6 {
      font-size: 1rem;
    }
  }
`


const SideBarVisitors = (props) => {


  let [confirmation, setConfirmation] = useState([])
  let [visitorFromTree, setVisitorFromTree] = useState([])

  let handleSetNodeVisitor = (value) => {
    setVisitorFromTree(value)
  }

  let dispatch = useDispatch()

  useEffect(() => {
    let chosens = {
      firstName: visitorFromTree.firstName,
      lastName: visitorFromTree.lastName,
      userId: visitorFromTree.userId,
      departmentId: visitorFromTree.departmentId,
      documentMotionId: 0,
      MotionTypeId: 2,
      TargetId: visitorFromTree.userId,
      TargetTypeId: 1,
      MotionStatusId: 1,
    }
    let some = 0
    if (visitorFromTree.firstName && visitorFromTree.userId) {
      for (let i = 0; i < confirmation.length; i++) {
        if (confirmation[i].userId === chosens.userId)
          some = 1
      }
      if (some === 0) {
        setConfirmation([...confirmation, chosens])
      }
    }
  }, [visitorFromTree, setVisitorFromTree])


  let Save = () => {
    props.setChosenVisitor(confirmation)
    dispatch(setMotionVis(confirmation))
    props.handleCloseVisitors()
  }

  let treeData = useSelector((state => state.Tree.Structure))


  return (


    <Dialog
      open={props.openVisitors}
      onClose={props.handleCloseVisitors}
      fullWidth={true}
      maxWidth={"lg"}
      className={'wrapper'}

    >
      <Styles>

        <div className={'d-flex justify-content-between'}>
          <DialogTitle>სტრუქტურა</DialogTitle>
          <i className="fas fa-times p-4" style={{cursor: 'pointer'}}
             onClick={props.handleCloseVisitors}/>
        </div>

        <DialogContent className={'wrapper'}>
          <DialogContentText>
            აირჩიეთ სასურველი ვიზიტორები
          </DialogContentText>

          <FormControl sx={{mt: 2, minWidth: 120}} className={"w-100"}>

            <MenuItem value="xl" style={{padding: 0}}>
              <Row className={"w-100"}>

                <Col lg="8">


                  <TreeList
                    handleSetNodeValue={handleSetNodeVisitor}
                    treeData={treeData}
                    isAppointment={false}


                  />

                </Col>
                <Col lg="4" className={"border-left"}>


                  <div>
                    <b>ვიზიტორები</b>
                    <ChosenVisitors
                      userState={confirmation}
                      changeState={setConfirmation}

                    />
                  </div>

                </Col>

              </Row>


            </MenuItem>
          </FormControl>

        </DialogContent>

        <DialogActions className={'footer'}>
          <Button onClick={Save}>შენახვა</Button>

        </DialogActions>
      </Styles>

    </Dialog>
  );
};


export default SideBarVisitors;
