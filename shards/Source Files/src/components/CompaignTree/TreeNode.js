import React, {useCallback, useState} from 'react';
import Tree from "./Tree";
import styled from "styled-components";
import {Tooltip} from "@material-ui/core";
import RegisterModal from "../Register/RegisterModal";
import {useHistory, useParams} from "react-router-dom";
import UserChangesModal from "../Register/userChangesModal/userChangesModal";
import {useDispatch, useSelector} from "react-redux";
import {
  setAuthorIdAC,
  setDivisionIdAC,
  setExecutorIdAC
} from "../../Reducers/filterReducer";
import {setNewUser} from "../../Reducers/registerReducer";
import {TreeDataAC} from "../../Reducers/TreeDataReducer";


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
    top: -10px;
    left: -5px;
    font-size: 12px;
  }
`
const TreeNode = (props) => {

  let history = useHistory()
  let URL = history.location.pathname
  let treeData = useSelector((state => state.Tree.Structure))
  let params = useParams()
  let [depValues, setDepValues] = useState({name: ''})
  let [open, SetOpen] = useState(false)
  let onClose = (e) => SetOpen(e => !e)
  let [userControlOpen, setUserControlOpen] = useState(false)
  let [changedDepNames, setChangedDepNames] = useState('')
  let [Type, setType] = useState('')
  let [positonName, setPositonName] = useState('')
  const [visibility, setVisibility] = useState(props.node.expand)
  let [PositionValue, setPositionValue] = useState(props.node.position || '')
  let [PositionReferenceId, setPositionReferenceId] = useState(props.node.positionid || null)
  let [applyAppointmentChanges, setApplyAppointmentChanges] = useState(false)

  let dispatch = useDispatch()

  //axali dokumentis sheqmnis destinate an visitor

  let getPositionReferenceId = (referenceId) => {
    setPositionReferenceId(referenceId)
  }

  const setChosen = () => {
    props.handleSetNodeValue && props.handleSetNodeValue({
        firstName: props.node.firstName,
        lastName: props.node.lastName,
        userId: props.node.userId,
        departmentId: props.node.departmentId,
      }
    )
  }


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

  // gadanishvna


  let userAppointment = () => {
    props.node.isActive = false
    dispatch(TreeDataAC(treeData))

  }
// arsebul userze cvlilebebi


  let changeUserOptions = (userNewInfo) => {
    props.node.firstName = userNewInfo.name
    props.node.lastName = userNewInfo.lastName
    props.node.position = PositionValue
    props.node.positionid = PositionReferenceId
    props.node.email = userNewInfo.email
    props.node.phone = String(userNewInfo.mobile)

    // dispatch(TreeDataAC(treeData))
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
        phone: String(values.mobile),
        positionid: PositionReferenceId,
        position: PositionValue
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

  let onDisplayNameClick = () => {
    if (URL === '/register' && props.isAppointment === false) {
      addUserInDepartment()
    }
    if (URL === '/add-new-post') {
      setDepartment()
    }
    if (props.ClickOnDepartment && props.ClickOnDepartment === true) {
      dispatch(setDivisionIdAC({
        id: props.node.departmentId,
        displayName: props.node.displayName
      }))
      props.setModal(false)
    }
    if (props.isAppointment === true) {

      let newUser = {
        userId: 0,
        firstName: props.appointmentInformation && props.appointmentInformation.name,
        lastName: props.appointmentInformation && props.appointmentInformation.lastName,
        email: props.appointmentInformation && props.appointmentInformation.email,
        phone: props.appointmentInformation && String(props.appointmentInformation.phone),
        isActive: true,
        departmentId: 0,
        department: null,
        positionid: props.PositionReferenceId,
        position: props.PositionValue
      }

      props.setChosenAppointments && props.setChosenAppointments(props.node.displayName)
      props.setOpenTree && props.setOpenTree(false)
      props.setUserControlOpen && props.setUserControlOpen(false)
      props.node.employes = [...props.node.employes, newUser]
      dispatch(setNewUser(treeData))

    }
  }
  let onUserClick = () => {
    if (URL === '/register' && props.isAppointment === false) {
      userControl()
    }
    if (URL === '/add-new-post' || `/incomingDocument/${params}`) {
      setChosen()
    }
    if (props.ClickOnExecutor === true) {
      dispatch(setExecutorIdAC({
        id: props.node.userId,
        displayName: props.node.firstName + ' ' + props.node.lastName
      }))
      props.setModal(false)
    }
    if (props.ClickOnAuthor === true) {
      dispatch(setAuthorIdAC({
        id: props.node.userId,
        displayName: props.node.firstName + ' ' + props.node.lastName
      }))
      props.setModal(false)
    }
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
        PositionValue={PositionValue}
        setPositionValue={setPositionValue}
        getPositionReferenceId={getPositionReferenceId}
      />
      <UserChangesModal
        userControlOpen={userControlOpen}
        controlClose={controlClose}
        delUser={delUser}
        positonName={positonName}
        setPositonName={setPositonName}
        PositionValue={PositionValue}
        setPositionValue={setPositionValue}
        getPositionReferenceId={getPositionReferenceId}
        PositionReferenceId={PositionReferenceId}
        setUserControlOpen={setUserControlOpen}
        userInfoForAppoinment={props.node}
        userAppointment={userAppointment}
        applyAppointmentChanges={applyAppointmentChanges}
        setApplyAppointmentChanges={setApplyAppointmentChanges}
        onDisplayNameClick={onDisplayNameClick}
        changeUserOptions={changeUserOptions}

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
              onClick={onDisplayNameClick}
              style={{cursor: 'pointer'}}
            />
            : <i
              className={props.node.userId === 0 ? "text-success ml-2 mr-2 mt-1 fas fa-user" : "ml-2 mr-2 mt-1 fas fa-user"}
              onClick={onUserClick}
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
                     onClick={onDisplayNameClick}
                     className={props.node.isActive === false ? "deletedDep " : "" &&
                     props.node.departmentId === 0 ? 'text-success' : ''
                     }
                     style={{
                       width: '50px',
                       overflowWrap: ' break-word',
                       whiteSpace: 'pre-wrap',
                       color: props.node.departmentId === 0 && '#17c671'
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
                         overflowWrap: 'break-word',
                         whiteSpace: 'pre-wrap'
                       }}
                       onClick={onUserClick}
                       className={props.node.userId === 0 ? 'text-success' : ''}
                     >{props.node.firstName} {props.node.lastName}</span>
              </Tooltip>

            </span>


          }
        </div>
      </div>
      {props.isAppointment === false && hasEmployes && visibility && props.node.employes.map((empl, index) => {
        return <div className={"d-tree-content"} key={index}>
          <ul className={"d-flex d-tree-container flex-column"}>
            <Tree data={empl}
                  handleSetDepValue={props.handleSetDepValue}
                  handleSetNodeValue={props.handleSetNodeValue}
                  positionVisibility={props.positionVisibility}
                  ClickOnExecutor={props.ClickOnExecutor}
                  ClickOnAuthor={props.ClickOnAuthor}
                  setModal={props.setModal}
                  isAppointment={props.isAppointment}
                  setChosenAppointments={props.setChosenAppointments}
                  setApplyAppointmentChanges={props.setApplyAppointmentChanges}
                  setUserControlOpen={props.setUserControlOpen}
                  appointmentInformation={props.appointmentInformation}
                  PositionValue={props.PositionValue}
                  PositionReferenceId={props.PositionReferenceId}
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
                  setPositionVisibility={props.setPositionVisibility}
                  setModal={props.setModal}
                  ClickOnDepartment={props.ClickOnDepartment}
                  isAppointment={props.isAppointment}
                  setChosenAppointments={props.setChosenAppointments}
                  setOpenTree={props.setOpenTree}
                  userInfoForAppoinment={props.userInfoForAppoinment}
                  setApplyAppointmentChanges={props.setApplyAppointmentChanges}
                  setUserControlOpen={props.setUserControlOpen}
                  appointmentInformation={props.appointmentInformation}
                  PositionValue={props.PositionValue}
                  PositionReferenceId={props.PositionReferenceId}

            />
          </ul>
        </div>
      })}

    </li>

  );
};

export default TreeNode;
