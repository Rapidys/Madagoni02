import * as React from 'react';
import {
  LocalizationProvider, MobileDatePicker,
} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {
  Stack,
  TextField,
} from "@mui/material";

import {useState} from "react";


export default function DatePickerTo({
                                       setValueTo,
                                       mobileVersValueTo,
                                       setMobileVersValueTo
                                     }) {

  let [isMobile, setIsMobile] = useState(false)


  let onMobileDateChange = (e) => {
    setMobileVersValueTo(e)
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}
    >
      <Stack spacing={3}>
        {
          isMobile

            ? <MobileDatePicker
              label="მდე"
              inputFormat="MM/dd/yyyy"
              value={mobileVersValueTo}
              onChange={onMobileDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            :
            <TextField
              id="date"
              label="მდე"
              type="date"
              inputformat="MM/dd/yyyy"
              onChange={(newValue) => {
                setValueTo(newValue.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />


        }


      </Stack>
    </LocalizationProvider>


  );
}
