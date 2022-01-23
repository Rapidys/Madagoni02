import React, {useState} from 'react';
import {
  Button,
  Card, CardBody, CardFooter,
  CardHeader,
  FormGroup,
  FormInput,
} from "shards-react";

import styled from 'styled-components'
import {
  CreateNewChart,
} from "../../../Reducers/ChartReducer";
import {useDispatch} from "react-redux";
import MyModal from "../../MyModal/MyModal";

let Styles = styled.div`
  .footer {
    position: fixed;
    bottom: 0;
    right: 20px;
  }

  .nameInput {
    border: 1px solid teal;
    background: transparent;
    max-width: 250px;
  }

  .deleteInput {
    color: teal;
    font-size: 20px;
    cursor: pointer;
  }

  .deleteInput:hover {
    color: red;
  }
`
const DinamycallyChartModa = () => {

  const [chartOptions, setChartOptions] = useState([{
    chartTitle: '',
    chartData: '',
    hasErrorData: false,
    hasErrorTitle: false,
  }])
  const [chartName, setChartName] = useState('')
  const [isErrorTitle, setIsErrorTitle] = useState(true)
  const [isErrorData, setIsErrorData] = useState(true)
  const [isErrorName, setIsErrorName] = useState(true)
  const [isErrorNameOnBlur, setIsErrorNameOnBlur] = useState(false)
  const [isCreated, setIsCreated] = useState(false)

  let dispatch = useDispatch()
  let handleOption = () => {
    setChartOptions([...chartOptions, {
      chartTitle: '',
      chartData: '',
      hasErrorData: false,
      hasErrorTitle: false,
    }])
    setIsErrorTitle(true)
    setIsErrorData(true)
  }
  let handleDelete = (option) => {
    setChartOptions([...chartOptions].filter((item, index) => index !== option))

  }
  let handleDeleteAll = () => {
    setChartOptions([{
      chartTitle: '',
      chartData: '',
      hasErrorData: false,
      hasErrorTitle: false,
    }])
  }
  let handleNewChart = () => {

    dispatch(CreateNewChart(
      {
        chartName: chartName,
        chartId: 0,
        chartData: [...chartOptions]
      }
    ))
    setChartName('')
    setChartOptions([{
      chartTitle: '',
      chartData: '',
      hasErrorData: false,
      hasErrorTitle: false,
    }])
    setIsCreated(true)
  }

  let handleChange = (index, event) => {
    const values = [...chartOptions]
    values[index][event.target.name] = event.target.value
    setChartOptions(values)
  }
  let handleDataBlur = (index, event) => {
    const values = [...chartOptions]
    if (event.target.value === '') {
      values[index].hasErrorData = true
      setChartOptions(values)
      setIsErrorData(true)
    } else {
      values[index].hasErrorData = false
      setChartOptions(values)
      setIsErrorData(false)
    }
  }

  let handleTitleBlur = (index, event) => {
    const values = [...chartOptions]
    if (event.target.value === '') {
      values[index].hasErrorTitle = true
      setChartOptions(values)
      setIsErrorTitle(true)

    } else {
      values[index].hasErrorTitle = false
      setChartOptions(values)
      setIsErrorTitle(false)

    }
  }


  let onChartNameBlur = () => {
    if (chartName === '') {
      setIsErrorNameOnBlur(true)
      setIsErrorName(true)
    } else {
      setIsErrorName(false)
      setIsErrorNameOnBlur(false)

    }
  }

  let onChartSuccessfullClose = () => {
    setIsCreated(v => !v)
  }
  return (
    <Styles>
      <Card>
        <div className={'d-flex justify-content-between'}>
          <CardHeader>დიაგრამის შექმნა</CardHeader>

        </div>

        <MyModal
          open={isCreated}
          onClose={onChartSuccessfullClose}
        >
          <div className={'d-flex align-items-center'}>
            <i className="fas fa-check-circle"

               style={{color: 'green', fontSize: '30px'}}/>
            <span className={'ml-2'}>
                          წარმატებით შეიქმნა
            </span>
          </div>
        </MyModal>
        <CardBody style={{height: '400px', overflowY: 'scroll'}}>
          <FormGroup>
            <FormInput
              placeholder="სახელი"
              type={'text'}
              name='chartName'
              value={chartName}
              onChange={(event) => setChartName(event.target.value)}
              className={'nameInput'}
              onBlur={onChartNameBlur}

            />
            {
              isErrorNameOnBlur &&
              <p style={{color: 'red'}}>შეიყვანეთ დიაგრამის სახელი</p>
            }

          </FormGroup>
          <FormGroup>
            {
              chartOptions && chartOptions.map((item, index) => {
                return <div className={'d-flex align-items-center'} key={index}>
                  <div
                    className={'d-flex flex-column mt-2'}
                    style={{width: '67%'}}
                  >

                    {/*{item.hasErrorTitle ===*/}
                    {/*  true*/}
                    {/*  && <span*/}
                    {/*    style={{*/}
                    {/*      display: 'block',*/}
                    {/*      color: 'red',*/}
                    {/*    }}*/}
                    {/*  >აუცილებელი ველი</span>*/}
                    {/*}*/}

                    <FormInput
                      placeholder="დასახელება"
                      type={'text'}
                      name='chartTitle'
                      value={item.chartTitle}
                      onChange={(event) => handleChange(index, event)}
                      onBlur={(event) => handleTitleBlur(index, event)}

                    />

                  </div>

                  <div className={'d-flex flex-column mt-2'}
                       style={{width: '27%'}}

                  >
                    <FormInput
                      placeholder="მონაცემები"
                      type={'number'}
                      name='chartData'
                      value={item.chartData}
                      className={'ml-2'}
                      onChange={(event) => handleChange(index, event)}
                      onBlur={(event) => handleDataBlur(index, event)}
                    />
                  </div>
                  <div className={'d-flex flex-column mt-2'}
                       style={{width: '6%'}}

                  >
                      <span>
                        <i className="far fa-window-close ml-4 deleteInput"
                           onClick={() => {
                             handleDelete(index)
                           }}
                        />
                      </span>

                  </div>
                </div>


              })
            }
          </FormGroup>

        </CardBody>

        <CardFooter>
          <Button
            onClick={handleDeleteAll}
          >წაშლა</Button>
          <Button
            onClick={handleOption}
            className={'ml-2'}

          >დამატება</Button>

          <Button
            onClick={handleNewChart}
            disabled={isErrorData || isErrorTitle || isErrorName}
            className={'ml-2'}

          >შენახვა</Button>
        </CardFooter>
      </Card>


    </Styles>

  );
};

export default DinamycallyChartModa;
