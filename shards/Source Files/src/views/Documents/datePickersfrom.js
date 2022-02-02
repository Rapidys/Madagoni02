import React from 'react';
import DatePickerSearch
  from "./documentFilter/rangeDatePicker/datePickerSearchField";

const DatePickersfrom = ({
                           setValueFrom,
                           mobileVersValueFrom,
                           setMobileVersValueFrom,
                           valueFrom
                         }) => {
  return (
    <>
      <div>
        <DatePickerSearch
          setValue={setValueFrom}
          mobileVersValue={mobileVersValueFrom}
          setMobileVersValue={setMobileVersValueFrom}
          till={'დან'}
          value={valueFrom}
        />
      </div>

    </>
  );
};

export default DatePickersfrom;
