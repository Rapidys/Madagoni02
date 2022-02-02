import React from 'react';
import {Grid} from "@mui/material";
import DocNumberField
  from "../documentFilter/searchInput/Fields/DocNumberField";
import DatePickersfrom from "../datePickersfrom";
import DatePickerTo from "../datePickerTo";
import DocTitleField from "../documentFilter/searchInput/Fields/DocTitleField";
import DocType from "../docType";
import Division from "../division";
import Executor from "../executor";
import Author from "../author";
import DocStateField from "../documentFilter/searchInput/Fields/docStateField";
import DueDate from "../dueDate";



const SearchGrid = ({
                      docNumberVal,
                      setDocNumberVal,
                      setValueFrom,
                      mobileVersValueFrom,
                      setMobileVersValueFrom,
                      mobileVersValueTo,
                      setMobileVersValueTo,
                      setValueTo,
                      docTitleVal,
                      setDocTitleVal,
                      setDocType,
                      docType,
                      division,
                      executor,
                      author,
                      setStateValue,
                      stateValue,
                      dueDateValue,
                      setDueDateValue,
                      isSmallResolution,
                      valueFrom,
                      valueTo
                    }) => {


  return (
    <>
      <Grid container className = {'p-0'} spacing={1} columnSpacing={{xs: 1, sm: 2, md: 2}}
            columns={{xs: 4, sm: 8, md: 12}}
      >

        <Grid item xs={12} sm={4} md={4}>

          <DocNumberField
            docNumberVal={docNumberVal}
            setDocNumberVal={setDocNumberVal}
            className={'docNumberField'}
            sx={{width: '100%'}}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <DatePickersfrom
            setValueFrom={setValueFrom}
            mobileVersValueFrom={mobileVersValueFrom}
            setMobileVersValueFrom={setMobileVersValueFrom}
            valueFrom = {valueFrom}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <DatePickerTo
            mobileVersValueTo={mobileVersValueTo}
            setMobileVersValueTo={setMobileVersValueTo}
            setValueTo={setValueTo}
            valueTo = {valueTo}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <DocTitleField
            docTitleVal={docTitleVal}
            setDocTitleVal={setDocTitleVal}
            style={{marginTop: isSmallResolution === true ? '30px' : ''}}

          />
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <DocType
            setDocType={setDocType}
            docType={docType}

          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Division
            division={division}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Executor
            executor={executor}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Author
            Author={author}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <DocStateField
            setStateValue={setStateValue}
            stateValue={stateValue}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <DueDate
            dueDateValue={dueDateValue}
            setDueDateValue={setDueDateValue}
          />
        </Grid>

      </Grid>

    </>


  );
};

export default SearchGrid;
