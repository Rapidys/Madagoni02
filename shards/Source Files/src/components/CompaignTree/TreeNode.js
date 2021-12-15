import React, {useCallback, useState} from 'react';
import Tree from "./Tree";
import styled from "styled-components";
import {Tooltip} from "@material-ui/core";
import {setNewUser} from "../../Reducers/registerReducer";
import {useDispatch, useSelector} from "react-redux";
import RegisterModal from "../Register/RegisterModal";
import MyModal from "../MyModal/MyModal";
import {Button} from "shards-react";
import {useHistory} from "react-router-dom";

let Styles = styled.span`
  .nameWrapper {
    max-width: 150px;
    overflow-wrap: break-word;
    white-space: pre-wrap;

  }


`
const TreeNode = (props) => {

  let history = useHistory()
  let RegisterURL = history.location.pathname

  let [depValues, setDepValues] = useState({name: ''})
  let [open, SetOpen] = useState(false)
  let onClose = (e) => SetOpen(e => !e)
  let [userControlOpen, setUserControlOpen] = useState(false)
  let [Type, setType] = useState('')
  const [visibility, setVisibility] = useState(props.node.expand)
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

  let addUserInDepartment = (e) => {
    SetOpen(true)
    setDepValues({...depValues, name: ''})

  }
  let controlClose = () => {
    setUserControlOpen(v => !v)
  }


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

  let deleteDepOrUser = () => {
    props.node.isActive = false
  }
  let userControl = () => {
    setUserControlOpen(true)
  }
  let delUser = () => {
    props.node.isActive = false
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
      />
      <MyModal
        open={userControlOpen}
        onClose={controlClose}
        title={'თანამშრომლის წაშლა'}
      >
        <Button className={'bg-danger d-flex  m-auto'}
                onClick={delUser}
        >წაშლა</Button>
      </MyModal>
      <div className={"d-flex"}
      >

        {hasChild && (
          <div
            className={`d-inline d-tree-toggler ${visibility ? 'active' : ''}`}>
            <i className="fas fa-plus-square mr-2"
               onClick={(e) => {
                 setVisibility(v => !v)
               }}
            />

          </div>
        )}

        <div className={"col d-tree-head"}>
          {props.node.displayName
            ? <i className="mr-2 mt-1 fas fa-university"/>
            : <i className="ml-2 mr-2 mt-1 fas fa-user"/>
          }


          {
            <span>
                <Styles>
                   <span
                     onClick={RegisterURL === '/register' ? addUserInDepartment : setDepartment}
                     className={"nameWrapper"}
                   >{props.node.displayName}</span>
                </Styles>
              <Tooltip
                title={<span style={{
                  color: 'white',
                  fontSize: '16px'
                }}>{props.node.position}</span>}
                arrow>
                     <span
                       style={{cursor: "pointer"}}
                       onClick={RegisterURL === '/register' ? userControl : setChosen}
                     >{props.node.firstName} {props.node.lastName}</span>
              </Tooltip>

              <span
                className={'ml-5 text-danger'}>{props.positionVisibility && props.node.position}</span>
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
