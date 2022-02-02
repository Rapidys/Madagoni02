import React, {useCallback} from 'react';
import MyModal from "../../MyModal/MyModal";
import {useSelector} from "react-redux";
import {Button} from "shards-react";

const DeleteUsersFromArray = ({onClose, open, ColRows, setData}) => {
  let asideFileIndex = useSelector((state => state.newFile.asideIndex))
  let insideIndex = useSelector((state => state.newFile.insideIndex))
  let values = [...ColRows]


  let deleteUser = useCallback(async (id) => {
    values[asideFileIndex][insideIndex].users = values[asideFileIndex][insideIndex].users.filter(item => item.userId !== id)

    setData(values)
  }, [values])



  return (
    <MyModal
      maxWidth={'sm'}
      onClose={onClose}
      open={open}
      title={'წაშლა'}
    >
      <div>
        {asideFileIndex !== -1 && insideIndex !== -1 &&
          values[asideFileIndex][insideIndex] && values[asideFileIndex][insideIndex].users.map((item,index) => {
            return <div className={'d-flex justify-content-between p-2'} key={index}>
              <div>{item.displayName}</div>
              <Button className={'btn-danger'}
                      onClick={() => deleteUser(item.userId)}
              >წაშლა</Button>
            </div>
          })
        }
      </div>
    </MyModal>
  );
};

export default React.memo(DeleteUsersFromArray);
