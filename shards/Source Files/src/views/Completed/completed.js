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


const CompletedDocuments = () => {

  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
  let totalCount = useSelector(state => state.PaginationData.totalPages)


  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(motionStatusAC(6))
    dispatch(getDocs({
      MotionStatus: 6,
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

  let visirable = useSelector(state => state.GetDoc.documents)
  return (

    <DocumentPage
      pageTitle={'შესრულებული დოკუმენტები'}
      pageName='/completedDocument'
      Documents={visirable}
      totalCount={totalCount}
      rowsPerPage={rowsPerPage}
      currentPage={currentPage - 1}
    />


  )
};

export default CompletedDocuments;
