import React from 'react';
import PageTitle from "../components/common/PageTitle";
import {Container, Row} from "shards-react";
import PrimaryChart from "../components/blog/Chart/PrimaryChart";
import {useDispatch} from "react-redux";

const BlogOverview = () => {
  let dispatch = useDispatch()

  return (
    <Container fluid className="main-content-container px-4">


      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle title="სტატისტიკები" subtitle="იხილეთ"
                   className="text-sm-left mb-3 ml-1"/>
      </Row>

       Small Stats Blocks
      <Row>
        <PrimaryChart/>
      </Row>


    </Container>)
};


export default BlogOverview;
