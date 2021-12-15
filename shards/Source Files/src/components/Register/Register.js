import React from 'react';
import {Card, CardBody, Container} from "shards-react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import TreeList from "../CompaignTree/TreeList";


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


  return (
    <Styles>
      <Container className={'loginWrapper'}>
        <Card>

          <CardBody className={'card'}>

            <TreeList treeData={treeData}


            />


          </CardBody>
        </Card>
      </Container>
    </Styles>

  );
};

export default Register;
