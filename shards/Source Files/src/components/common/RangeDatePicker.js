import React, {useState} from "react";
import "../../assets/range-date-picker.css";
import {TextField} from '@material-ui/core';


let RangeDatePicker = (props) => {


  let [dateValue, setDateValue] = useState({})

  let handleTest = (e) => {
    setDateValue(e.target.value)
    props.handleSetDate && props.handleSetDate(e.target.value, props.index)
    const newDate = {...dateValue}
    newDate[e.target.id] = e.target.value
  }


  return (
    <form>
      <TextField
        id={"date"}
        label={props.handleSetDate && " შესასრულებელია - მდე"}
        type="date"
        selected={dateValue}
        onChange={(e) => handleTest(e)}
        sx={{width: 250}}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  )

}
export default RangeDatePicker;

