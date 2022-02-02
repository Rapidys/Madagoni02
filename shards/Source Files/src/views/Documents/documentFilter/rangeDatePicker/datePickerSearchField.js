import * as React from 'react';
import {
  LocalizationProvider, MobileDatePicker,
} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {
  Stack,
  TextField,
} from "@mui/material";

import {useEffect, useState} from "react";


export default function DatePickerSearch({
                                           setValue,
                                           till,
                                           value,
                                         }) {
  let [isMobile, setIsMobile] = useState(false)


  let onMobileDateChange = (e) => {
    setValue(e)
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}
    >
      <Stack spacing={3}>
        {
          isMobile

            ? <MobileDatePicker
              label={till}
              onChange={(newValue) => {
                setValue(newValue);
                console.log(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            :
            <TextField
              id="date"
              label={till}
              type="date"
              inputformat="MM/dd/yyyy"
              value={value}
              onChange={(newValue) => {
                setValue(newValue.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{width: '100%', color: 'red'}}
              size="small"

            />


        }


      </Stack>
    </LocalizationProvider>


  );
}
