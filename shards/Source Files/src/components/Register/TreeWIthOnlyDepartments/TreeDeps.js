import styled from 'styled-components'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../../../Preloader/Preloader";
import {TreeData} from "../../../Reducers/TreeDataReducer";
import TreeR from "./TreeR";


let Styles = styled.div`
  .wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 300px;
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


`

const TreeDeps = (props) => {

  let treeData = useSelector((state => state.Tree.Structure))



  if (treeData.length === 0) {
    return <Preloader/>
  }

  return (
    <Styles>
      <div className={'d-flex justify-content-between wrapper'}>

        <div className="row">
          <div className="col ">
            <div className="mt-3">
              <div className="row mt-3 d-flex  ml-1">
                <div className="text-left text-dark">

                  <TreeR data={treeData}
                         getChosenDep={props.getChosenDep} values={props.values}
                         userInfoForAppoinment={props.userInfoForAppoinment}
                         PositionValue={props.PositionValue}
                         PositionReferenceId={props.PositionReferenceId}
                         setOpenTree={props.setOpenTree}
                         setChosenAppointments={props.setChosenAppointments}
                         getNodeEmployes = {props.getNodeEmployes}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Styles>

  );
};


export default TreeDeps;
