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
import {setAddBtnAC, setFinishDocAC} from "../../Reducers/getDocReducer";
import {setIsBlockedAC} from "../../Reducers/signDocumentReducer";


const SignatureDocuments = () => {

  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
  let totalCount = useSelector(state => state.PaginationData.totalPages)


  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(motionStatusAC(3))
    dispatch(getDocs({
      MotionStatus: 3,
      PageNumber: currentPage,
      RecordsPerPage: rowsPerPage,
    }))


  }, [currentPage, rowsPerPage])

  useEffect(() => {
    dispatch(setCurrentPageAC(1));
    dispatch(setVisibleBtnAC(true))
    dispatch(setFinishDocAC(false))
    dispatch(setAddBtnAC(false))
  }, [])

  let visirable = useSelector(state => state.GetDoc.documents)


  return (
    <DocumentPage
      pageTitle={'დასადასტურებელი დოკუმენტები'}
      pageName='/signatureDocument'
      Documents={visirable}
      totalCount={totalCount}
      rowsPerPage={rowsPerPage}
      currentPage={currentPage - 1}
    />
  )
};

export default SignatureDocuments;
