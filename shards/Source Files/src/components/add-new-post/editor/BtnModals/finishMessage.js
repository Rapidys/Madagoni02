import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setIsFinishedAC} from "../../../../Reducers/getDocReducer";
import MyModal from "../../../MyModal/MyModal";

const FinishMessage = () => {
  let isFinished = useSelector((state => state.GetDoc.isFinished))
  let dispatch = useDispatch()

  let onClose = () => {
    dispatch(setIsFinishedAC(false))
  }
  return (
    <MyModal
      open={isFinished}
      onClose={onClose}
      maxWidth={"sm"}
      title={'დასრულება'}
    >
      <i className="fas fa-check-circle"
         style={{color: 'green', fontSize: '30px'}}/>
      <span
        className={"ml-2"}>წარმატებით დასრულდა</span>

    </MyModal>

  );
};

export default FinishMessage;
