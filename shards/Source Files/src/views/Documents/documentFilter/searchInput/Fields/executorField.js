import React, {useEffect} from 'react';
import MyModal from "../../../../../components/MyModal/MyModal";
import TreeList from "../../../../../components/CompaignTree/TreeList";
import {useDispatch, useSelector} from "react-redux";
import {TreeData} from "../../../../../Reducers/TreeDataReducer";

const ExecutorField = ({
                         executor,
                         setExecutorModal,
                         onCloseExecutor,
                         ...props
                       }) => {

  let dispatch = useDispatch()
  let newTree = useSelector((state => state.Register.newUser))

  useEffect(async () => {
    return await dispatch(TreeData())
  }, [newTree])


  return (
    <MyModal
      open={executor}
      onClose={onCloseExecutor}
      maxWidth={'sm'}

    >
      <TreeList
        ClickOnExecutor={true}
        ClickOnDepartment={false}
        setModal={setExecutorModal}
        isAppointment={false}
        ClickOnAuthor={false}

      />
    </MyModal>
  );
};

export default ExecutorField;
