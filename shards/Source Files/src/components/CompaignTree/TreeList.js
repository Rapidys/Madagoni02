import Tree from "./Tree";
import styled from 'styled-components'
import React, {useEffect, useState} from "react";
import Preloader from "../../Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {TreeData} from "../../Reducers/TreeDataReducer";
import {Button, FormCheckbox} from "shards-react";
import {useHistory} from "react-router-dom";
import {setNewUser} from "../../Reducers/registerReducer";
import MyModal from "../MyModal/MyModal";

let Styles = styled.div`
  .wrapper {
    overflow-y: scroll;
    max-height: 430px;
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

  .active {
    transform: rotate(45deg);
    transition: 0.5s;
  }

  .checkbox {
    position: absolute;
    right: 10px;
  }

`

const TreeList = (props) => {
  let history = useHistory()
  let RegisterURL = history.location.pathname
  let treeData = useSelector((state => state.Tree.Structure))
  let [newTreeFinal, setNewTreeFinal] = useState(false)
  let dispatch = useDispatch()
  let newTree = useSelector((state => state.Register.newUser))
  const [positionVisibility, setPositionVisibility] = useState(false)
  let setPositions = () => {
    setPositionVisibility(v => !v)
  }
  useEffect(async () => {
    return await dispatch(TreeData())
  }, [newTree])

  if (props.treeData.length === 0) {
    return <Preloader/>
  }
  let newTreeFinalClose = () => {
    setNewTreeFinal(v => !v)
  }
  let setNewTree = () => {
    setNewTreeFinal(true)
    dispatch(setNewUser(treeData))

  }
  return (
    <Styles>
      <div className={'d-flex justify-content-between wrapper'}>

        <div className="row">
          <div className="col ">
            <div className="mt-3">
              <div className="row mt-3 d-flex  ml-1">
                <div className="text-left text-dark">
                  <Tree data={props.treeData}
                        handleSetNodeValue={props.handleSetNodeValue}
                        handleSetDepValue={props.handleSetDepValue}
                        positionVisibility={positionVisibility}
                  />

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={'checkbox mr-5'}>
          <FormCheckbox toggle small
                        checked={positionVisibility}
                        onChange={setPositions}
          >
            თანამდებობები
          </FormCheckbox>
        </div>
        <MyModal
          open={newTreeFinal}
          onClose={newTreeFinalClose}
          maxWidth={'sm'}
        >
          <div className={'d-flex align-items-center'}>
            <i className="fas fa-check-circle ml-3"
               style={{color: 'green', fontSize: '30px'}}/>
            <span className={'ml-4'}>წარმატებით შეიცვალა</span>
          </div>

        </MyModal>
      </div>
      {
        RegisterURL === '/register' && <Button
          onClick={setNewTree}
          className={'mt-5 ml-5 mb-5'}

        >შენახვა</Button>
      }

    </Styles>

  );
};


export default TreeList;
