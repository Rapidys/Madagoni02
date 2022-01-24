import {useEffect, useState} from "react";
import * as React from 'react';
import Spreadsheet from "react-spreadsheet";
import {Button, Form, FormInput} from "shards-react";
import {
  setChangePage,
  setCloseTreeAC, setOpenTreeAC, sharedValueUserAC, shareUsersAC, UpdateFile,
} from "../../../Reducers/files/UpdateFileReducer";
import {useDispatch, useSelector} from "react-redux";
import {TreeData} from "../../../Reducers/TreeDataReducer";
import {useHistory, useParams} from "react-router-dom";
import ShearUsersModal from "../shearUsers/shearUsersModal";
import {Tooltip} from "@material-ui/core";
import styled from 'styled-components'

let Styles = styled.div`
  .wrapper {
    height: 400px;
    overflow-y: scroll;
  }

  .forButtons {
    margin-left: 0.5rem;
  }

  .forButtons {
    @media (max-width: 477px) {
      display: block;
      margin-left: 0;
      margin-top: 5px;
    }
  }

`

const SpreadSheet = ({setData, data, fileInfo}) => {

  let dispatch = useDispatch()
  const [titleValue, setTitleValue] = useState(fileInfo ? fileInfo.fileTitle : '')
  let open = useSelector((state => state.updateFile.openTree))
  let params = useParams()
  let history = useHistory()
  let url = history.location.pathname

  let closeTree = () => {
    dispatch(setCloseTreeAC())
    if (url === '/newFile') {
      dispatch(setChangePage())
    }
  }
  let openTree = () => {
    dispatch(setOpenTreeAC())
  }
  useEffect(() => {
    dispatch(TreeData())
  }, [])


  let saveChanges = () => {
    let FileData = {
      fileId: params.id ? Number(params.id) : 0,
      fileTitle: titleValue,
      fileData: data,
      shareUsers: sharedUsers
    }
    dispatch(UpdateFile(FileData))
    dispatch(shareUsersAC(sharedUsers))
    dispatch(setChangePage()) // gaziarebaze daklikebisas masivi saidanac vigebt dashearebul userebs rom ganuldes
  }


  let sharedUsers = useSelector((state => state.updateFile.shareUsers))
  let valueFromTree = useSelector((state => state.updateFile.valueFromTree))


  let count = 0
  useEffect(() => {
    if (valueFromTree && valueFromTree[0]) {
      for (let i = 0; i < sharedUsers.length; i++) {
        if (sharedUsers[i].userId === valueFromTree[0].userId) {
          count = 1
        }
      }
      if (count === 0) {
        dispatch(shareUsersAC(valueFromTree))
      }
    }
  }, [valueFromTree])


  let addCol = () => {
    setData && setData([...data.map(item => {
      return [...item, {value: ''}]
    })])
  }
  let addRow = () => {
    setData && setData([...data, data[0].map(item => {
      return {value: ""}
    })])

  }
  let deleteRowCols = () => {
    setData([[{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
      [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}]])
  }
  return <Styles>

    <div style={{overflowX: 'scroll'}} className={'mt-3 wrapper'}>

      <div className={'d-flex justify-content-between'}>
        <Form>
          <FormInput placeholder="სათაური"
                     id="#username"
                     className={'mb-4'}
                     value={titleValue}
                     onChange={(e) => setTitleValue(e.target.value)}
          />
        </Form>

        <div>
          <Tooltip
            title={<div style={{
              color: 'white',
              fontSize: '16px',
              padding: '5px',
            }}>{sharedUsers && sharedUsers.map((item, index) => {
              {
                if (item.isActive === true) {
                  return <div className={'p-2'}
                              key={index}>{item.displayName}</div>
                }
              }
            })}</div>}
          >
            <Button className={'btn-primary ml-2'}
                    onClick={openTree}
            >
              გაზიარება
            </Button>
          </Tooltip>


          <ShearUsersModal
            onClose={closeTree}
            open={open}
            titleValue={titleValue}
            data={data}
            fileInfo={fileInfo}
          />
        </div>
      </div>

      <Spreadsheet data={data && data} onChange={setData && setData}/>

    </div>
    <div className={'mt-3'} style={{marginBottom: '20px'}}>
      <Button onClick={saveChanges} className={'btn-success'}
              disabled={titleValue === ''}
      >შენახვა
      </Button>
      <Button onClick={addCol} className={'btn-warning ml-2'}>სვეტის
        დამატება</Button>

      <Button onClick={addRow} className={'btn-primary forButtons'}>რიგის
        დამატება
      </Button>
      <Button
        onClick={deleteRowCols}
        className={'forButtons  btn-danger'}
      >
        წაშლა
      </Button>
      <div>

      </div>

    </div>


  </Styles>
};

export default SpreadSheet
