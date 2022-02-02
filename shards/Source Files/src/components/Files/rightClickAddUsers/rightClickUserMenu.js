import React from 'react';
import {useHistory} from "react-router-dom";

const RightUserMenu = ({x, y, showMenu, onOpenTree, onOpenUsersController}) => {


  const style = () => {
    return {
      width: 80,
      height: 'auto',
      borderRadius: 10,
      background: '#e1e5eb',
      color: 'black',
      flexDirection: 'column',
      top: y,
      left: x,
      position: 'absolute',
      display: showMenu ? 'flex' : 'none',
      zIndex: 99999,
      alignItems: 'center',
      fontSize: '12px',
      cursor: 'pointer'
    }
  }


  return (
    <div style={style()}>
      <div
        className={'w-100 h-50  d-flex justify-content-between align-items-center p-2'}
        style={{borderTopRightRadius: '10px', borderTopLeftRadius: '10px'}}
        onClick={onOpenTree}
      >
        <i className="fas fa-users"/>
        <div>
          არჩევა
        </div>


      </div>
      <div
        className={"w-100 h-50 d-flex justify-content-between align-items-center p-2"}
        style={{
          borderBottomRightRadius: '10px',
          borderBottomLeftRadius: '10px'
        }}
        onClick={onOpenUsersController}
      >
        <i className="far fa-trash-alt"/>
        <div
          onClick={onOpenUsersController}
        >
          წაშლა
        </div>
      </div>

    </div>


  );
};


export default RightUserMenu;
