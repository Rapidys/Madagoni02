import {
  approveBtnAC,
  setAddBtnAC, setCancelAC,
  setFinishDocAC
} from "../../../Reducers/getDocReducer";


export let btnFilter = (history, params, dispatch) => {
  if (history.location.pathname === `/incomingDocument/${params.id}`) {
    dispatch(setFinishDocAC(true))
  }
  if (history.location.pathname === `/signatureDocument/${params.id}`) {
    dispatch(approveBtnAC(true))
    dispatch(setCancelAC(true))
  }
  if (history.location.pathname === `/draftDocument/${params.id}`) {
    dispatch(setAddBtnAC(true))
  }
  if (history.location.pathname === `/incomingDocument/${params.id}`) {
    dispatch(setAddBtnAC(true))
  }
  if (history.location.pathname === `/sentDocument/${params.id}`) {
    dispatch(setAddBtnAC(true))
  }

}

