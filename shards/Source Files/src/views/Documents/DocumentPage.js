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
import Division from "./division";
import DocType from "./docType";
import Executor from "./executor";
import DatePickers from "./datePickers";
import SearchCard from "./searchCard";

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

  let dispatch = useDispatch()


  useEffect(() => {
    dispatch(getType())
  }, [])


  if (loading === true) {
    return <Preloader/>
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
              <SearchCard/>
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
