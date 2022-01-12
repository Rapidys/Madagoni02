import React, {useEffect} from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import API from "../../../../../API/ApiBase";
import {setFinishOptionsAC} from "../../../../../Reducers/getDocReducer";
import {useDispatch, useSelector} from "react-redux";
import MySelect from "../../../../../MySelect/MySelect";

const DocStateField = ({stateValue, setStateValue, ...props}) => {

  let dispatch = useDispatch()

  useEffect(() => {
    API.FinishDocumentSelectTypes().then((response) => {
      if (response) {
        dispatch(setFinishOptionsAC(response.data))
      }
    })
  }, [])
  let Options = useSelector((state => state.GetDoc.Options))


  let onValueChange = (e) => {
    setStateValue(e.target.value)
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel
        id="demo-simple-select-label">დოკ.მდგომარეობა</InputLabel>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={stateValue}
        onChange={onValueChange}
        label='დოკ.მდგომარეობა'
      >

        {
          Options && Options.map(item => {
            return <MenuItem
              value={item.displayName}
              key={item.referenceId}>{item.displayName}</MenuItem>
          })
        }

      </Select>
    </FormControl>

  );
};

export default DocStateField;
