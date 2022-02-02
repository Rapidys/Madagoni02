import React, {useMemo, useState} from 'react';
import MySelect from "../../../../MySelect/MySelect";
import {useDispatch, useSelector} from "react-redux";
import {
  selectDocumentAC
} from "../../../../Reducers/addNewPost/selectDocReducer";


const SelectDocumentType = ({documentType}) => {

  let Options = useSelector((state => state.selectDocument.setOptions))
  let [defaultValue, setDefaultValue] = useState()

  let onSortChange = (e) => {
    let idx = Options[e.target.selectedIndex - 1]
    setDocType(e.target.value)
    dispatch(selectDocumentAC(idx.referenceId))

  }
  let [docType, setDocType] = useState('')
  let dispatch = useDispatch()

  useMemo(() => {
    setDefaultValue(documentType)

  }, [documentType])
  return (
    <div>
      <MySelect
        defaultValue={defaultValue}
        options={Options}
        className={"mb-2 p-1"}
        value={docType}
        disabled={defaultValue !== 'დოკუმენტის ტიპი' && true}
        onChange={onSortChange}

      />
    </div>

  );
};

export default SelectDocumentType;
