import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setDocumentColor} from "../Reducers/setDocumentColorReducer";
//
// let Styles = styled.div`
//   .colorBtnRed {
//     background: #ccffcc;
//     color: black;
//   }
//
//   .colorBtnYellow {
//     background: #fff2cc;
//   }
//
//   .colorBtnGreen {
//     background: #ffcccc;
//   }
// `

const RightClickMenu = ({x, y, showMenu}) => {
  const style = () => {
    return {
      width: 100,
      height: 150,
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

  return (

    <div style={style()}>
      <div style={styles.div}
           className={"align-items-center bg-danger"}
           onClick={changeToRed}
      >
        <span className={"mt-5"}> Red</span>
      </div>
      <div style={styles.div} className={"bg-warning"}
           onClick={changeToYellow}
      >
        <span>Yellow</span>
      </div>
      <div style={styles.div} className={"bg-success"}
           onClick={changeToGreen}
      >
        <span>green</span>
      </div>
    </div>


  );
};


export default RightClickMenu;
