import React, {useState} from 'react';
import {
  setBookIdAC,
  setBookNameAC, setDeleteBookAC, updateAddressBook
} from "../../Reducers/addNewPost/AddressBooksReducer";
import {useDispatch} from "react-redux";
import MyModal from "../MyModal/MyModal";
import {Button} from "shards-react";

const AddressTargets = ({node, ...props}) => {
  let [childVisible, setChildVisible] = useState(false)
  let [deleteModal, setDeleteModal] = useState(false)
  let dispatch = useDispatch()

  let handleCloseModal = () => {
    setDeleteModal(v => !v)
  }

  let handleValueToBook = () => {
    props.handleSetNodeValueForBook(node.targets)
    dispatch(setBookNameAC(node.addressBookName))
    dispatch(setBookIdAC(node.addressBookId))
    dispatch(setBookNameAC(node.addressBookName))
  }

  let deleteBook = (e) => {
    e.stopPropagation()
    dispatch(setDeleteBookAC(true))
    let deleteBook = {
      addressBookId: node.addressBookId,
      addressBookName: node.addressBookName,
      isActive: false,
      Targets: node.targets
    }
    dispatch(updateAddressBook(deleteBook))
    setDeleteModal(false)
  }
  return (
    <div>
      <div className={'d-flex justify-content-between'}>
        <MyModal
          title={'ნამდვილად გსურთ წაშლა ?'}
          open={deleteModal}
          onClose={handleCloseModal}
        >
          <Button
            onClick={deleteBook}
            className={'btn-danger'}
          >კი</Button>
          <Button
            onClick={handleCloseModal}
            className={'ml-2'}
          >არა</Button>
        </MyModal>
        <div>
          <i
            className={`fas fa-plus-square mr-2 ${childVisible ? 'active' : ''}`}
            onClick={(e) => {
              setChildVisible(v => !v)
            }}
          />
          <span
            onClick={handleValueToBook}
          >{node.addressBookName}</span>
        </div>

        <span>
          <i className="far fa-trash-alt"
             onClick={handleCloseModal}
          />
        </span>
      </div>

      <div className={'ml-5'}>
        {
          childVisible &&
          node.targets.map((item, index) => {
            return <div key={index}>
              {item.targetName}
            </div>
          })
        }
      </div>
    </div>
  );
};

export default AddressTargets;
