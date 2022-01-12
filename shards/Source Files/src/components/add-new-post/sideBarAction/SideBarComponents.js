import React from 'react';
import {
  Button
} from "shards-react";
import Accordeons from "./acordeons/acordeons";

import Comments from "./Comments/Comments";
import ChosenUsers from "./chosenUsers/chosenUsers";
import {setModalVisible} from "../../../Reducers/Comments/CommentsReducer";
import {useDispatch, useSelector} from "react-redux";

const SideBarComponents = (props) => {


  let dispatch = useDispatch()

  const handleOpenComments = () => {
    dispatch(setModalVisible(true))
  };

  let isVisibleBtn = useSelector(state => state.getComments.isVisibleBtn)

  return (


    <div className={"acordWrapper"}>

      <div className={"mb-1"}>
        <Accordeons
          documentType={props.documentType}
          docId={props.docId}
          Date={props.Date}
        />
        <div className={!isVisibleBtn ? 'd-none' : ''}>
          <div className={"mb-1"}>
            <Button onClick={handleOpenComments}
                    className={"w-100"}

            >კომენტარები</Button>
            <Comments
              setVisible={props.setVisible}
            />
          </div>
        </div>


        {/*visitors*/}

      </div>


      <ChosenUsers
        setChosenVisitor={props.setChosenVisitor}
        chosenVisitor={props.chosenVisitor}
        chosenDestination={props.chosenDestination}
        setChosenDestination={props.setChosenDestination}
        isDisabledVisitor={props.isDisabledVisitor}
        isDisabledDestinate={props.isDisabledDestinate}
      />
    </div>

  );
};

export default SideBarComponents;
