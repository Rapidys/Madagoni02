import React, {useState} from 'react';
import MyModal from "../../../components/MyModal/MyModal";
import {Button, FormGroup, FormInput, ModalBody} from "shards-react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import styled from 'styled-components'

let Styles = styled.div`
  .footer {
    position: fixed;
    bottom: 0;
    right: 20px;
  }
`
const DinamycallyChartModa = ({openChartData, onChartDataClose}) => {

  const [chartOptions, setChartOptions] = useState([{
    chartTitle: '',
    chartData: '',
    hasErrorData: false,
    hasErrorTitle: false,
  }])
  const [isErrorTitle, setIsErrorTitle] = useState(false)
  const [isErrorData, setIsErrorData] = useState(false)
  let handleOption = () => {
    setChartOptions([...chartOptions, {
      chartTitle: '',
      chartData: '',
      hasErrorData: false,
      hasErrorTitle: false,
    }])
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
  let handleOptions = () => {
    console.log(chartOptions)
  }

  let handleChange = (index, event) => {
    const values = [...chartOptions]
    values[index][event.target.name] = event.target.value
    setChartOptions(values)
  }
  let handleDataBlur = (index, event) => {
    const values = [...chartOptions]
    if (event.target.value > 100) {
      values[index].hasErrorData = true
      setChartOptions(values)
      setIsErrorData(true)
    }
    else {
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
  return (
    <Styles>
      <Dialog
        open={openChartData}
        onClose={onChartDataClose}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <div className={'d-flex justify-content-between'}>
          <DialogTitle>დიაგრამის მონაცემები</DialogTitle>
          <i className="fas fa-times p-4" style={{cursor: 'pointer'}}
             onClick={onChartDataClose}/>
        </div>
        <DialogContent>
          <ModalBody>
            <FormGroup>
              {
                chartOptions && chartOptions.map((item, index) => {
                  return <div className={'d-flex align-items-center'} key={index}>
                    <div
                      className={'d-flex flex-column mt-2'}
                      style={{width: '67%'}}
                    >

                      {item.hasErrorTitle ===
                        true
                        && <span
                          style={{
                            display: 'block',
                            color: 'red',
                          }}
                        >აუცილებელი ველი</span>
                      }

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

                      {item.hasErrorData ===
                        true
                        && <span
                          style={{
                            display: 'block',
                            color: 'red',
                          }}
                        >100 ზე ნაკლები</span>
                      }
                      <FormInput
                        placeholder="მონაცემები"
                        type={'number'}
                        name='chartData'
                        min="1" max="100"
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
                        <i className="fas fa-times-circle ml-4"
                           style={{color: 'red'}}
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

          </ModalBody>
        </DialogContent>

        <DialogActions className={'footer'}>
          <Button
            onClick={handleDeleteAll}
          >წაშლა</Button>
          <Button
            onClick={handleOption}
          >დამატება</Button>
          <Button
            onClick={handleOptions}
            disabled={isErrorData || isErrorTitle}
          >შენახვა</Button>
        </DialogActions>
      </Dialog>


    </Styles>

  );
};

export default DinamycallyChartModa;
