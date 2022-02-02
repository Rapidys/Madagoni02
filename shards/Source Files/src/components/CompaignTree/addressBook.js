import React from 'react';
import AddressTargets from "./addressTarges";
import Preloader from "../../Preloader/Preloader";

const AddressBookTree = ({
                           AddressBook,
                           handleSetNodeValue,
                           handleSetNodeValueForBook
                         }) => {
  if (!AddressBook) {
    return <Preloader/>
  }
  return (
    <div>
      {
        AddressBook && AddressBook.map((items, index) => {
          return <div className={'p-2'} key={index}>
            <AddressTargets node={items}
                            handleSetNodeValue={handleSetNodeValue}
                            handleSetNodeValueForBook={handleSetNodeValueForBook}
            />
          </div>
        })
      }
    </div>
  );
};
export default AddressBookTree;
