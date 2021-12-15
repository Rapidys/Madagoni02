import Tree from "./Tree";
import styled from 'styled-components'
import React, {useEffect, useState} from "react";
import Preloader from "../../Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {TreeData} from "../../Reducers/TreeDataReducer";
import {Button, FormCheckbox} from "shards-react";
import {useHistory} from "react-router-dom";

let Styles = styled.div`

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
  let dispatch = useDispatch()
  const [positionVisibility, setPositionVisibility] = useState(false)
  let setPositions = () => {
    setPositionVisibility(v => !v)
  }
  useEffect(async () => {
    return await dispatch(TreeData())
  }, [])

  if (props.treeData.length === 0) {
    return <Preloader/>
  }
  let setNewTree = () => {
    console.log(treeData)
    // dispatch(setNewUser(treeData))

  }
  return (
    <Styles>
      <div className={'d-flex justify-content-between'}>

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

        <div className={'checkbox'}>
          <FormCheckbox toggle small
                        checked={positionVisibility}
                        onChange={setPositions}
          >
            თანამდებობები
          </FormCheckbox>
        </div>
      </div>
      {
        RegisterURL === '/register' && <Button
          onClick={setNewTree}

        >შენახვა</Button>
      }

    </Styles>

  );
};


export default TreeList;
