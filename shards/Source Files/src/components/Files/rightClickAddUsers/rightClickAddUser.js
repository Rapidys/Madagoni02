import React from 'react';
import RightUserMenu from "./rightClickUserMenu";

const RightClickAddUser = ({
                             x,
                             y,
                             showMenu,
                             onOpenTree,
                             onOpenUsersController
                           }) => {
  return (
    <>
      <RightUserMenu x={x} y={y} showMenu={showMenu} onOpenTree={onOpenTree}
                     onOpenUsersController={onOpenUsersController}/>
    </>
  );
};

export default RightClickAddUser;
