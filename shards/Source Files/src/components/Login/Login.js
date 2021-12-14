import React, {useState} from 'react';
import {Button, Card, CardBody, Form, FormGroup, FormInput} from "shards-react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {login} from "../../Reducers/AuthReducer";


let Styles = styled.div`
  .loginWrapper {
    max-width: 400px;
    margin: auto;
  }
`

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let dispatch = useDispatch()
  let SignIn = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }


  return (
    <Styles>
      <Card className="loginWrapper mt-5">
        <CardBody>
          <Form className="m-auto">
            <FormGroup>
              <label htmlFor="#username">ელ-ფოსტა</label>
              <FormInput id="#username" placeholder="ელ-ფოსტა"
                         value={email}
                         onChange={(e) => {
                           setEmail(e.target.value)
                         }}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#password">პაროლი</label>
              <FormInput type="password" id="#password" placeholder="პაროლი"

                         value={password}
                         onChange={(e) => {
                           setPassword(e.target.value)
                         }}
              />
            </FormGroup>
            <Button theme="secondary"
                    onClick={SignIn}
            >
              შესვლა
            </Button>
          </Form>
        </CardBody>

      </Card>
    </Styles>

  );
};

export default Login;
