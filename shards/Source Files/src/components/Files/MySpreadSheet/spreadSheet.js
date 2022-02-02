import React, {useEffect, useState} from 'react';
import ReactTable from "./ReactTable";
import {Button} from "shards-react";
import {useDispatch, useSelector} from "react-redux";
import {
  setChangePage, setCloseTreeAC, setOpenTreeAC,
  shareUsersAC,
  UpdateFile
} from "../../../Reducers/files/UpdateFileReducer";
import {useHistory, useParams} from "react-router-dom";
import {TreeData} from "../../../Reducers/TreeDataReducer";
import FileNameAndShare from "./fileNameAndShare";
import jwt_decode from "jwt-decode";
import ReactTableContainer from "./ReactTable";

const SpreadSheet = ({data, setData, fileInfo}) => {

  let params = useParams()
  let [cursor, setCursor] = useState('cell')
  const [titleValue, setTitleValue] = useState(fileInfo ? fileInfo.fileTitle : '')
  const [fileBody, setFileBody] = useState(fileInfo ? fileInfo.fileBody : '')
  let open = useSelector((state => state.updateFile.openTree))
  let sharedUsers = useSelector((state => state.updateFile.shareUsers))
  let valueFromTree = useSelector((state => state.updateFile.valueFromTree))
  let history = useHistory()
  let url = history.location.pathname
  let dispatch = useDispatch()

  let token = localStorage.getItem('token')
  let decoded = jwt_decode(token)

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


  let handleResult = () => {
    let FileData = {
      fileId: params.id ? Number(params.id) : 0,
      fileTitle: titleValue,
      fileData: data,
      fileBody:fileBody,
      shareUsers: sharedUsers
    }
    dispatch(UpdateFile(FileData))
    dispatch(shareUsersAC(sharedUsers))
    dispatch(setChangePage()) // gaziarebaze daklikebisas masivi saidanac vigebt dashearebul userebs rom ganuldes
  }


  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let addCol = () => {
    setData([...data, [...data[0].map(item => ({
      users: [],
      value: ''
    }))]])
  }
  let addRow = () => {
    setData([...data.map(item => [...item, {
      users: [],
      value: ''
    }])])
  }

  const changeCursor = () => {
    setCursor(prevState => {
      if (prevState === 'cell') {
        return 'pointer';
      }
      return 'cell';
    });
  }

  let handleChange = (e, inpIndex, index,) => {
    const values = [...data]
    values[index][inpIndex].value = e.target.value
    setData(values)
  }


  return (
    <>
      <FileNameAndShare
        titleValue={titleValue}
        setTitleValue={setTitleValue}
        sharedUsers={sharedUsers}
        openTree={openTree}
        closeTree={closeTree}
        data={data}
        fileInfo={fileInfo}
        setData={setData}
        open={open}
        fileBody={fileBody}
        setFileBody={setFileBody}
      />

      <ReactTableContainer ColRows={data} resizable={true} resizerOptions={{}}
                           handleChange={handleChange}
                           alphabet={alphabet}
                           cursor={cursor}
                           changeCursor={changeCursor}
                           setData={setData}
                           url = {url}
                           decodedToken = {decoded}
                           fileInfo = {fileInfo}

      />

      <div className={'mt-2'}>
        <Button
          className={'btn-success mr-2'}
          onClick={handleResult}
          disabled={titleValue === '' && true}
        >
          შენახვა
        </Button>
        <Button
          onClick={addCol}
          className={'btn-warning mr-2'}
          style={{marginRight: '10px'}}
        >რიგის დამატება
        </Button>
        <Button
          onClick={addRow}
          className={'btn-danger mr-2'}
          style={{marginRight: '10px'}}


        >სვეტის დამატება
        </Button>

      </div>

      {/*<TableGrid/>*/}
    </>

  );
};

export default SpreadSheet;
