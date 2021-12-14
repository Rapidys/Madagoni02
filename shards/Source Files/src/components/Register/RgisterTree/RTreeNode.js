import React, {useMemo, useState} from 'react';
import Tree from "./RTree";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import RegisterModal from "../RegisterModal";
import MyModal from "../../MyModal/MyModal";
import {Button} from "shards-react";
import {setNewUser} from "../../../Reducers/registerReducer";

let Styles = styled.span`
  .nameWrapper {
    max-width: 150px;
    overflow-wrap: break-word;
    white-space: pre-wrap;

  }

  .activeDep {
    color: yellow;
  }

  .dep {
    cursor: pointer;
  }

`


const TreeNode = (props) => {
  let treeData = useSelector((state => state.Tree.Structure))

  const [visibility, setVisibility] = useState(props.node.expand)
  let [values, setValues] = useState({name: '', lastName: '', email: '',})
  let [depValues, setDepValues] = useState({name: ''})
  let onClose = (e) => SetOpen(e => !e)
  let [open, SetOpen] = useState(false)
  let [userControlOpen, setUserControlOpen] = useState(false)
  let [Type, setType] = useState('')
  let dispatch = useDispatch()

  let addUserInDepartment = (e) => {
    SetOpen(true)
  }
  let controlClose = () => {
    setUserControlOpen(v => !v)
  }

  let addUser = () => {
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
      dispatch(setNewUser(treeData))

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
    dispatch(setNewUser(treeData))
  }


  let deleteDepOrUser = () => {
    props.node.isActive = false
    dispatch(setNewUser(treeData))
  }
  let userControl = () => {
    setUserControlOpen(true)
  }
  let delUser = () => {
    props.node.isActive = false
    dispatch(setNewUser(treeData))
  }
  const hasChild = !!props.node.departments
  const hasEmployes = !!props.node.employes
  return (
    <li className={"d-tree-node border-0"}>
      <RegisterModal
        onClose={onClose}
        values={values}
        setValues={setValues}
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
            className={`d-inline d-tree-toggler ${visibility? 'active' : ''}`}>
            <i
              className={`fas fa-plus-square mr-2 }`}
              onClick={(e) => {
                setVisibility(v => !v)
              }}
            />

          </div>
        )}

        <div className={"col d-tree-head"}>


          {
            <span>
                <Styles>
                 <div onClick={addUserInDepartment} className={'dep'}>
                    {props.node.displayName &&
                      <i
                        className={`mr-2 mt-1 fas fa-university ${open ? 'activeDep' : 'dep'}`}
                      />}
                   <span
                     className={"nameWrapper"}
                   >{props.node.displayName}</span>
                 </div>

                </Styles>
              <div onClick={userControl}>
                {props.node.firstName &&
                  <i className="ml-2 mr-2 mt-1 fas fa-user"/>}
                <span
                  style={{cursor: "pointer"}}
                >{props.node.firstName} {props.node.lastName}</span>
              </div>

            </span>


          }
        </div>
      </div>

      {hasEmployes && visibility && props.node.employes.map(empl => {
        return <div className={"d-tree-content"} key={empl.userId}>
          <ul className={"d-flex d-tree-container flex-column"}>
            <Tree data={empl}
                  addUser={props.addUser}
                  newUser={props.newUser}

            />
          </ul>
        </div>
      })
      }
      {hasChild && visibility && props.node.departments.map(dep => {
        return <div className={"d-tree-content"} key={dep.departmentId}>
          <ul className={"d-flex d-tree-container flex-column"}>
            <Tree data={dep}
                  addUser={props.addUser}
                  newUser={props.newUser}
            />
          </ul>
        </div>
      })}

    </li>

  );
};

export default TreeNode;
