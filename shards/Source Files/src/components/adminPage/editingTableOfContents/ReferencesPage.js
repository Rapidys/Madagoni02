import React, {useEffect, useMemo, useState} from 'react';
import {Button, Card, Col} from "shards-react";
import MySelect from "../../../MySelect/MySelect";
import {getReferenceTypes} from "../../../Reducers/referenceType";
import {useDispatch, useSelector} from "react-redux";
import API from "../../../API/ApiBase";
import {setFinishOptionsAC} from "../../../Reducers/getDocReducer";
import styled from "styled-components";
import ReferenceTables from "./referenceTables";
import ChangeReferenceModal from "./changeReferenceModal";
import AddTypeModal from "./addTypeModal";
import {setReference} from "../../../Reducers/updateReferenceReducer";


let Styles = styled.div`
  .edit-icon {
    font-size: 25px;
    color: #17c671;
  }

  .edit-icon:hover {
    color: blue;
  }

  .table-row:hover {
    background: rgba(159, 187, 231, 0.51);
    cursor: pointer;

  }

`

const ReferencesPage = () => {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getReferenceTypes())
  }, [])
  let referenceTypes = useSelector((state => state.getReferenceTypes.referenceTypes))
  let [referenceValue, setReferenceValue] = useState('')
  let [addTypeModalOpen, setAddTypeModalOpen] = useState(false)
  let [editModal, setEditModal] = useState(false)
  let [referenceTypeUrl, setReferenceTypeUrl] = useState('')
  let onChangeReference = (e) => {
    setReferenceValue(e.target.value)
  }
  let [options, setOptions] = useState([])
  useEffect(() => {
    API.FinishDocumentSelectTypes().then((response) => {
      if (response) {
        dispatch(setFinishOptionsAC(response.data))
        setOptions(response.data)
        setReferenceTypeUrl('CompletionResults')
      }
    })
    if (referenceValue === 'დასრულების ტიპები') {
      API.FinishDocumentSelectTypes().then((response) => {
        if (response) {
          dispatch(setFinishOptionsAC(response.data))
          setOptions(response.data)
          setReferenceTypeUrl('CompletionResults')
        }
      })
    }
    if (referenceValue === 'დოკუმენტის ტიპები') {
      API.getDocTypes().then(response => {
        setOptions(response.data)
        setReferenceTypeUrl('DocumentTypes')
      })
    }
    if (referenceValue === 'თანამდებობები') {
      API.getPositions().then(response => {
        setOptions(response.data)
        setReferenceTypeUrl('positions')
      })
    }
  }, [referenceValue])

  let [items, setItems] = useState(null)

  let edit = (items) => {
    setEditModal(true)
    setItems(items)
  }

  let closeAddTypeModal = () => {
    setAddTypeModalOpen(v => !v)
  }
  let saveChanges = () => {
    dispatch(setReference(referenceTypeUrl, options))
  }
  return (
    <Styles>
      <Card className={'wrapp p-3'}>
        <Col className={'mb-4'}>
          <h6 className={'mb-4'}>სარჩევის ტიპები</h6>
          <MySelect
            defaultValue={'ტიპები'}
            options={referenceTypes}
            onChange={onChangeReference}
            value={referenceValue}
          >

          </MySelect>
        </Col>
        <Col>
          <AddTypeModal
            closeAddTypeModal={closeAddTypeModal}
            addTypeModalOpen={addTypeModalOpen}
            options={options}
            setAddTypeModalOpen={setAddTypeModalOpen}
            setOptions={setOptions}
          />
          <Button
            onClick={closeAddTypeModal}
            className={'ml-2'}
          >ტიპის დამატება</Button>
        </Col>
        <Col>
          <ReferenceTables
            options={options}
            setEditModal={setEditModal}
            edit={edit}

          />

          <Button className={'mt-4 bg-warning border-0 ml-2'}
                  onClick={saveChanges}
          >შენახვა</Button>
          <ChangeReferenceModal
            editModal={editModal}
            setEditModal={setEditModal}
            items={items}
            options={options}
          />
        </Col>
      </Card>
    </Styles>
  );
};

export default ReferencesPage;
