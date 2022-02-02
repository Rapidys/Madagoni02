import React, {useEffect, useMemo, useState} from 'react';
import {Button, Col, FormInput, Row} from "shards-react";
import TreeList from "../../../CompaignTree/TreeList";
import {useDispatch, useSelector} from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import ChosenDestinations from "./chosenPersons/ChosenDestinations";
import styled from "styled-components";
import {
  setMotionDest
} from "../../../../Reducers/addNewPost/DocumentMotionsReducer";
import {useHistory} from "react-router-dom";
import {
  getUpdateDestinatesAC
} from "../../../../Reducers/updateDocumentReducer";
import {
  setSuccessModalAC,
  updateAddressBook
} from "../../../../Reducers/addNewPost/AddressBooksReducer";
import MyModal from "../../../MyModal/MyModal";

let Styles = styled.div`
  .wrapper:first-child {
    padding-top: 0;
  }

  @media (max-width: 500px) {
    .wrapper {
      padding: 0;
      margin: 0 0 0 7px;
    }

    .modal-body {
      padding: 0;
    }

    .MuiTypography-h6 {
      font-size: 1rem;
    }
  }
`


const SideBarDestinations = (props) => {

  let history = useHistory()
  let url = history.location.pathname
  let [destination, setDestination] = useState([])
  let [valueFromTree, setValueFromTree] = useState([])
  let [department, setDepartment] = useState([])
  const [isBook, setIsBook] = useState(false)
  let [bookName, setBookName] = useState('')

  let addressBookId = useSelector((state => state.AddressBook.addressBookId))
  let addressBookName = useSelector((state => state.AddressBook.addressBookName))
  let successModal = useSelector((state => state.AddressBook.successModal))
  let [getValueFromBooks, setGetValueFromBooks] = useState([])

  let handleSetDate = (value, index) => {
    destination[index].dueDate = value
  }

  function handleSetNodeValue(value) {
    setValueFromTree(value)
  }


  function handleSetNodeValueForBook(value) {
    let rame = 0
    value.map((item, index) => {
      if (destination.length === 0) {
        console.log('hei')
        setDestination([...destination, ...value.map(item => ({
          targetName: item.targetName,
          userId: item.targetId,
          MotionStatusId: 1,
          DocumentMotionId: 0,
          MotionTypeId: 3,
          dueDate: null,
          TargetId: item.targetId
        }))])
      } else {
        destination.map(items => {
          if (items.TargetId === item.targetId) {
            return setDestination([...destination])
          } else {
            return setDestination([...destination, ...value.map(item => ({
              targetName: item.targetName,
              userId: item.targetId,
              MotionStatusId: 1,
              DocumentMotionId: 0,
              MotionTypeId: 3,
              dueDate: null,
              TargetId: item.targetId
            }))])
          }
        })
      }
    })
    // if (value) {
    //   for (let i = 0; i < destination.length; i++) {
    //     if (destination[i].userId === value[i].targetId) {
    //       rame = 1
    //     }
    //   }
    //   if (rame === 0) {
    //     setDestination([...destination, ...value.map(item => ({
    //       targetName: item.targetName,
    //       userId: item.targetId,
    //       MotionStatusId: 1,
    //       DocumentMotionId: 0,
    //       MotionTypeId: 3,
    //       dueDate: null,
    //       TargetId: item.targetId
    //     }))])
    //   }
    // }
  }

  function handleSetDepValue(value) {
    setDepartment(value)
  }

  let dispatch = useDispatch()
  useMemo(() => {

    let rame = 0
    let newDestinate = {
      targetName: valueFromTree.targetName,
      userId: valueFromTree.userId,
      DocumentMotionId: 0,
      MotionTypeId: 3,
      TargetId: valueFromTree.userId || valueFromTree.targetId,
      TargetTypeId: 1,
      MotionStatusId: 1,
      dueDate: null,
    }
    let newBook = {
      TargetId: valueFromTree.userId,
      targetName: valueFromTree.targetName,
      TargetTypeId: 1,
      userId: valueFromTree.userId,
    }


    if (valueFromTree.targetName || valueFromTree.firstName && valueFromTree.userId) {
      for (let i = 0; i < destination.length; i++) {
        if (destination[i].userId === valueFromTree.userId) {
          rame = 1
        }
      }
      if (rame === 0) {
        setDestination([...destination, isBook === false ? newDestinate : newBook])
      }
    }

  }, [valueFromTree])
  useEffect(() => {
    dispatch(getUpdateDestinatesAC(destination))
  }, [destination])

  useMemo(() => {
    let rame = 0
    let newDep = {
      displayName: department.displayName,
      departmentId: department.departmentId,
      MotionTypeId: 3,
      targetId: department.departmentId,
      MotionStatusId: 1,
      TargetTypeId: 2,
      dueDate: null,
    }
    let newDepForBook = {
      TargetId: department.departmentId,
      displayName: department.displayName,
      TargetName: department.displayName,
      departmentId: department.departmentId,
      TargetTypeId: 2,
    }
    if (department.displayName && department.departmentId) {
      for (let i = 0; i < destination.length; i++) {
        if (destination[i].displayName === department.displayName) {
          rame = 1
        }
      }
      if (rame === 0) {
        setDestination([...destination, isBook === false ? newDep : newDepForBook])

      }
    }
  }, [department])
  const save = () => {
    let authorMotion = {
      MotionTypeId: 1,
      MotionStatusId: 1,
      TargetId: 1,
      DocumentMotionId: 0,
      TargetTypeId: 1,
    }

    props.setChosenDestination(destination)
    dispatch(setMotionDest([authorMotion, ...destination]))
    props.handleClose()
  }

  let handleSaveBook = () => {
    let newBook = {
      addressBookId: addressBookId,
      addressBookName: addressBookName ? addressBookName : bookName,
      isActive: true,
      Targets: [...destination],
    }
    dispatch(updateAddressBook(newBook))
    setDestination([])

  }

  let treeData = useSelector((state => state.Tree.Structure))


  return (


    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth={true}
      maxWidth={"lg"}
      className={'wrapper'}
    >
      <Styles>

        <div className={'d-flex justify-content-between'}>
          <DialogTitle>სტრუქტურა</DialogTitle>
          <i className="fas fa-times p-4" style={{cursor: 'pointer'}}
             onClick={props.handleClose}/>
        </div>
        <DialogContent className={'wrapper'}>
          <DialogContentText>
            აირჩიეთ სასურველი ადრესატები
          </DialogContentText>

          <FormControl sx={{mt: 2, minWidth: 120}} className={"w-100"}>

            <MenuItem value="xl" style={{padding: 0}}>
              <Row className={"w-100"}>

                <Col lg="8" className={'treeCol'}>


                  <TreeList
                    treeData={treeData}
                    setTreeDatas={props.setTreeDatas}
                    handleSetNodeValue={handleSetNodeValue}
                    handleSetDepValue={handleSetDepValue}
                    isAppointment={false}
                    handleSetNodeValueForBook={handleSetNodeValueForBook}
                    isAddressBook={true}
                  />


                </Col>
                <Col lg="4" className={"border-left"}>
                  <MyModal
                    maxWidth={'sm'}
                    open={successModal}
                    onClose={() => dispatch(setSuccessModalAC())}
                  >
                    <div className={'d-flex align-items-center'}>
                      <i className="fas fa-check-circle"

                         style={{color: 'green', fontSize: '30px'}}/>
                      <span className={'ml-2'}>
                          წარმატებით შეიქმნა
                      </span>
                    </div>
                  </MyModal>
                  <div className={'mt-2'}>
                    {
                      isBook === true
                      &&
                      <Button
                        className={'mr-2'}
                        onClick={handleSaveBook}
                        disabled={!destination.length}
                      >შენახვა</Button>
                    }
                    <Button className={'float-right'}
                            onClick={() => setIsBook(v => !v)}
                    >ბუქის შექმნა</Button>
                  </div>


                  <div className={'pb-2 pt-2'}>
                    {
                      isBook === true &&
                      <FormInput
                        type='text'
                        placeholder={'ჯგუფის სახელი'}
                        className={'mt-2'}
                        value={addressBookName ? addressBookName : bookName}
                        onChange={(e) =>
                          setBookName(e.target.value)
                        }
                      />
                    }
                  </div>
                  <div>

                    <>
                      {isBook === false
                        ? <b>ადრესატები</b>
                        : <b>აირჩიეთ მომხმარებლები</b>
                      }
                      <div className={'position-relative'}>
                        <ChosenDestinations
                          destination={destination}
                          department={department}
                          setDepartment={setDepartment}
                          setDestination={setDestination}
                          handleSetDate={handleSetDate}
                          save={save}
                          isBook={isBook}
                        />

                      </div>


                    </>


                  </div>
                </Col>
              </Row>
            </MenuItem>
          </FormControl>

        </DialogContent>


        <DialogActions className={'footer'}>
          {url === '/add-new-post'
            ? <Button onClick={save}>შენახვა</Button>
            : <Button
              onClick={props.resendDocument}
              disabled={!destination.length && true}
            >გადაგზავნა</Button>
          }


        </DialogActions>
      </Styles>

    </Dialog>

  );
};


export default SideBarDestinations;
