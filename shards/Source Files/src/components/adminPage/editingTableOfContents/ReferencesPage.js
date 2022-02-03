import React, {useEffect, useState} from 'react';
import {Button, Card, Col} from "shards-react";
import MySelect from "../../../MySelect/MySelect";
import {getReferenceTypes} from "../../../Reducers/referenceType";
import {useDispatch, useSelector} from "react-redux";
import API from "../../../API/ApiBases";
import {setFinishOptionsAC} from "../../../Reducers/getDocReducer";
import styled from "styled-components";
import ReferenceTables from "./referenceTables";
import ChangeReferenceModal from "./changeReferenceModal";
import AddTypeModal from "./addTypeModal";


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
  @media(max-width: 470px){
    .wrapp-table{
      font-size: 12px;
    }
  }
  @media(max-width: 368px){
    .wrapp-table{
      font-size: 10px;
    }
  }
  @media(max-width: 300px){
    .wrapp-table{
      font-size: 8px;
    }
  }
`

const ReferencesPage = () => {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getReferenceTypes())
  }, [])
  let referenceTypes = useSelector((state => state.getReferenceTypes.referenceTypes))
  let updatedReference = useSelector((state => state.updateReference.updatedReference))
  let [referenceValue, setReferenceValue] = useState('')
  let [addTypeModalOpen, setAddTypeModalOpen] = useState(false)
  let [editModal, setEditModal] = useState(false)
  let [referenceTypeUrl, setReferenceTypeUrl] = useState('')
  let [isLoadingTypes, setIsLoadingTypes] = useState(false)

  let onChangeReference = (e) => {
    setReferenceValue(e.target.value)
  }
  let [options, setOptions] = useState([])
  useEffect(() => {
    setIsLoadingTypes(true)
    if (!options.length) {
      setIsLoadingTypes(false)
    }
    if (referenceValue === 'დასრულების ტიპები') {
      API.FinishDocumentSelectTypes().then((response) => {
        if (response) {
          dispatch(setFinishOptionsAC(response.data))
          setOptions(response.data)
          setReferenceTypeUrl('CompletionResults')
          setIsLoadingTypes(false)

        }
      })
    }
    if (referenceValue === 'დოკუმენტის ტიპები') {
      API.getDocTypes().then(response => {
        setOptions(response.data)
        setReferenceTypeUrl('DocumentTypes')
        setIsLoadingTypes(false)

      })
    }
    if (referenceValue === 'თანამდებობები') {
      API.getPositions().then(response => {
        setOptions(response.data)
        setReferenceTypeUrl('positions')
        setIsLoadingTypes(false)

      })
    }
  }, [referenceValue, updatedReference])

  let [items, setItems] = useState(null)

  let edit = (items) => {
    setEditModal(true)
    setItems(items)
  }

  let closeAddTypeModal = () => {
    setAddTypeModalOpen(v => !v)
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
            referenceTypeUrl={referenceTypeUrl}
          />
          <Button
            onClick={closeAddTypeModal}
            disabled={options.length === 0 && true}
          >ტიპის დამატება</Button>
        </Col>
        <Col>
          <ReferenceTables
            options={options}
            setEditModal={setEditModal}
            edit={edit}
            isLoadingTypes={isLoadingTypes}

          />


          <ChangeReferenceModal
            editModal={editModal}
            setEditModal={setEditModal}
            items={items}
            referenceTypeUrl={referenceTypeUrl}
          />
        </Col>
      </Card>
    </Styles>
  );
};

export default ReferencesPage;
