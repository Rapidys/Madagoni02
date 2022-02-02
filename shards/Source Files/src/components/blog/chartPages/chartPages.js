import React, {useEffect} from 'react';
import {CardBody} from "shards-react";
import styled from 'styled-components'
import Pagination from "../../../Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {GetCharts} from "../../../Reducers/ChartReducer";
import Preloader from "../../../Preloader/Preloader";


let Styles = styled.div`
  .trWrapper:hover {
    background: #cfd2ce;
    cursor: pointer;
  }

  @media (max-width: 450px) {
    .trWrapper {
      font-size: 10px;
    }
  }
  @media (max-width: 330px) {
    .trWrapper {
      font-size: 8px;
    }
  }


`
const ChartPages = () => {
  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector((state => state.PaginationData.rowsPerPage))

  let dispatch = useDispatch()
  const isChartsLoading = useSelector((state => state.ChartData.isChartsLoading))

  const chartData = useSelector((state => state.ChartData.Charts))
  useEffect(() => {
    dispatch(GetCharts(currentPage, rowsPerPage))
  }, [currentPage, rowsPerPage])


  let openChart = (newPageUrl) => {
    window.open(newPageUrl, "_blank")
  }

  if (isChartsLoading === true) {
    return <Preloader/>
  }
  return (

    <Styles>
      <CardBody className="p-4 pb-3">

        <table className="table mb-0 p-5">
          <thead className="thead bg-light">
          <tr>
            <th scope="col" className="resTtd border-0">
              ნომერი
            </th>
            <th scope="col" className="resTtd border-0">
              სათაური
            </th>
            <th scope="col" className="resTtd border-0">
              თარიღი
            </th>

          </tr>
          </thead>
          <tbody>

          {chartData.charts && chartData.charts.map((chart, index) => {
            return (
              <tr key={index}
                  onClick={() => openChart(`/Chart/${chart.chartId}`)}
                  className={'trWrapper'}
              >
                <td className={"resTtd"}>{chart.chartId}</td>

                <td className={"resTtd"}>{chart.chartName}</td>
                <td className={"resTtd"}>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "numeric",
                    day: "2-digit",
                    year: "numeric",

                  }).format(new Date(chart.dateCreated))}

                </td>


              </tr>


            )
          })}

          </tbody>

        </table>

        <Pagination
          totalCount={chartData.totalCount}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage - 1}
        />
      </CardBody>
    </Styles>

  );
};

export default ChartPages;
