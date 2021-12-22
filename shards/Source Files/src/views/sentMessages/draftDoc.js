import React, {useEffect, useState} from "react";
import DocumentPage from "../Documents/DocumentPage";
import {
  getDocs,
} from "../../API/sentDocumentService";
import {useDispatch, useSelector} from "react-redux";
import {motionStatusAC} from "../../Reducers/MotionStatusReducer";
import {isSendedDraftAC} from "../../Reducers/addNewPost/addNewPostReducer";
import DocCreateModal
  from "../../components/add-new-post/editor/BtnModals/docCreateModal";
import {
  approveBtnAC,
  setCancelAC,
  setFinishDocAC
} from "../../Reducers/getDocReducer";
import {setCurrentPageAC} from "../../Reducers/PaginationReducer";
import {setVisibleBtnAC} from "../../Reducers/Comments/CommentsReducer";


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
    dispatch(isSendedDraftAC(false))
    if (isSendedDraft === true) {
      setOpen(true)
    }
  }, [])

  let drafts = useSelector(state => state.GetDoc.documents)
  let isSendedDraft = useSelector(state => state.addNewPost.isSendedDraft)
  let getDocumentId = useSelector(state => state.addNewPost.documentId)
  let getDocumentDate = useSelector(state => state.addNewPost.documentDate)

  let [open, setOpen] = useState(false)
  let close = () => {
    setOpen((e) => !e)
  }


  return (
    open === true
      ? <DocCreateModal getDocumentDate={getDocumentDate}
                        getDocumentId={getDocumentId}
                        open={open}
                        close={close}/>
      :
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
