import React, {useEffect, useState} from 'react';
import {Card, CardBody, Container} from "shards-react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import TreeList from "../CompaignTree/TreeList";
import {TreeData} from "../../Reducers/TreeDataReducer";


let Styles = styled.div`
  .loginWrapper {
    max-width: 1000px;
    margin: 60px auto;
    padding: 20px;
    box-sizing: border-box;

  }

  @media (max-width: 500px) {
    .card {
      padding: 0;
      margin: 0;
    }
  }
`

const Register = () => {
  let treeData = useSelector((state => state.Tree.Structure))
  let dispatch = useDispatch()
  let newTree = useSelector((state => state.Register.newUser))

  useEffect(() => {
    dispatch(TreeData())
  }, [newTree])




  return (
    <Styles>
      <Container className={'loginWrapper'}>
        <Card>

          <CardBody className={'card '}>

            <TreeList
              isAppointment={false}
            />


          </CardBody>
        </Card>
      </Container>
    </Styles>

  );
};

export default Register;
