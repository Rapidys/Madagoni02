import React, {useEffect, useState} from "react";


import AddNewPost from "./addNewPost";
import {useDispatch} from "react-redux";
import {getType} from "../../Reducers/addNewPost/selectDocReducer";
import {
  setVisibleBtnAC
} from "../../Reducers/Comments/CommentsReducer";
import {
  approveBtnAC,
  setAddBtnAC, setCancelAC,
  setFinishDocAC
} from "../../Reducers/getDocReducer";


const NewPostSection = () => {
  let dispatch = useDispatch()
  const [documentTitle, setDocumentTitle] = useState('')
  const [defaultText, setDefaultText] = useState('something')

  const [documentBody, setDocumentBody] = useState('<p></p>+<p>defaultText</p>')

  useEffect(() => {
    dispatch(getType())
    dispatch(setVisibleBtnAC(false)) //hidden comment btn in addNewPostComponents
    dispatch(setFinishDocAC(false))
    dispatch(setAddBtnAC(true))
    dispatch(approveBtnAC(false))
    dispatch(setCancelAC(false))
  }, [])
  let [chosenDestination, setChosenDestination] = useState([])
  let [chosenVisitor, setChosenVisitor] = useState([])
  return (

    <AddNewPost
      title={'დოკუმენტის შექმნა'}
      setDocumentTitle={setDocumentTitle}
      documentTitle={documentTitle}
      setDocumentBody={setDocumentBody}
      documentBody={documentBody}
      chosenVisitor={chosenVisitor}
      setChosenVisitor={setChosenVisitor}
      chosenDestination={chosenDestination}
      setChosenDestination={setChosenDestination}
      documentType={'დოკუმენტის ტიპი'}
      approve={'d-none'}
      draftBtn={'border - 1 float-right'}
      addBtn={'border - 1'}
      isDisabledVisitor={false}
      isDisabledDestinate={false}
    />

  )
};

export default NewPostSection;
