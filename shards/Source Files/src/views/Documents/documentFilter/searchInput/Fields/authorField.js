import React, {useEffect} from 'react';
import {TextField} from "@mui/material";
import MyModal from "../../../../../components/MyModal/MyModal";
import TreeList from "../../../../../components/CompaignTree/TreeList";
import {useDispatch, useSelector} from "react-redux";
import {TreeData} from "../../../../../Reducers/TreeDataReducer";

const AuthorField = ({
                       AuthorModal,
                       onCloseAuthor,
                       setAuthorModal,
                       ...props
                     }) => {
  let dispatch = useDispatch()
  let newTree = useSelector((state => state.Register.newUser))

  useEffect(async () => {
    return await dispatch(TreeData())
  }, [newTree])


  return (
    <MyModal
      open={AuthorModal}
      onClose={onCloseAuthor}
      maxWidth={'sm'}

    >
      <TreeList
        setModal={setAuthorModal}
        ClickOnExecutor={false}
        ClickOnDepartment={false}
        isAppointment={false}
        ClickOnAuthor={true}

      />
    </MyModal>

  );
};

export default AuthorField;
