import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMessagePage} from "../../../API/sentDocumentService";
import AddNewPost from "../../../components/add-new-post/addNewPost";
import MotionTypeFiltering from "../../motionTypeFiltering/motionTypeFiltering";
import {setVisibleBtnAC} from "../../../Reducers/Comments/CommentsReducer";
import {setCounter} from "../../../Reducers/folderCountersReducer";
import Preloader from "../../../Preloader/Preloader";
import {useHistory} from "react-router-dom";
import {btnFilter} from "./btnFilter";


const ChosenDocument = () => {
  let params = useParams()
  let pageId = params.id

  let dispatch = useDispatch()
  let chosen = useSelector(state => state.chosenDocument.currentMessagePage)
  let isLoading = useSelector(state => state.chosenDocument.isLoading)

  useEffect(() => {
    dispatch(getMessagePage(pageId))
    dispatch(setVisibleBtnAC(true))
    dispatch(setCounter())
  }, [pageId])


  const [documentTitle, setDocumentTitle] = useState('')
  const [documentBody, setDocumentBody] = useState('')
  const [chosenDestination, setchosenDestination] = useState([])
  const [chosenVisitor, setchosenVisitor] = useState([])
  const [defaultText, setDefaultText] = useState('something')

  useMemo(() => {
    setchosenDestination([])
    setchosenVisitor([])
  }, [pageId])

  let [documentType, setDocumentType] = useState()
  useMemo(() => {
    setDocumentTitle(chosen.documentTitle || '')
    setDocumentBody(chosen.documentBody + ('&nbsp') + defaultText)
    setDocumentType(chosen.documentType)
    MotionTypeFiltering(chosen, chosenDestination, chosenVisitor)
  }, [chosen])

  let MotionStatus = useSelector(state => state.MotionStatus.motionStatus)
  let history = useHistory()
  useEffect(() => {
    btnFilter(history, params, dispatch)
  }, [])
  return (
    <>
      {
        isLoading === true
          ? <Preloader/>
          : <AddNewPost
            title={``}
            chosenVisitor={chosenVisitor}
            chosenDestination={chosenDestination}
            setChosenDestination={setchosenDestination}
            setChosenVisitor={setchosenVisitor}
            documentTitle={documentTitle}
            setDocumentTitle={setDocumentTitle}
            documentBody={documentBody}
            documentType={documentType}
            draftBtn={MotionStatus === 0 ? 'lg-ml-3 xs-ml-0 border - 1 float-right' : 'd-none'}
            docId={`დოკუმენტის ნომერი :${chosen.documentId} `}
            Date={`${chosen.documentDate && chosen.documentDate.slice(0, 10)}`}
            isDisabledVisitor={false}
            isDisabledDestinate={false}
            readOnly={false}
            titleReadOnly={false}
          />
      }

    </>

  );
};


export default ChosenDocument;
