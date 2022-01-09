import React, {useEffect} from 'react';
import {CardBody} from "shards-react";
import {useHistory} from "react-router-dom";
import styled from 'styled-components'
import Pagination from "../../../Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {GetCharts} from "../../../Reducers/ChartReducer";


let Styles = styled.div`
  .trWrapper:hover {
    background: #cfd2ce;
    cursor: pointer;
  }


`
const ChartPages = (props) => {
  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector((state => state.PaginationData.rowsPerPage))
  let totalCount = useSelector(state => state.PaginationData.totalPages)

  let dispatch = useDispatch()

  const chartData = useSelector((state => state.ChartData.Charts))
  useEffect(() => {
    dispatch(GetCharts(currentPage, rowsPerPage))
  }, [])
  let history = useHistory()
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
                  onClick={() =>
                    history.push(`/Chart/${chart.chartId}`)
                  }
                  className={'trWrapper'}
              >
                <td className={"resTtd"}>{chart.chartId}</td>
                {/*<td >*/}
                {/*  {new Intl.DateTimeFormat("en-US", {*/}
                {/*    month: "numeric",*/}
                {/*    day: "2-digit",*/}
                {/*    year: "numeric",*/}

                {/*  }).format(new Date(Mess.documentDate))}*/}
                {/*</td>*/}
                <td>{chart.chartName}</td>
                <td>{chart.dateCreated.slice(0, 10)}</td>
                <td>

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
