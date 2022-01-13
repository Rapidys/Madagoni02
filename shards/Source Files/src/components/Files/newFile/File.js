import React from 'react';
import {CardBody, CardHeader, Col, Container, Row} from "shards-react";
import {Card} from "@material-ui/core";
import SpreadSheet from "./spreadSheet";

const Files = () => {


  return (
    <Container fluid className="main-content-container px-4">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              ფაილები
            </CardHeader>
            <CardBody >
              <SpreadSheet />
            </CardBody>


          </Card>
        </Col>
      </Row>
    </Container>

  );
};

export default Files;
