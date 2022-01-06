import React, {useEffect, useState} from "react";
import DocumentPage from "../Documents/DocumentPage";
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
  setAddBtnAC,
  setFinishDocAC
} from "../../Reducers/getDocReducer";
import {setFilteredDocAC} from "../../Reducers/filterReducer";
import {useLocation} from "react-router-dom";


const SignatureDocuments = () => {

  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
  let totalCount = useSelector(state => state.PaginationData.totalPages)
  let filtered = useSelector((state => state.filterR.filteredDocument))
  let MotionStatus = useSelector((state => state.MotionStatus.motionStatus))

  let dispatch = useDispatch()

  let location = useLocation()
  useEffect(() => {
    dispatch(setFilteredDocAC([]))
  }, [])

  useEffect(() => {
    dispatch(motionStatusAC(3))
    dispatch(getDocs({
      MotionStatus: 3,
      PageNumber: currentPage,
      RecordsPerPage: rowsPerPage,
      ...filtered
    }))
  }, [currentPage, rowsPerPage, location])


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
