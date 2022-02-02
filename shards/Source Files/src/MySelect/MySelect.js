import React from 'react';
import {Container, FormSelect} from "shards-react";


const MySelect = ({
                    defaultValue,
                    onChange,
                    options,
                    value,
                    setReferId,
                    ...props
                  }) => {


  return (
    <Container className={"p-0"} {...props}>
      <FormSelect
        value={value}
        onChange={(e) => onChange(e)}
        {...props}
      >
        <option value='' disabled>{defaultValue && defaultValue}</option>
        {options && options.map((option, index) => {
          return <option value={option.displayName} key={index}
                         id={index}
          >
            {option.displayName}
          </option>

        })}

      </FormSelect>
    </Container>
  );
};

export default MySelect;
