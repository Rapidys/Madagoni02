import React, {useCallback, useState} from 'react';
import Tree from "./Tree";
import styled from "styled-components";
import {Tooltip} from "@material-ui/core";
import RegisterModal from "../Register/RegisterModal";
import {useHistory} from "react-router-dom";
import UserChangesModal from "../Register/userChangesModal/userChangesModal";

let Styles = styled.span`
  .deletedDep {
    text-decoration: line-through;
  }

  .newDepColor {
    color: #ffc107;
  }

  .d-tree-head {
    border-left: 1px dashed black;
  }

  .positions {
    position: absolute;
    top: 19px;
    left: 0;
  }
`
const TreeNode = (props) => {

  let history = useHistory()
  let RegisterURL = history.location.pathname

  let [depValues, setDepValues] = useState({name: ''})
  let [open, SetOpen] = useState(false)
  let onClose = (e) => SetOpen(e => !e)
  let [userControlOpen, setUserControlOpen] = useState(false)
  let [userNewName, setUserNewName] = useState({name: '', lastName: ''})
  let [changedDepNames, setChangedDepNames] = useState('')
  let [Type, setType] = useState('')
  const [visibility, setVisibility] = useState(props.node.expand)

  //axali dokumentis sheqmnis destinate an visitor

  const setChosen = useCallback(
    () => {
      props.handleSetNodeValue && props.handleSetNodeValue({
          firstName: props.node.firstName,
          lastName: props.node.lastName,
          userId: props.node.userId,
          departmentId: props.node.departmentId,
        }
      )
    },

    [],
  );

  const setDepartment = () => {
    props.handleSetDepValue && props.handleSetDepValue({
      displayName: props.node.displayName,
      departmentId: props.node.departmentId,
    })

  }
  //axali dokumentis sheqmnis destinate an visitor


  // useris damateba departamentshi

  let addUserInDepartment = (e) => {
    SetOpen(true)
    setDepValues({...depValues, name: ''})

  }
  let controlClose = () => {
    setUserControlOpen(v => !v)
  }

// axali iuseris an departamentis chasma xeshi
  let addUser = (values) => {
    if (Type === 'ახალი თანამშრომელი') {
      let newUser = {
        userId: 0,
        firstName: values.name,
        lastName: values.lastName,
        email: values.email,
        isActive: true,
        departmentId: 0,
        department: null,
        positionid: 1,
        position: null
      }
      props.node.employes = [...props.node.employes, newUser]

    }
    if (Type === 'ახალი დეპარტამენტი') {
      let newDepartment = {
        departmentId: 0,
        parentId: 0,
        displayName: depValues.name,
        isActive: true,
        departments: [],
        employes: []
      }
      props.node.departments = [...props.node.departments, newDepartment]
    }
    SetOpen(false)
  }
// departamentis washla
  let deleteDepOrUser = () => {
    props.node.isActive = false
    SetOpen(false)

  }
//departamentis saxelis  shecvla
  let changeDepName = () => {
    props.node.displayName = changedDepNames
    setChangedDepNames('')
    SetOpen(false)
  }

  // useris washlis modali
  let userControl = () => {
    setUserControlOpen(true)
  }
  // useris washlis gilaki
  let delUser = () => {
    props.node.isActive = false
    setUserControlOpen(false)
  }
// useris saxeli shecvla

  let changeUserName = () => {
    props.node.firstName = userNewName.name
    props.node.lastName = userNewName.lastName
    setUserNewName({name: '', lastName: ''})
    setUserControlOpen(false)
  }
  const hasChild = props.node.departments ? true : false
  const hasEmployes = props.node.employes ? true : false
  return (
    <li className={"d-tree-node border-0"}>

      <RegisterModal
        onClose={onClose}
        addUser={addUser}
        open={open}
        setType={setType}
        Type={Type}
        setDepValues={setDepValues}
        depValues={depValues}
        deleteDepOrUser={deleteDepOrUser}
        changeDepName={changeDepName}
        changedDepNames={changedDepNames}
        setChangedDepNames={setChangedDepNames}
      />
      <UserChangesModal
        userControlOpen={userControlOpen}
        controlClose={controlClose}
        delUser={delUser}
        changeUserName={changeUserName}
        setUserNewName={setUserNewName}
        userNewName={userNewName}
      />


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
            ? <i
              className={props.node.departmentId === 0 ? 'text-success mr-2 mt-1 fas fa-university' : 'mr-2 mt-1 fas fa-university'}
              onClick={RegisterURL === '/register' ? addUserInDepartment : setDepartment}
              style={{cursor: 'pointer'}}
            />
            : <i
              className={props.node.userId === 0 ? "text-success ml-2 mr-2 mt-1 fas fa-user" : "ml-2 mr-2 mt-1 fas fa-user"}
              onClick={RegisterURL === '/register' ? userControl : setChosen}
              style={{cursor: 'pointer'}}
            />
          }
          <Styles>
              <span
                className={'ml-5 text-success positions'}>
                {props.positionVisibility && props.node.position}<
                /span>

          </Styles>

          {
            <span style={{cursor: 'pointer',}}>
                <Styles>

                   <span
                     onClick={RegisterURL === '/register' ? addUserInDepartment : setDepartment}
                     className={props.node.isActive === false ? "deletedDep " : "" &&
                     props.node.departmentId === 0 ? 'text-success' : ''
                     }
                     style={{
                       width: '50px',
                       overflowWrap: ' break-word',
                       whiteSpace: 'pre-wrap'
                     }}
                   >
                     {props.node.displayName}
                   </span>

                </Styles>
              <Tooltip
                title={<span style={{
                  color: 'white',
                  fontSize: '16px'
                }}>{props.node.position}</span>}
                arrow>
                     <span
                       style={{
                         textDecoration: props.node.isActive === false && 'line-through',
                         width: '50px',
                         overflowWrap: ' break-word',
                         whiteSpace: 'pre-wrap'
                       }}
                       onClick={RegisterURL === '/register' ? userControl : setChosen}
                       className={props.node.userId === 0 ? 'text-success' : ''}
                     >{props.node.firstName} {props.node.lastName}</span>
              </Tooltip>

            </span>


          }
        </div>
      </div>
      {hasEmployes && visibility && props.node.employes.map((empl, index) => {
        return <div className={"d-tree-content"} key={index}>
          <ul className={"d-flex d-tree-container flex-column"}>
            <Tree data={empl}
                  handleSetDepValue={props.handleSetDepValue}
                  handleSetNodeValue={props.handleSetNodeValue}
                  positionVisibility={props.positionVisibility}

            />
          </ul>
        </div>
      })
      }

      {hasChild && visibility && props.node.departments.map((dep, index) => {
        return <div className={"d-tree-content"} key={index}>
          <ul className={"d-flex d-tree-container flex-column"}>
            <Tree data={dep}
                  handleSetDepValue={props.handleSetDepValue}
                  handleSetNodeValue={props.handleSetNodeValue}
                  positionVisibility={props.positionVisibility}

            />
          </ul>
        </div>
      })}

    </li>

  );
};

export default TreeNode;
