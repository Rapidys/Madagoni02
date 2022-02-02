import React, {useEffect} from 'react';
import MyModal from "../../../../../components/MyModal/MyModal";
import TreeList from "../../../../../components/CompaignTree/TreeList";
import {useDispatch, useSelector} from "react-redux";
import {TreeData} from "../../../../../Reducers/TreeDataReducer";

const DivisionField = ({
                         divisionModal,
                         onCloseDivision,
                         setDivision,
                         setDivisionModal,
                         ...props
                       }) => {

  let dispatch = useDispatch()
  let newTree = useSelector((state => state.Register.newUser))

  useEffect(async () => {
    return await dispatch(TreeData())
  }, [newTree])

  return (
    <MyModal
      open={divisionModal}
      onClose={onCloseDivision}
      maxWidth={'sm'}

    >
      <TreeList
        setModal={setDivisionModal}
        ClickOnExecutor={false}
        ClickOnDepartment={true}
        isAppointment={false}

      />
    </MyModal>

  );
};

export default DivisionField;
