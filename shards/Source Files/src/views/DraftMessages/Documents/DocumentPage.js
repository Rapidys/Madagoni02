import React from 'react';
import {Card, CardHeader, Col, Container, Row} from "shards-react";
import DocumentBody
  from "./DocumentBody";
import Pagination from "../../../Pagination/Pagination";
import styled from "styled-components";
import {useSelector} from "react-redux";
import Preloader from "../../../Preloader/Preloader";
import fire from '../../../assets/fire.gif'

let Styles = styled.div`
  .messWrapper:hover {
    //background: #cfd2ce;
    cursor: pointer;
    background-image: url(${fire}) ;
    background-position: 150% 20%;
    background-repeat: repeat;
    filter: brightness(75%) saturate(2);
    overflow: hidden;

   color:white;
  }

`

const DocumentPage = ({pageTitle, pageName, Documents, ...props}) => {
  let loading = useSelector(state => state.GetDoc.isLoading)

  if (loading === true) {
    return <Preloader/>
  }
  return (
    <Styles>

      <Container fluid className="main-content-container px-4">
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0 text-black">{pageTitle}</h6>
              </CardHeader>
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
