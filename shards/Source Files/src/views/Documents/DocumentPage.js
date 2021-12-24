import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Row
} from "shards-react";
import DocumentBody
  from "./DocumentBody";
import Pagination from "../../Pagination/Pagination";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../../Preloader/Preloader";
import DocNumberField from "./documentFilter/searchInput/Fields/DocNumberField";
import DocTitleField from "./documentFilter/searchInput/Fields/DocTitleField";
import DatePickerTo from "./documentFilter/rangeDatePicker/datePickerTo";
import DatePickerFrom from "./documentFilter/rangeDatePicker/datePickerFrom";
import {getFilteredDocs} from "../../Reducers/filterReducer";
import DivisionField from "./documentFilter/searchInput/Fields/DivisionField";
import ExecutorField from "./documentFilter/searchInput/Fields/executorField";
import AuthorField from "./documentFilter/searchInput/Fields/authorField";
import DocStateField from "./documentFilter/searchInput/Fields/docStateField";
import {
  getType,
} from "../../Reducers/addNewPost/selectDocReducer";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import MyModal from "../../components/MyModal/MyModal";
import TreeList from "../../components/CompaignTree/TreeList";

let Styles = styled.div`
  .messWrapper:hover {
    background: #cfd2ce;
    cursor: pointer;
  }

  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    height: 8px;
  }

  .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
    top: -7px;
  }

  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 9.5px 14px;
  }

  @media (max-width: 991px) {
    .wrapper {
      flex-direction: column;
    }

    .toDatePicker {
      margin-top: 26px;
    }

    .docNumberField {
      margin-bottom: 5px;
      width: 100%;
    }

    .docTitleField {
      margin-top: 5px;
      width: 100%;
    }
  }
  @media (max-width: 650px) {
    .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
      padding: 10px 10px;

    }

    .toDatePicker {
      margin-top: 14px;
    }

    .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
      top: -12px;

    }
  }
`

const DocumentPage = ({pageTitle, pageName, Documents, ...props}) => {
  let loading = useSelector(state => state.GetDoc.isLoading)
  let [docNumberVal, setDocNumberVal] = useState('')
  let [docTitleVal, setDocTitleVal] = useState('')
  const [valueFrom, setValueFrom] = React.useState(''); // datePicker
  const [valueTo, setValueTo] = React.useState(''); // datePicker
  const [mobileVersValueFrom, setMobileVersValueFrom] = useState(new Date('2020-08-18T21:11:54'))
  const [mobileVersValueTo, setMobileVersValueTo] = useState('')
  let [executor, setExecutor] = useState('')
  let [author, setAuthor] = useState('')
  let [docType, setDocType] = useState('')
  let [stateField, setStateField] = useState('')
  let dispatch = useDispatch()
  let Options = useSelector((state => state.selectDocument.setOptions))
  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
  let [divisionModal, setDivisionModal] = useState(false)
  let division = useSelector(state => state.filterR.divisionId)

  useEffect(() => {
    dispatch(getType())
  }, [])


  if (loading === true) {
    return <Preloader/>
  }
  let onCloseDivision = () => {
    setDivisionModal(v => !v)
  }
  let getValues = () => {

    let filter = {
      DocumentNumber: docNumberVal !== '' ? Number(docNumberVal) : null,
      DocumentDateFrom: valueFrom !== '' ? valueFrom : null,
      DocumentDateTo: valueTo !== '' ? valueTo : null,
      Title: docTitleVal !== '' ? docTitleVal : null,
      DocumentTypeId: docType ? docType : null,
      DivisionId: division.id,
      MotionStatus: 5,
      PageNumber: currentPage,
      RecordsPerPage: rowsPerPage,
    }
    dispatch(getFilteredDocs(filter))


  }
  let onSortChange = (e) => {
    setDocType(e.target.value)
  }

  return (
    <Styles>

      <Container fluid className="main-content-container px-4 container">
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0 text-black">{pageTitle}</h6>
              </CardHeader>
              <Card>
                <div className={'m-3'}>
                  <div
                    className={'d-flex mb-4 justify-content-between wrapper'}>
                    <DocNumberField
                      docNumberVal={docNumberVal}
                      setDocNumberVal={setDocNumberVal}
                      className={'docNumberField'}
                    />
                    <div>
                      <DatePickerFrom
                        setValueFrom={setValueFrom}
                        mobileVersValue={mobileVersValueFrom}
                        setMobileVersValue={setMobileVersValueFrom}
                      />
                    </div>

                    <div className={'toDatePicker'}>
                      <DatePickerTo
                        mobileVersValueTo={mobileVersValueTo}
                        setMobileVersValueTo={setMobileVersValueTo}
                        setValueTo={setValueTo}
                      />
                    </div>
                    <DocTitleField
                      docTitleVal={docTitleVal}
                      setDocTitleVal={setDocTitleVal}
                      className={'docTitleField'}
                    />


                  </div>
                  <div className={''}>

                    <FormControl fullWidth className={'mb-2'}>
                      <InputLabel
                        id="demo-simple-select-label">დოკ.ტიპი</InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={docType}
                        label='docType'
                        onChange={onSortChange}

                      >

                        {
                          Options && Options.map(item => {
                            return <MenuItem
                              value={item.referenceId}
                              key={item.referenceId}>{item.displayName}</MenuItem>
                          })
                        }

                      </Select>
                    </FormControl>

                    <TextField type="text" onClick={onCloseDivision}
                               placeholder={'დეპარტამენტი'}
                               value={division.displayName}
                               id="outlined-basic"
                               label={!division.displayName && 'დეპარტამენტი'}
                               variant="outlined"
                    />
                    <DivisionField
                      divisionModal={divisionModal}
                      onCloseDivision={onCloseDivision}
                      setDivisionModal={setDivisionModal}
                    />

                    {/*<ExecutorField*/}
                    {/*  setExecutor={setExecutor}*/}
                    {/*  executor={executor}*/}
                    {/*/>*/}
                    {/*<AuthorField*/}
                    {/*  setAuthor={setAuthor}*/}
                    {/*  author={author}*/}
                    {/*/>*/}
                  </div>
                  <div>
                    <DocStateField
                      setStateField={setStateField}
                      stateField={stateField}
                    />
                  </div>
                </div>
                <div className={'pr-3'}>
                  <Button className={'float-right mb-4'}
                          onClick={getValues}
                  >ძებნა</Button>
                </div>

              </Card>
              <DocumentBody pageName={pageName}
                            Documents={Documents}

              />
              <Pagination
                totalCount={props.totalCount}
                rowsPerPage={props.rowsPerPage}
                currentPage={props.currentPage}
              />
            </Card>


          </Col>
        </Row>

      </Container>
    </Styles>
  );
};

export default DocumentPage;
