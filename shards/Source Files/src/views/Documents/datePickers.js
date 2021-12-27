import React from 'react';
import DatePickerFrom from "./documentFilter/rangeDatePicker/datePickerFrom";
import DatePickerTo from "./documentFilter/rangeDatePicker/datePickerTo";

const DatePickers = ({
                       setValueFrom,
                       setValueTo,
                       mobileVersValueFrom,
                       setMobileVersValueFrom,
                       mobileVersValueTo,
                       setMobileVersValueTo
                     }) => {
  return (
    <>
      <div>
        <DatePickerFrom
          setValueFrom={setValueFrom}
          mobileVersValue={mobileVersValueFrom}
          setMobileVersValue={setMobileVersValueFrom}
        />
      </div>

      <div className={'toDatePicker'}>
        <DatePickerTo
          mobileVersValueTo={mobileVersValueTo}
          setMobileVersValueTo={setMobileVersValueTo}
          setValueTo={setValueTo}
        />
      </div>
    </>
  );
};

export default DatePickers;
