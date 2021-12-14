import RegisterContextMenu from "./RegisterContextMenu";

const RightClick = ({x, y, showMenu}) => {

  return (
    <>
      <RegisterContextMenu x={x} y={y} showMenu={showMenu}/>
    </>
  )
};

export default RightClick;
