import React, {useEffect} from "react";
import DocumentPage from "../Documents/DocumentPage";
import {
  getDocs,
} from "../../API/sentDocumentService";
import {useDispatch, useSelector} from "react-redux";
import {
  setCurrentPageAC
} from "../../Reducers/PaginationReducer";
import {setVisibleBtnAC} from "../../Reducers/Comments/CommentsReducer";
import {
  approveBtnAC, setAddBtnAC,
  setCancelAC,
  setFinishDocAC, setIsFinishedAC
} from "../../Reducers/getDocReducer";
import {useLocation} from "react-router-dom";




const CompletedDocuments = () => {

  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
  let totalCount = useSelector(state => state.PaginationData.totalPages)
  let filtered = useSelector((state => state.filterR.filteredDocument))



  let dispatch = useDispatch()

  let location = useLocation()

  useEffect(() => {

    dispatch(getDocs({
      MotionStatus: 6,
      PageNumber: currentPage,
      RecordsPerPage: rowsPerPage,
      ...filtered,
    }))


  }, [currentPage, rowsPerPage, location])

  useEffect(() => {
    dispatch(setCurrentPageAC(1));
    dispatch(setVisibleBtnAC(true)) // es memgoni zedmetia unda davtesto !!!
    dispatch(setFinishDocAC(false))
    dispatch(approveBtnAC(false))
    dispatch(setCancelAC(false))
    dispatch(setIsFinishedAC(false))
    dispatch(setAddBtnAC(true))
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
