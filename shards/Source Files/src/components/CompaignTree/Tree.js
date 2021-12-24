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
                  setDivisionModal = {props.setDivisionModal}

        />


      </ul>
    </div>
  );
};


export default Tree;
