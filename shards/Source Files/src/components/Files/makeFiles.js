import React, {useState} from 'react';
import {Button, CardBody} from "shards-react";
import styled from "styled-components";
import Column from "./Column";

let Styles = styled.div`
  td {
    padding: 0;
    margin: 0;
  }

  .Btns {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    text-align: center;
  }

  input {
    width: 100px;
    height: 25px
  }

`

const MakeFiles = () => {


  let [Col, setCol] = useState([1])
  let [Row, setRow] = useState([])

  let add = () => {
    setCol([...Col, 1])
  }

  let addDown = () => {
    setRow([...Row, 1])
  }
  let Delete = () => {
    setCol([1])
    setRow([])
  }
  let Rows = Row.map((item, index) => {
    return <Column Col={Col} key={index}/>
  })

  return (
    <Styles>
      <CardBody>

        <table>
          <tbody>
          <Column Col={Col}/>
          {Rows}
          </tbody>
        </table>


        <div className={'mt-3'}>
          <Button
            onClick={add}
          >
            სვეტი
          </Button>
          <Button
            onClick={addDown}
            className={'ml-1'}
          >
            რიგი
          </Button>
          <Button
            onClick={Delete}
            className={Col.length > 1 ? 'ml-1 btn-danger' : 'd-none'}
          >
            წაშლა
          </Button>
        </div>


      </CardBody>

    </Styles>

  )
    ;
};

export default MakeFiles;
