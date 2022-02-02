import React, {useState} from 'react';
import TreeNode from "./TreeNode";

const Tree = (props) => {


  return (
    <div className={"d-tree"}>

      <ul className={"d-flex d-tree-container flex-column"}>
        <TreeNode node={props.data}
                  handleSetNodeValue={props.handleSetNodeValue}
                  handleSetDepValue={props.handleSetDepValue}
                  positionVisibility={props.positionVisibility}
                  setPositions = {props.setPositions}
                  setModal={props.setModal}
                  ClickOnDepartment = {props.ClickOnDepartment}
                  ClickOnExecutor = {props.ClickOnExecutor}
                  isAppointment = {props.isAppointment}
                  setChosenAppointments = {props.setChosenAppointments}
                  setOpenTree={props.setOpenTree}
                  userInfoForAppoinment = {props.userInfoForAppoinment}
                  ClickOnAuthor={props.ClickOnAuthor}
                  setUserControlOpen = {props.setUserControlOpen}
                  appointmentInformation = {props.appointmentInformation}
                  PositionValue = {props.PositionValue}
                  PositionReferenceId = {props.PositionReferenceId}
                  isSharedUsers = {props.isSharedUsers}
                  ColRows = {props.ColRows} // filesData
                  setData = {props.setData} // filesData

        />


      </ul>
    </div>
  );
};


export default Tree;
