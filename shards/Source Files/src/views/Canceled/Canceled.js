import React, {useEffect} from "react";
import DocumentPage from "../DraftMessages/Documents/DocumentPage";
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


const CanceledDocuments = () => {

  let currentPage = useSelector((state => state.PaginationData.currentPage))
  let rowsPerPage = useSelector((state => state.PaginationData.rowsPerPage))
  let totalCount = useSelector((state => state.PaginationData.totalPages))


  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(motionStatusAC(4))
    dispatch(getDocs({
      MotionStatus: 7,  // ეს აიდი არის ხელმოწერილების
      PageNumber: currentPage,
      RecordsPerPage: rowsPerPage,
    }))


  }, [currentPage, rowsPerPage])

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
