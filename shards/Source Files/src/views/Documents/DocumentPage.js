import React, {useEffect} from 'react';
import {
  Card, CardBody,
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
import {
  getType,
} from "../../Reducers/addNewPost/selectDocReducer";
import SearchCard from "./searchCard";

let Styles = styled.div`
  .messWrapper:hover {
    background: #cfd2ce;
    cursor: pointer;
  }


`

const DocumentPage = ({pageTitle, pageName, Documents, ...props}) => {

  let dispatch = useDispatch()


  useEffect(() => {
    dispatch(getType())
  }, [])




  return (
    <Styles>

      <Container fluid={true} className="px-4 mb-5">
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0 text-black">{pageTitle}</h6>
              </CardHeader>
              <SearchCard/>
              <CardBody className="p-0">
                <DocumentBody pageName={pageName}
                              Documents={Documents}

                />
              </CardBody>
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
