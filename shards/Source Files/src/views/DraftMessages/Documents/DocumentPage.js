import React, {useState} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form, FormInput,
  Row
} from "shards-react";
import DocumentBody
  from "./DocumentBody";
import Pagination from "../../../Pagination/Pagination";
import styled from "styled-components";
import {useSelector} from "react-redux";
import Preloader from "../../../Preloader/Preloader";
import MySelect from "../../../MySelect/MySelect";

let Styles = styled.div`
  .messWrapper:hover {
    background: #cfd2ce;
    cursor: pointer;
  }

  .input {
    max-width: 80px;
  }
  .container{
    padding-left: 0;
  }
`

const DocumentPage = ({pageTitle, pageName, Documents, ...props}) => {
  let loading = useSelector(state => state.GetDoc.isLoading)

  let [searchByValue, setSearchByValue] = useState('')
  let [searchByDocumentTypeValue, setSearchByDocumentTypeValue] = useState('')
  let [searchByAuthorValue, setSearchByAuhtorValue] = useState('')


  let [searchBy, setSearchBy] = useState([
    {id: 1, displayName: 'სათაურით'},
    {id: 2, displayName: 'აღწერით'},
  ])
  let [searchByDocumentType, setSearchByDocumentType] = useState([
    {id: 1, displayName: 'მიღებულები'},
    {id: 2, displayName: 'გაგზავნილები'},
    {id: 3, displayName: 'ხელმოსაწერები'},
    {id: 4, displayName: 'დრაფტები'},
    {id: 5, displayName: 'გაუქმებულები'},
  ])
  let [searchByAddresants, setSearchByAddresants] = useState([
    {id: 1, displayName: 'ვახო'},
    {id: 2, displayName: 'გივი'},
    {id: 3, displayName: 'თეკლა'},
    {id: 4, displayName: 'გოჩა'},
    {id: 5, displayName: 'მარი'},
  ])
  if (loading === true) {
    return <Preloader/>
  }

  let onSearchByChange = (e) => {
    setSearchByValue(e.target.value)
  }
  let onSearchByDocumentTypeChange = (e) => {
    setSearchByDocumentTypeValue(e.target.value)
  }
  let onAuthorChange = (e) => {
    setSearchByAuhtorValue(e.target.value)
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
                <Form className={'d-flex flex-column p-3'}>
                  <div className={'d-flex'}>
                    <MySelect
                      options={searchBy}
                      defaultValue={'ძიება'}
                      value={searchByValue}
                      onChange={onSearchByChange}
                      className={'mySelect ml-0'}
                    />
                    <MySelect
                      options={searchByDocumentType}
                      defaultValue={'ძიება დოკ.ტიპით'}
                      value={searchByDocumentTypeValue}
                      onChange={onSearchByDocumentTypeChange}
                      className={'mySelect'}
                    />
                    <MySelect
                      options={searchByAddresants}
                      defaultValue={'ძიება ავტორით'}
                      value={searchByAuthorValue}
                      onChange={onAuthorChange}
                      className={'mySelect'}
                    />
                    <FormInput type="text"
                               placeholder={'დოკ.ნომერი'}
                               className={'input'}
                    />
                  </div>
                  <div>
                    <FormInput type="text"
                               placeholder={'ძიება...'}
                               className={'mt-3'}

                    />
                  </div>



                </Form>
                <div  className={'pr-3'}>
                  <Button className={'float-right mb-4'}>ძებნა</Button>
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
