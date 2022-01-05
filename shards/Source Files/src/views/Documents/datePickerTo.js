import React from 'react';
import DatePickerSearch
  from "./documentFilter/rangeDatePicker/datePickerSearchField";

const DatePickerTo = ({
                        setValueTo,
                        valueTo
                      }) => {
    return (

      <div className={'toDatePicker'}>
        <DatePickerSearch
          setValue={setValueTo}
          till={'მდე'}
          value={valueTo}
        />
      </div>
    );
  }
;

export default DatePickerTo;
