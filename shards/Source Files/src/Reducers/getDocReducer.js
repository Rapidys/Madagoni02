import API from "../API/ApiBase";

let initialState = {
  documents: [],
  finishDocument: false,
  approveBtn: false,
  addBtn: false,
  isLoading: false,
  Options: null,
  selectedDocId: 1,
  isFinished: false,
  cancel: false,
}

let setGetDoc = 'setGetDoc'
let setFinishDoc = 'FINISH-DOC'
let setDocLoading = 'setDocLoading'
let setApproveBtn = 'setApproveBtn'
let setAddBtn = 'setAddBtn'
let setOptions = 'SET-FINISH-OPTIONS'
let setSelectedDocId = 'setSelectedDocId'
let setIsFinished = 'setIsFinished'
let setCancel = 'SET-CANCEL'

let GetDocReducer = (state = initialState, action) => {
  switch (action.type) {
    case setGetDoc: {
      return {
        ...state,
        documents: action.doc
      }
    }
    case setFinishDoc: {
      return {
        ...state,
        finishDocument: action.setVisible
      }
    }
    case setDocLoading: {
      return {
        ...state,
        isLoading: action.loading
      }
    }
    case setApproveBtn: {
      return {
        ...state,
        approveBtn: action.setVisible
      }
    }
    case setAddBtn: {
      return {
        ...state,
        addBtn: action.setVisible
      }
    }
    case setOptions: {
      return {
        ...state,
        Options: action.options
      }
    }
    case setSelectedDocId: {
      return {
        ...state,
        selectedDocId: action.id
      }
    }
    case setIsFinished: {
      return {
        ...state,
        isFinished: action.finished
      }
    }
    case setCancel: {
      return {
        ...state,
        cancel: action.cancel
      }
    }


    default:
      return state
  }
}

export let GetDocumentAC = (doc) => ({type: setGetDoc, doc})
export let setFinishDocAC = (setVisible) => ({type: setFinishDoc, setVisible})
export let setDocLoadingAC = (loading) => ({type: setDocLoading, loading})
export let approveBtnAC = (setVisible) => ({type: setApproveBtn, setVisible})
export let setAddBtnAC = (setVisible) => ({type: setAddBtn, setVisible})
export let setFinishOptionsAC = (options) => ({type: setOptions, options})
export let setSelectedDocIdAC = (id) => ({type: setSelectedDocId, id})
export let setIsFinishedAC = (finished) => ({type: setIsFinished, finished})
export let setCancelAC = (cancel) => ({type: setCancel, cancel})


export default GetDocReducer


export let GetFinishDocument = (id, selectedInfo) => {
  return dispatch => {
    let CompleteMotion = {
      MotionId: selectedInfo,
      ResultComment: "შეძენილ იქნა ჰონდა სკაიჯეტი"
    }
    try {
      API.FinishDocument(id, CompleteMotion).then((response) => {
        dispatch(setIsFinishedAC(true))
      })
    } catch (e) {
      console.log(e)
    }

  }
}
