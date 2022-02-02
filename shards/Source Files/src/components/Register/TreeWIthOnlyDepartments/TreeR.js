import React from 'react';
import RTreeNode from "./RtreeNode";

const TreeR = (props) => {

  return (
    <div className={"d-tree"}>

      <ul className={"d-flex d-tree-container flex-column"}>

        <RTreeNode node={props.data} getChosenDep={props.getChosenDep}
                  userInfoForAppoinment={props.userInfoForAppoinment}
                  PositionValue={props.PositionValue}
                  PositionReferenceId={props.PositionReferenceId}
                  setOpenTree = {props.setOpenTree}
                  setChosenAppointments = {props.setChosenAppointments}
        />


      </ul>
    </div>
  );
};


export default TreeR;
