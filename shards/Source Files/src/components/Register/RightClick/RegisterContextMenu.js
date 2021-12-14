import React from 'react';

const RegisterContextMenu = ({x, y, showMenu}) => {
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
  return (

    <div style={style()}>
      <div style={styles.div}
           className={"align-items-center bg-danger"}

      >
        <span className={"mt-5"}>დეპარტამენტი</span>
      </div>
      <div style={styles.div} className={"bg-warning"}
      >
        <span>თანამშრომელი</span>
      </div>
      <div style={styles.div} className={"bg-success"}
      >
        <span>წაშლა</span>
      </div>
    </div>
  );
};

export default RegisterContextMenu;
