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


export default function DatePickerFrom({setValueFrom,setMobileVersValue,mobileVersValue}) {
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
              label="დან"
              inputFormat="MM/dd/yyyy"
              value={mobileVersValue}
              onChange={onMobileDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            :
            <TextField
              id="date"
              label="დან"
              type="date"
              inputformat="MM/dd/yyyy"
              onChange={(newValue) => {
                setValueFrom(newValue.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{height:'20px'}}
            />


        }


      </Stack>
    </LocalizationProvider>


  );
}
