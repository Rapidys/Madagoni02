import React, {useState} from 'react';
import {Button, Form, FormInput} from "shards-react";

const ChangeNames = ({
                       Type,
                       changedDepNames,
                       setChangedDepNames,
                       changeDepName
                     }) => {
  let [errorForDep, setErrorForDep] = useState('')
  let blur = () => {
    if (changedDepNames.department === '') {
      setErrorForDep('შეიყვანეთ ახალი სახელი')
    }
  }
  return (
    <div>
      {
        Type === 'სახელის შეცვლა'
        &&
        <Form>
          <FormInput
            type="text"
            placeholder={'ახალი სახელი'}
            value={changedDepNames}
            className={'mt-2'}
            onChange={(e) => {
              setChangedDepNames(e.target.value)
              setErrorForDep('')
            }}
            onBlur={blur}
          />

          <label style={{color: 'red'}}>{errorForDep}</label>
          <br/>
          <Button className={'bg-danger mt-3'}
                  disabled={changedDepNames.department === '' && true}
                  onClick={changeDepName}
          >
            შეცვლა
          </Button>
        </Form>

      }
    </div>
  );
};

export default ChangeNames;
