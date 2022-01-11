import Tree from "./Tree";
import styled from 'styled-components'
import React, {useEffect, useMemo, useState} from "react";
import Preloader from "../../Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {
  setNewStructureAC,
  TreeData,
  TreeDataAC
} from "../../Reducers/TreeDataReducer";
import {Button, FormCheckbox} from "shards-react";
import {useHistory} from "react-router-dom";
import {setNewUser} from "../../Reducers/registerReducer";
import MyModal from "../MyModal/MyModal";
import SuccesfullChanged from "./succesfullChanged";
import VisiblePositions from "./visiblePositions";

let Styles = styled.div`
  .wrapper {
    overflow-y: scroll;
    max-height: 400px;
  }

  .d-tree-head {
    border-left: 1px dashed grey;
  }

  .d-tree-container {
    list-style: none;
    padding: 0;
  }

  .d-tree-node {
    padding: 0.35rem 0.65rem;
  }

  .d-tree-node {
    margin: 0 0.85rem;
  }

  @media (max-width: 600px ) {
    .d-tree-node {
      margin: 0;

    }
  }

  .active {
    transform: rotate(45deg);
    transition: 0.5s;
  }

  .checkbox {
    position: absolute;
    right: 10px;
  }

`

const TreeList = (props) => {
  let history = useHistory()
  let RegisterURL = history.location.pathname
  let treeData = useSelector((state => state.Tree.Structure))
  let [newTreeFinal, setNewTreeFinal] = useState(false)
  let dispatch = useDispatch()
  const [positionVisibility, setPositionVisibility] = useState(false)
  let setPositions = () => {
    setPositionVisibility(v => !v)
  }
  useEffect(() => {
    if (RegisterURL === '/register') {
      return dispatch(TreeDataAC(treeData))
    }
  }, [treeData])


  if (treeData.length === 0) {
    return <Preloader/>
  }
  let newTreeFinalClose = () => {
    setNewTreeFinal(v => !v)
  }
  let setNewTree = () => {
    setNewTreeFinal(true)
    debugger
    dispatch(setNewUser(treeData))

  }


  return (
    <Styles>
      <div className={'d-flex justify-content-between wrapper'}>

        <div className="row">
          <div className="col ">
            <div className="mt-3">
              <div className="row mt-3 d-flex  ml-1">
                <div className="text-left text-dark">
                  <Tree data={treeData}
                        handleSetNodeValue={props.handleSetNodeValue}
                        handleSetDepValue={props.handleSetDepValue}
                        positionVisibility={positionVisibility}
                        setPositions={setPositionVisibility}
                        setModal={props.setModal}
                        ClickOnDepartment={props.ClickOnDepartment}
                        ClickOnExecutor={props.ClickOnExecutor}
                        isAppointment={props.isAppointment}
                        setChosenAppointments={props.setChosenAppointments}
                        setOpenTree={props.setOpenTree}
                        userInfoForAppoinment={props.userInfoForAppoinment}
                        ClickOnAuthor={props.ClickOnAuthor}
                        setUserControlOpen = {props.setUserControlOpen}
                        appointmentInformation = {props.appointmentInformation}
                        PositionValue = {props.PositionValue}
                        PositionReferenceId = {props.PositionReferenceId}


                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <VisiblePositions
          positionVisibility={positionVisibility}
          setPositions={setPositions}
        />
        <SuccesfullChanged
          newTreeFinalClose={newTreeFinalClose}
          newTreeFinal={newTreeFinal}
        />
      </div>
      {
        props.saveChanges !== false && RegisterURL === '/register' && <Button
          onClick={setNewTree}
          className={'mt-5 ml-5 mb-5'}

        >შენახვა</Button>
      }

    </Styles>

  );
};


export default TreeList;
