import {setCurrentPageAC} from "../../Reducers/PaginationReducer";
import {setVisibleBtnAC} from "../../Reducers/Comments/CommentsReducer";
import {
  approveBtnAC,
  setCancelAC,
  setFinishDocAC
} from "../../Reducers/getDocReducer";

export let visibleOrUnvisible = (dispatch) => {
  dispatch(setCurrentPageAC(1));
  dispatch(setVisibleBtnAC(true))
  dispatch(setFinishDocAC(false))
  dispatch(approveBtnAC(false))
  dispatch(setCancelAC(false))
}
