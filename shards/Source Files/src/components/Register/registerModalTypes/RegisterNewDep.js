import React, {useState} from 'react';
import {Button, Form, FormInput} from "shards-react";

const RegisterNewDep = ({Type, depValues, setDepValues, addUser}) => {
  let [errorForDep, setErrorForDep] = useState('')
  let blur = () => {
    if (depValues.name === '') {
      setErrorForDep('შეიყვანეთ დეპარტამენტის სახელი')
    }
  }
  return (
    <div>
      {
        Type === 'ახალი დეპარტამენტი'
        && <Form>
          <FormInput
            type="text"
            placeholder={'სახელი'}
            value={depValues.name}
            className={'mt-2'}
            onChange={(e) => {
              setDepValues({...depValues, name: e.target.value})
              setErrorForDep('')
            }}
            onBlur={blur}
          />

          <label style={{color: 'red'}}>{errorForDep}</label>
          <br/>
          <Button className={'mt-3'}
                  onClick={addUser}
                  disabled={depValues.name === '' && true}
          >
            დამატება
          </Button>
        </Form>
      }
    </div>
  );
};

export default RegisterNewDep;
