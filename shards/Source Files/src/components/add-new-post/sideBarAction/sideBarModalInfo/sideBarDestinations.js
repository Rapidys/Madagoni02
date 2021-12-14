import React, {useMemo, useState} from 'react';
import {Button, Col, Row} from "shards-react";
import TreeList from "../../../CompaignTree/TreeList";
import {useDispatch, useSelector} from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import ChosenDestinations from "./chosenPersons/ChosenDestinations";
import {
  setMotionDest
} from "../../../../Reducers/addNewPost/DocumentMotionsReducer";


const SideBarDestinations = (props) => {


  let [destination, setDestination] = useState([])
  let [valueFromTree, setValueFromTree] = useState([])
  let [department, setDepartment] = useState([])

  let handleSetDate = (value, index) => {
    destination[index].dueDate = value
  }


  function handleSetNodeValue(value) {
    setValueFromTree(value)
  }

  function handleSetDepValue(value) {
    setDepartment(value)
  }

  let dispatch = useDispatch()

  useMemo(() => {
    let rame = 0
    let newDestinate = {
      firstName: valueFromTree.firstName,
      lastName: valueFromTree.lastName,
      userId: valueFromTree.userId,
      departmentId: valueFromTree.departmentId,
      DocumentMotionId: 0,
      MotionTypeId: 3,
      TargetId: valueFromTree.userId,
      TargetTypeId: 1,
      MotionStatusId: 1,
      dueDate: null,
    }

    if (valueFromTree.firstName && valueFromTree.userId) {
      for (let i = 0; i < destination.length; i++) {
        if (destination[i].userId === valueFromTree.userId) {
          rame = 1
        }
      }
      if (rame === 0) {
        setDestination([...destination, newDestinate])
      }
    }
  }, [valueFromTree])

  useMemo(() => {
    let rame = 0
    let newDep = {
      displayName: department.displayName,
      departmentId: department.departmentId,
      MotionTypeId: 3,
      targetId: department.departmentId,
      MotionStatusId: 1,
      TargetTypeId: 2,
      dueDate: null,

    }
    if (department.displayName && department.departmentId) {
      for (let i = 0; i < destination.length; i++) {
        if (destination[i].displayName === department.displayName) {
          rame = 1
        }
      }
      if (rame === 0) {
        setDestination([...destination, newDep])
      }
    }
  }, [department])


  const save = () => {
    let authorMotion = {
      MotionTypeId: 1,
      MotionStatusId: 1,
      TargetId: 1,
      DocumentMotionId: 0,
      TargetTypeId: 1,
    }

    props.setChosenDestination(destination)
    dispatch(setMotionDest([authorMotion, ...destination]))
    props.handleClose()
  }


  let treeData = useSelector((state => state.Tree.Structure))


  return (


    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <div className={'d-flex justify-content-between'}>
          <DialogTitle>დეპარტამენტები</DialogTitle>
          <i className="fas fa-times p-4" style={{cursor: 'pointer'}}
             onClick={props.handleClose}/>
        </div>

        <DialogContent>
          <DialogContentText>
            აირჩიეთ სასურველი ავტორები
          </DialogContentText>

          <FormControl sx={{mt: 2, minWidth: 120}} className={"w-100"}>

            <MenuItem value="xl" style={{minHeight: 400, padding: 0}}>
              <Row className={"w-100"}>

                <Col lg="8">


                  <TreeList
                    treeData={treeData}
                    setTreeDatas={props.setTreeDatas}
                    handleSetNodeValue={handleSetNodeValue}
                    handleSetDepValue={handleSetDepValue}
                  />

                </Col>
                <Col lg="4" className={"border-left"}>


                  <br/>

                  <div>
                    <b>ადრესატები</b>
                    <ChosenDestinations
                      destination={destination}
                      department={department}
                      setDepartment={setDepartment}
                      setDestination={setDestination}
                      handleSetDate={handleSetDate}
                      save={save}

                    />
                  </div>
                </Col>
              </Row>
            </MenuItem>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={save}>შენახვა</Button>
        </DialogActions>
      </Dialog>
    </div>

  );
};


export default SideBarDestinations;
