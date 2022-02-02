import RightClickMenu from "./RightClickMenu";

const RightClick = ({x, y, showMenu}) => {

  return (
    <>
      <RightClickMenu x={x} y={y} showMenu={showMenu}/>
    </>
  )
};

export default RightClick;
