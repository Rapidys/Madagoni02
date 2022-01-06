import React, {useEffect} from "react";
import DocumentPage from "../Documents/DocumentPage";
import {
  getDocs
} from "../../API/sentDocumentService";
import {useDispatch, useSelector} from "react-redux";
import {motionStatusAC} from "../../Reducers/MotionStatusReducer";
import {setCurrentPageAC} from "../../Reducers/PaginationReducer";
import {setVisibleBtnAC} from "../../Reducers/Comments/CommentsReducer";
import {
  approveBtnAC, setAddBtnAC,
  setCancelAC,
  setFinishDocAC
} from "../../Reducers/getDocReducer";
import {setIsBlockedAC} from "../../Reducers/signDocumentReducer";
import {useLocation} from "react-router-dom";


const CanceledDocuments = () => {

  let currentPage = useSelector((state => state.PaginationData.currentPage))
  let rowsPerPage = useSelector((state => state.PaginationData.rowsPerPage))
  let totalCount = useSelector((state => state.PaginationData.totalPages))
  let filtered = useSelector((state => state.filterR.filteredDocument))

  let location = useLocation()

  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(motionStatusAC(7))
    dispatch(getDocs({
      MotionStatus: 7,
      PageNumber: currentPage,
      RecordsPerPage: rowsPerPage,
      ...filtered,
    }))


  }, [currentPage, rowsPerPage,location])

  useEffect(() => {
    dispatch(setCurrentPageAC(1));
    dispatch(setVisibleBtnAC(false))
    dispatch(setAddBtnAC(false))
    dispatch(setFinishDocAC(false))
    dispatch(approveBtnAC(false))
    dispatch(setCancelAC(false))
    dispatch(setIsBlockedAC(false))

  }, [])

  let visirable = useSelector(state => state.GetDoc.documents)

  return (
    <DocumentPage
      pageTitle={'გაუქმებული დოკუმენტები'}
      pageName='/canceledDocument'
      Documents={visirable}
      totalCount={totalCount}
      rowsPerPage={rowsPerPage}
      currentPage={currentPage - 1}
    />
  )
};

export default CanceledDocuments;
