import {useState} from "react";
import * as React from 'react';
import Spreadsheet from "react-spreadsheet";
import {Button} from "shards-react";


const SpreadSheet = () => {
  const [data, setData] = useState([
    [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}]
  ]);
  let test = () => {
    console.log(data)
  }


  let addCol = () => {
    // setData([[...data[0], {value: ""}]])
    setData([...data.map(item => {
      return [...item, {value: ''}]
    })])
  }
  let addRow = () => {
    setData([...data, data[0].map(item => {
      return {value: ""}
    })])

  }
  return <>
    <div style={{overflowX: 'scroll'}}>
      <Spreadsheet data={data} onChange={setData}/>

    </div>
    <div className={'mt-3'}>
      <Button onClick={test} className={'btn-danger'}>შენახვა</Button>
      <Button onClick={addCol} className={'btn-warning ml-2'}>სვეტის
        დამატება</Button>
      <Button onClick={addRow} className={'btn-primary ml-2'}>რიგის
        დამატება</Button>

    </div>

  </>
};

export default SpreadSheet
