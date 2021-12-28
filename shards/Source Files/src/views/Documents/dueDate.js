import React, {useState} from 'react';
import {MobileDatePicker} from "@mui/lab";
import {TextField} from "@mui/material";

const DueDate = ({
                   dueDateValue, setDueDateValue
                 }) => {
    let [isMobile, setIsMobile] = useState(false)

    let onDueDateChange = (e) => {
      setDueDateValue(e.target.value)
    }

    return (
      <div >
        {
          isMobile

            ? <MobileDatePicker
              label="ვადა"
              inputFormat="MM/dd/yyyy"
              value={dueDateValue}
              onChange={onDueDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            :
            <TextField
              id="date"
              label="ვადა"
              type="date"
              inputformat="MM/dd/yyyy"
              onChange={(newValue) => {
                setDueDateValue(newValue.target.value);
              }}
              sx = {{width:'100%'}}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />


        }
      </div>
    );
  }
;

export default DueDate;
