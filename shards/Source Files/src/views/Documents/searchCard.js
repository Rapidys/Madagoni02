import React, {useState} from 'react';
import {Button, Card} from "shards-react";
import DocNumberField from "./documentFilter/searchInput/Fields/DocNumberField";
import DatePickersfrom from "./datePickersfrom";
import DocTitleField from "./documentFilter/searchInput/Fields/DocTitleField";
import DocType from "./docType";
import Division from "./division";
import Executor from "./executor";
import DocStateField from "./documentFilter/searchInput/Fields/docStateField";
import {getFilteredDocs} from "../../Reducers/filterReducer";
import {useDispatch, useSelector} from "react-redux";
import Author from "./author";
import DueDate from "./dueDate";
import {Container, Grid} from "@mui/material";
import DatePickerTo from "./datePickerTo";
import Preloader from "../../Preloader/Preloader";

const SearchCard = () => {
    let [docNumberVal, setDocNumberVal] = useState('')
    let [docTitleVal, setDocTitleVal] = useState('')
    const [valueFrom, setValueFrom] = React.useState(''); // datePicker
    const [valueTo, setValueTo] = React.useState(''); // datePicker
    const [dueDateValue, setDueDateValue] = React.useState(''); // datePicker
    const [mobileVersValueFrom, setMobileVersValueFrom] = useState(new Date('2020-08-18T21:11:54'))
    const [mobileVersValueTo, setMobileVersValueTo] = useState('')
    let [docType, setDocType] = useState('')
    let [stateValue, setStateValue] = useState('')

    let dispatch = useDispatch()
    let currentPage = useSelector(state => state.PaginationData.currentPage)
    let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
    let division = useSelector(state => state.filterR.divisionId)
    let executor = useSelector(state => state.filterR.executorId)
    let isLoading = useSelector(state => state.filterR.filterLoading)
    let author = useSelector(state => state.filterR.authorId)
    let MotionStatus = useSelector((state => state.MotionStatus.motionStatus))
    let getValues = () => {

      let filter = {
        DocumentNumber: docNumberVal !== '' ? Number(docNumberVal) : null,
        DocumentDateFrom: valueFrom !== '' ? valueFrom : null,
        DocumentDateTo: valueTo !== '' ? valueTo : null,
        Title: docTitleVal !== '' ? docTitleVal : null,
        DocumentTypeId: docType ? docType : null,
        DivisionId: division.id,
        ExecutorId: executor.id,
        DocumentAuthorId: author.id,
        DocumentState: stateValue !== '' ? stateValue : null,
        DueDate: dueDateValue !== '' ? dueDateValue : null,
        MotionStatus: MotionStatus,
        PageNumber: currentPage,
        RecordsPerPage: rowsPerPage,
      }
      dispatch(getFilteredDocs(filter))


    }
    if (isLoading === true) {
      return <Preloader/>
    }
    return (
      <Container>
        <Card>
          <div className={'m-3'}>

            <Grid container spacing={2} columnSpacing={{xs: 1, sm: 2, md: 2}}
                  columns={{xs: 4, sm: 8, md: 12}}
            >
              <Grid item xs={2} sm={4} md={4}>

                <DocNumberField
                  docNumberVal={docNumberVal}
                  setDocNumberVal={setDocNumberVal}
                  className={'docNumberField'}
                  sx={{width: '100%'}}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <DatePickersfrom
                  setValueFrom={setValueFrom}
                  mobileVersValueFrom={mobileVersValueFrom}
                  setMobileVersValueFrom={setMobileVersValueFrom}

                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <DatePickerTo
                  mobileVersValueTo={mobileVersValueTo}
                  setMobileVersValueTo={setMobileVersValueTo}
                  setValueTo={setValueTo}

                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <DocTitleField
                  docTitleVal={docTitleVal}
                  setDocTitleVal={setDocTitleVal}
                  className={'docTitleField'}
                />
              </Grid>

              <Grid item xs={2} sm={4} md={4}>
                <DocType
                  setDocType={setDocType}
                  docType={docType}

                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Division
                  division={division}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Executor
                  executor={executor}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Author
                  Author={author}
                />
              </Grid>

              <Grid item xs={2} sm={4} md={4}>
                <DocStateField
                  setStateValue={setStateValue}
                  stateValue={stateValue}
                />
              </Grid>

              <Grid item xs={2} sm={4} md={4}>
                <DueDate
                  dueDateValue={dueDateValue}
                  setDueDateValue={setDueDateValue}
                />
              </Grid>
            </Grid>


          </div>
          <div className={'pr-3'}>
            <Button className={'float-right mb-4'}
                    onClick={getValues}
            >ძებნა</Button>
          </div>

        </Card>
      </Container>

    )
      ;
  }
;

export default SearchCard;
