import React, {useState} from 'react';
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
import DocTypeField from "./documentFilter/searchInput/Fields/docTypeField";
import DocStateField from "./documentFilter/searchInput/Fields/docStateField";

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
  let [division, setDivision] = useState('')
  let [executor, setExecutor] = useState('')
  let [author, setAuthor] = useState('')
  let [docType, setDocType] = useState('')
  let [stateField, setStateField] = useState('')
  let dispatch = useDispatch()

  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
  if (loading === true) {
    return <Preloader/>
  }

  let getValues = () => {
    // if (docNumberVal === '' && docTitleVal === '') {
    let filter = {
      DocumentNumber: Number(docNumberVal) !== '' ? Number(docNumberVal): null,
      DocumentDateFrom: valueFrom !== '' ? valueFrom : null,
      DocumentDateTo: valueTo !== '' ? valueTo : null,
      Title: docTitleVal,
      MotionStatus: 5,
      PageNumber: currentPage,
      RecordsPerPage: rowsPerPage,
    }
    dispatch(getFilteredDocs(filter))

    // } else if (docTitleVal !== '' && docNumberVal === '') {
    //   let filterByTitle = {
    //     documentTItle: docTitleVal,
    //     MotionStatus: 5,
    //     PageNumber: currentPage,
    //     RecordsPerPage: rowsPerPage,
    //   }
    //   dispatch(getFilteredDocs(filterByTitle))
    // } else {
    //   let filterById = {
    //     DocumentNumber: Number(docNumberVal),
    //     MotionStatus: 5,
    //     PageNumber: currentPage,
    //     RecordsPerPage: rowsPerPage,
    //   }
    //   dispatch(getFilteredDocs(filterById))
    //
    // }


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
                  <div className={'d-flex justify-content-between mb-4 '}>
                    <DocTypeField
                      setDocType={setDocType}
                      docType={docType}
                    />
                    <DivisionField
                      setDivision={setDivision}
                      division={division}
                    />
                    <ExecutorField
                      setExecutor={setExecutor}
                      executor={executor}
                    />
                    <AuthorField
                      setAuthor={setAuthor}
                      author={author}
                    />
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
