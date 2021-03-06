import React, {useEffect, useState} from 'react';
import SideBarVisitors from "../sideBarModalInfo/sideBarVisitors";
import SideBarDestinations from "../sideBarModalInfo/sideBarDestinations";
import styled from "styled-components";
import DocumentDestinates from "./chosenDestinations/documentDestinates";
import {useHistory} from "react-router-dom";
import ChosenInNewDoc from "./chosenDestinations/chosenInNewDoc";
import ChosenVisitorNewDoc from "./chosenVisitors/chosenVisitorNewDoc";
import ChosenVisitorDoc from "./chosenVisitors/chosenVisitorDoc";
import {TreeData} from "../../../../Reducers/TreeDataReducer";
import {useDispatch, useSelector} from "react-redux";


let Styles = styled.div`
  .circleClases {
    font-size: 18px;
    color: #ffc107;
    cursor: pointer;
    justify-content: center;
  }

  .circleClases:hover {
    color: #007bff;
  }

  @media (max-width: 500px) {
    .treeDialogContent {
      margin: 0;
      padding: 0;
    }
  }
`


const ChosenUsers = (props) => {
  let newTree = useSelector((state => state.Register.newUser))
  let dispatch = useDispatch()

  useEffect(async () => {
    return await dispatch(TreeData())
  }, [newTree])


  let history = useHistory()
  let url = history.location.pathname

  const [open, setOpen] = useState(false);
  const [openVisitors, setOpenVisitors] = useState(false);
  const [visibleDestinations, setVisibleDestinations] = useState(false)
  const [VisibleVisitors, setVisibleVisitors] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenVisitors = () => {
    setOpenVisitors(true);
  };
  const handleCloseVisitors = () => {
    setOpenVisitors(false);
  };
  return (
    <Styles>
      <div className={"mb-1"}>
        {url === '/add-new-post'
          ? <ChosenVisitorNewDoc
            handleOpenVisitors={handleOpenVisitors}
            chosenVisitor={props.chosenVisitor}
          />
          : <ChosenVisitorDoc
            handleOpenVisitors={handleOpenVisitors}
            chosenVisitor={props.chosenVisitor}
            VisibleVisitors={VisibleVisitors}
            setVisibleVisitors={setVisibleVisitors}
          />
        }


        <SideBarVisitors
          handleCloseVisitors={handleCloseVisitors}
          openVisitors={openVisitors}
          setChosenVisitor={props.setChosenVisitor}
          chosenVisitor={props.chosenVisitor}
        />
      </div>

      {/*addresants */
      }

      <div className={"mb-1"}>
        {url === '/add-new-post'
          ? <ChosenInNewDoc
            chosenDestination={props.chosenDestination}
            handleClickOpen={handleClickOpen}
          />
          : <DocumentDestinates
            setVisibleDestinations={setVisibleDestinations}
            visibleDestinations={visibleDestinations}
            handleClickOpen={handleClickOpen}
            chosenDestination={props.chosenDestination}
          />
        }

        <SideBarDestinations
          handleClose={handleClose}
          open={open}
          chosenDestination={props.chosenDestination}
          setChosenDestination={props.setChosenDestination}
        />

      </div>


    </Styles>
  )
    ;
};

export default ChosenUsers;
