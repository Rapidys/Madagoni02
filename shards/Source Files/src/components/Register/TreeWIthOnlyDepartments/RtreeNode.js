import React, {useState} from 'react';
import TreeR from "./TreeR";
import {TreeDataAC} from "../../../Reducers/TreeDataReducer";
import {useDispatch, useSelector} from "react-redux";

const RTreeNode = (props) => {

  const [visibility, setVisibility] = useState(props.node.expand)
  let treeData = useSelector((state => state.Tree.Structure))

  const hasChild = props.node.departments ? true : false
  let handleAppointment = () => {

    let newUser = {
      userId: 0,
      firstName: props.userInfoForAppoinment && props.userInfoForAppoinment.firstName,
      lastName: props.userInfoForAppoinment && props.userInfoForAppoinment.lastName,
      email: props.userInfoForAppoinment && props.userInfoForAppoinment.email,
      isActive: true,
      departmentId: 0,
      department: '',
      positionid: props.PositionReferenceId,
      position: props.PositionValue
    }

    props.node.employes = [...props.node.employes, newUser]
    props.setChosenAppointments(props.node.displayName)
    props.setOpenTree(false)
  }
  return (
    <li className={"d-tree-node border-0"}>


      <div className={"d-flex"}
      >

        {hasChild && (
          <div
            className={`d-inline d-tree-toggler `}>
            <i
              className={`fas fa-plus-square mr-2 ${visibility ? 'active' : ''}`}
              onClick={(e) => {
                setVisibility(v => !v)
              }}
            />

          </div>
        )}

        <div className={"col d-tree-head"}>
          {props.node.displayName
            && <span onClick={handleAppointment} style={{cursor: 'pointer'}}>
              <i
                className={'fas fa-university'}

              />
              <span className={'ml-2'}>{props.node.displayName}</span>
            </span>

          }


        </div>

      </div>

      {hasChild && visibility && props.node.departments.map((dep, index) => {
        return <div className={"d-tree-content"} key={index}>
          <ul className={"d-flex d-tree-container flex-column"}>
            <TreeR data={dep} getChosenDep={props.getChosenDep}
                   userInfoForAppoinment={props.userInfoForAppoinment}
                   PositionValue={props.PositionValue}
                   PositionReferenceId={props.PositionReferenceId}
                   setOpenTree={props.setOpenTree}
                   setChosenAppointments={props.setChosenAppointments}

            />
          </ul>
        </div>
      })}

    </li>

  );
};

export default RTreeNode;
