import React from 'react';
import PageTitle from "../components/common/PageTitle";
import {Col, Container, Row} from "shards-react";
import UsersOverview from "../components/blog/UsersOverview";
import UsersByDevice from "../components/blog/UsersByDevice";
import PrimaryChart from "../components/blog/Chart/PrimaryChart";

const BlogOverview = () => {


  return (
    <Container fluid className="main-content-container px-4">


      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle title="სტატისტიკები" subtitle="იხილეთ"
                   className="text-sm-left mb-3 ml-1"/>
      </Row>

      {/* Small Stats Blocks */}
      <Row>
        <PrimaryChart/>
      </Row>

      <Row>
        {/* Users Overview */}
        <Col lg="8" md="12" sm="12" className="mb-4">
          <UsersOverview/>
        </Col>

        {/* Users by Device */}
        <Col lg="4" md="6" sm="12" className="mb-4">
          <UsersByDevice/>
        </Col>


      </Row>
    </Container>)
};




export default BlogOverview;
