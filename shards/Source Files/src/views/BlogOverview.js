import React, {useEffect} from 'react';
import PrimaryChart from "../components/blog/Chart/PrimaryChart";
import {useDispatch, useSelector} from "react-redux";
import {GetChart} from "../Reducers/ChartReducer";
import {useParams} from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const ChartPage = () => {
  let dispatch = useDispatch()
  let params = useParams()

  useEffect(() => {
    dispatch(GetChart(params.id))
  }, [params.id])

  const chartData = useSelector((state => state.ChartData.chosenChart))
  const isChartsLoading = useSelector((state => state.ChartData.isChartsLoading))
  if (isChartsLoading === true) {
    return <Preloader/>
  }
  return (
    <PrimaryChart chartData={chartData}/>
  )
};


export default ChartPage;
