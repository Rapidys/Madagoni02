import React from 'react';
import DatePickerSearch from "./documentFilter/rangeDatePicker/datePickerSearchField";

const DatePickerTo = ({
                        mobileVersValueTo,
                        setMobileVersValueTo,
                        setValueTo,
                      }) => {
    return (

      <div className={'toDatePicker'}>
        <DatePickerSearch
          mobileVersValueTo={mobileVersValueTo}
          setMobileVersValueTo={setMobileVersValueTo}
          setValue={setValueTo}
          till={'მდე'}
        />
      </div>
    );
  }
;

export default DatePickerTo;
