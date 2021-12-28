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


export default function DatePickerSearch({setValue,setMobileVersValue,mobileVersValue,till}) {
  let [isMobile, setIsMobile] = useState(false)


  let onMobileDateChange = (e) => {
    setMobileVersValue(e)
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}
    >
      <Stack spacing={3}>
        {
          isMobile

            ? <MobileDatePicker
              label={till}
              inputFormat="MM/dd/yyyy"
              value={mobileVersValue}
              onChange={onMobileDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            :
            <TextField
              id="date"
              label={till}
              type="date"
              inputformat="MM/dd/yyyy"
              onChange={(newValue) => {
                setValue(newValue.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{height:'20px'}}
              size="small"

            />


        }


      </Stack>
    </LocalizationProvider>


  );
}
