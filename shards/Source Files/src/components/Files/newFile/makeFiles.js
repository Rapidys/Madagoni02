import React, {useRef, useState} from 'react';
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


  let [value, setValue] = useState('')

  let [Col, setCol] = useState([{value: value}])
  let [Row, setRow] = useState([])
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let add = () => {
    setCol([...Col, {value: value}])
  }

  let addDown = () => {
    setRow([...Row, {value: value}])
  }
  let Delete = () => {
    setCol([{value: '',}])
    setRow([])

  }

  let Rows = Row.map((item, index) => {
    return <div className={'d-flex'}>
           {/*<span className={'mr-3'}*/}
           {/*      style={{width: '10px', heigth: '10px'}}>{index + 1}</span>*/}
      <Column Col={Col} key={index + 100}/>
    </div>

  })

  //
  // let indexation = Col.map((item, index) => {
  //   return <div className={'d-flex'}>
  //          <span style={{marginRight: '95px'}}
  //          >{letters[index]}</span>
  //   </div>
  // })

  return (
    <Styles>
      <CardBody>

        <table>
          {/*<thead>*/}
          {/*<tr className={'d-flex ml-5 '}>*/}
          {/*  {indexation}*/}
          {/*</tr>*/}
          {/*</thead>*/}
          <tbody>


          <span className={'d-flex'}>
                {/*<span className={'mr-3'} style={{*/}
                {/*  width: '10px',*/}
                {/*  heigth: '10px'*/}
                {/*}}>1</span>*/}

            <Column Col={Col}/>
          </span>
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
          <Button onClick={() => {
            console.log(Col, Row)
          }}>test</Button>
        </div>


      </CardBody>

    </Styles>

  )
    ;
};

export default MakeFiles;
