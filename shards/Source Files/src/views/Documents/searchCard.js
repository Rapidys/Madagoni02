import React, {useState} from 'react';
import {Button, Card} from "shards-react";
import DocNumberField from "./documentFilter/searchInput/Fields/DocNumberField";
import DatePickers from "./datePickers";
import DocTitleField from "./documentFilter/searchInput/Fields/DocTitleField";
import DocType from "./docType";
import Division from "./division";
import Executor from "./executor";
import DocStateField from "./documentFilter/searchInput/Fields/docStateField";
import {getFilteredDocs} from "../../Reducers/filterReducer";
import {useDispatch, useSelector} from "react-redux";
import Author from "./author";

const SearchCard = () => {
    let [docNumberVal, setDocNumberVal] = useState('')
    let [docTitleVal, setDocTitleVal] = useState('')
    const [valueFrom, setValueFrom] = React.useState(''); // datePicker
    const [valueTo, setValueTo] = React.useState(''); // datePicker
    const [mobileVersValueFrom, setMobileVersValueFrom] = useState(new Date('2020-08-18T21:11:54'))
    const [mobileVersValueTo, setMobileVersValueTo] = useState('')
    let [docType, setDocType] = useState('')
    let [stateField, setStateField] = useState('')

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
        MotionStatus: MotionStatus,
        PageNumber: currentPage,
        RecordsPerPage: rowsPerPage,
      }
      dispatch(getFilteredDocs(filter))


    }
    return (
      <Card>
        <div className={'m-3'}>
          <div
            className={'d-flex mb-4 justify-content-between wrapper'}>
            <DocNumberField
              docNumberVal={docNumberVal}
              setDocNumberVal={setDocNumberVal}
              className={'docNumberField'}
            />
            <DatePickers
              setValueFrom={setValueFrom}
              setValueTo={setValueTo}
              mobileVersValueFrom={mobileVersValueFrom}
              setMobileVersValueFrom={setMobileVersValueFrom}
              mobileVersValueTo={mobileVersValueTo}
              setMobileVersValueTo={setMobileVersValueTo}
            />
            <DocTitleField
              docTitleVal={docTitleVal}
              setDocTitleVal={setDocTitleVal}
              className={'docTitleField'}
            />


          </div>
          <div className={''}>
            <DocType
              setDocType={setDocType}
              docType={docType}
            />
            <div className={'d-flex justify-content-between'}>
              <Division
                division={division}
              />
              <Executor
                executor={executor}
              />
              <Author
                Author={author}
              />
              <div>
                <DocStateField
                  setStateField={setStateField}
                  stateField={stateField}
                />
              </div>
            </div>

          </div>

        </div>
        <div className={'pr-3'}>
          <Button className={'float-right mb-4'}
                  onClick={getValues}
          >ძებნა</Button>
        </div>

      </Card>
    );
  }
;

export default SearchCard;
