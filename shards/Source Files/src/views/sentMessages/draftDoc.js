import React, {useEffect} from "react";
import DocumentPage from "../DraftMessages/Documents/DocumentPage";
import {
  getDocs,
} from "../../API/sentDocumentService";
import {useDispatch, useSelector} from "react-redux";
import {
  setCurrentPageAC
} from "../../Reducers/PaginationReducer";
import {motionStatusAC} from "../../Reducers/MotionStatusReducer";
import {setVisibleBtnAC} from "../../Reducers/Comments/CommentsReducer";
import {
  approveBtnAC,
  setCancelAC,
  setFinishDocAC
} from "../../Reducers/getDocReducer";


const DraftDocuments = () => {

  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
  let totalCount = useSelector(state => state.PaginationData.totalPages)


  let dispatch = useDispatch()
  useEffect(() => {

    dispatch(motionStatusAC(1))
    dispatch(getDocs({
      MotionStatus: 1,
      PageNumber: currentPage,
      RecordsPerPage: rowsPerPage,
    }))
  }, [currentPage, rowsPerPage])
  useEffect(() => {
    dispatch(setCurrentPageAC(1));
    dispatch(setVisibleBtnAC(true))
    dispatch(setFinishDocAC(false))
    dispatch(approveBtnAC(false))
    dispatch(setCancelAC(false))
  }, [])

  let drafts = useSelector(state => state.GetDoc.documents)


  return (
    <DocumentPage
      pageTitle={'დრაფტები'}
      pageName='/draftDocument'
      Documents={drafts}
      totalCount={totalCount}
      rowsPerPage={rowsPerPage}
      currentPage={currentPage - 1}
    />
  )
};

export default DraftDocuments;
