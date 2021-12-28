import React from 'react';
import DatePickerSearch from "./documentFilter/rangeDatePicker/datePickerSearchField";

const DatePickersfrom = ({
                       setValueFrom,
                       mobileVersValueFrom,
                       setMobileVersValueFrom,

                     }) => {
  return (
    <>
      <div>
        <DatePickerSearch
          setValue={setValueFrom}
          mobileVersValue={mobileVersValueFrom}
          setMobileVersValue={setMobileVersValueFrom}
          till = {'დან'}

        />
      </div>

    </>
  );
};

export default DatePickersfrom;
