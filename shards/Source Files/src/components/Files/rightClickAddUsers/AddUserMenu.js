import React, {useEffect} from 'react';
import {TreeData} from "../../../Reducers/TreeDataReducer";
import {useDispatch} from "react-redux";
import MyModal from "../../MyModal/MyModal";
import TreeList from "../../CompaignTree/TreeList";

const AddUserMenu = ({openTree, onTreeClose,ColRows,setData}) => {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(TreeData())
  }, [])

  return (
    <MyModal
      maxWidth={'sm'}
      open={openTree}
      onClose={onTreeClose}
    >
      <TreeList
        isAppointment={false}
        isSharedUsers = {false}
        ColRows = {ColRows}
        setData = {setData}

      />
    </MyModal>
  );
};

export default AddUserMenu;
