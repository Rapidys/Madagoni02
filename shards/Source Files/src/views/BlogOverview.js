import React, {useEffect} from 'react';
import PageTitle from "../components/common/PageTitle";
import {Container, Row} from "shards-react";
import PrimaryChart from "../components/blog/Chart/PrimaryChart";
import {useDispatch, useSelector} from "react-redux";
import {GetChart} from "../Reducers/ChartReducer";
import {useParams} from "react-router-dom";

const ChartPage = () => {
  let dispatch = useDispatch()
  let params = useParams()

  useEffect(() => {
    dispatch(GetChart(params.id))
  }, [params.id])
  const chartData = useSelector((state => state.ChartData.chosenChart))

  return (
    <Container fluid className="main-content-container px-4">


      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle title="სტატისტიკები" subtitle="იხილეთ"
                   className="text-sm-left mb-3 ml-1"/>
      </Row>


      <Row>
        <PrimaryChart chartData={chartData}/>
      </Row>


    </Container>)
};


export default ChartPage;
