import React, {useEffect, useState} from 'react';
import {Button, Card} from "shards-react";
import {getFilteredDocs, setFilteredDocAC,} from "../../Reducers/filterReducer";
import {useDispatch, useSelector} from "react-redux";
import {Container, } from "@mui/material";
import SearchGrid from "./searchForm/searchGrid";
import {useMediaQuery} from "@material-ui/core";
import SearchAcordionOnSmallResolution from "./searchAcordionOnSmallResolution";
import {getDocs} from "../../API/sentDocumentService";

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
    let [isSmallResolution, setIsSmallResolution] = useState(false)
    let [smallResSearchModal, setSmallResSearchModal] = useState(false)
    let dispatch = useDispatch()
    let currentPage = useSelector(state => state.PaginationData.currentPage)
    let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
    let division = useSelector(state => state.filterR.divisionId)
    let executor = useSelector(state => state.filterR.executorId)
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
      dispatch(getDocs(filter))
      dispatch(setFilteredDocAC(filter))

    }

    const matchesMax = useMediaQuery('(max-width:600px)');
    const matchesMin = useMediaQuery('(min-width:600px)');

    useEffect(() => {
      if (matchesMax === true) {
        setIsSmallResolution(true)
      }
      if (matchesMin === true) {
        setIsSmallResolution(false)
      }
    }, [matchesMin, matchesMax])


    let onSmallResolSearchBtn = () => {
      getValues()
      setSmallResSearchModal(false)
    }

    return (
      <Container>
        <Card className={'mt-2'}>
          <div className={'m-3'}>
            {isSmallResolution === false
              ? <>


                <SearchGrid
                  docNumberVal={docNumberVal}
                  setDocNumberVal={setDocNumberVal}
                  setValueFrom={setValueFrom}
                  mobileVersValueFrom={mobileVersValueFrom}
                  setMobileVersValueFrom={setMobileVersValueFrom}
                  mobileVersValueTo={mobileVersValueTo}
                  setMobileVersValueTo={setMobileVersValueTo}
                  setValueTo={setValueTo}
                  docTitleVal={docTitleVal}
                  setDocTitleVal={setDocTitleVal}
                  setDocType={setDocType}
                  docType={docType}
                  division={division}
                  executor={executor}
                  author={author}
                  setStateValue={setStateValue}
                  stateValue={stateValue}
                  dueDateValue={dueDateValue}
                  setDueDateValue={setDueDateValue}
                  isSmallResolution={isSmallResolution}
                  valueFrom={valueFrom}
                  valueTo={valueTo}
                />

                <div>

                  <Button className={'float-right mb-4 mt-2'}
                          onClick={getValues}
                  >ძებნა</Button>
                </div>
              </>
              :
              <>
                <Button
                  onClick={() => {
                    setSmallResSearchModal(true)
                  }}

                  className={'w-100 bg-primary text-white border-0 text-align-left'}
                >ძიება</Button>


                <SearchAcordionOnSmallResolution
                  smallResSearchModal={smallResSearchModal}
                  setSmallResSearchModal={setSmallResSearchModal}
                  title={'ძებნა'}
                >
                  <SearchGrid
                    docNumberVal={docNumberVal}
                    setDocNumberVal={setDocNumberVal}
                    setValueFrom={setValueFrom}
                    mobileVersValueFrom={mobileVersValueFrom}
                    setMobileVersValueFrom={setMobileVersValueFrom}
                    mobileVersValueTo={mobileVersValueTo}
                    setMobileVersValueTo={setMobileVersValueTo}
                    setValueTo={setValueTo}
                    docTitleVal={docTitleVal}
                    setDocTitleVal={setDocTitleVal}
                    setDocType={setDocType}
                    docType={docType}
                    division={division}
                    executor={executor}
                    author={author}
                    setStateValue={setStateValue}
                    stateValue={stateValue}
                    dueDateValue={dueDateValue}
                    setDueDateValue={setDueDateValue}

                  />
                  <div className={'mt-3'}>

                    <Button className={'float-right mb-4'}
                            onClick={onSmallResolSearchBtn}
                    >ძებნა</Button>
                  </div>
                </SearchAcordionOnSmallResolution>


              </>
            }


          </div>


        </Card>
      </Container>

    )
      ;
  }
;

export default SearchCard;
