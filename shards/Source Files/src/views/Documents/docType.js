import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useSelector} from "react-redux";

const DocType = ({setDocType,docType}) => {

  let Options = useSelector((state => state.selectDocument.setOptions))

  let onSortChange = (e) => {
    setDocType(e.target.value)
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel
        id="demo-simple-select-label">დოკ.ტიპი</InputLabel>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={docType}
        label='docType'
        onChange={onSortChange}

      >

        {
          Options && Options.map(item => {
            return <MenuItem
              value={item.referenceId}
              key={item.referenceId}>{item.displayName}</MenuItem>
          })
        }

      </Select>
    </FormControl>
  );
};

export default DocType;
