import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setDocumentColor} from "../Reducers/setDocumentColorReducer";
import styled from 'styled-components'

let Styles = styled.div`
  .colorBtnRed {
    background:#ff9999;
    color: black;
  }

  .colorBtnYellow {
    background: #ffe699;
  }

  .colorBtnGreen {
    background:  #99ff99;

  }
`

const RightClickMenu = ({x, y, showMenu, setShowMenu}) => {
  window.addEventListener('click', () => {
    return setShowMenu(false)
  })
  const style = () => {
    return {
      width: 80,
      height: 130,
      borderRadius: 10,
      background: '#6c757d',
      color: 'black',
      flexDirection: 'column',
      padding: 5,
      top: y,
      left: x,
      position: 'absolute',
      display: showMenu ? 'flex' : 'none',
      zIndex: 99999,

    }
  }
  const styles = {
    div: {
      flex: 1,
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      backGroundColor: 'green',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',

    },

  }
  let dispatch = useDispatch()
  let getId = useSelector(state => state.chosenDocument.uniqueId)
  const changeToRed = () => {
    document.getElementById(getId).style.backgroundColor = '#ffcccc';
    dispatch(setDocumentColor({
      documentId: getId,
      documentColorId: 1,
    }))
  }
  const changeToYellow = () => {
    document.getElementById(getId).style.backgroundColor = '#fff2cc';
    dispatch(setDocumentColor({
      documentId: getId,
      documentColorId: 2,
    }))
  }
  const changeToGreen = () => {
    document.getElementById(getId).style.backgroundColor = '#ccffcc';
    dispatch(setDocumentColor({
      documentId: getId,
      documentColorId: 3,
    }))
  }
  const changeToNonColor = () => {
    document.getElementById(getId).style.backgroundColor = 'white';
    dispatch(setDocumentColor({
      documentId: getId,
      documentColorId: 0,
    }))
  }
  return (
    <Styles>
      <div style={style()}>
        <div style={styles.div}
             className={"align-items-center colorBtnGreen"}
             onClick={changeToGreen}
        >
        </div>
        <div style={styles.div} className={"colorBtnYellow"}
             onClick={changeToYellow}
        >
        </div>
        <div style={styles.div} className={"colorBtnRed"}
             onClick={changeToRed}
        >

        </div>
        <div style={styles.div} className={"bg-white"}
             onClick={changeToNonColor}
        >???????????????
        </div>
      </div>

    </Styles>


  );
};


export default RightClickMenu;
