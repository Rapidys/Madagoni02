import React, {useEffect} from 'react';
import {Card, CardBody} from "shards-react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {getFiles} from "../../../Reducers/MyFilesReducer";
import Pagination from "../../../Pagination/Pagination";

let Styles = styled.div`
  .wrapper {
    min-height: 500px;
  }

  .File:hover {
    background: grey;
  }


`

const MyFiles = () => {

  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
  let totalCount = useSelector(state => state.PaginationData.totalPages)


  let MyFiles = useSelector((state => state.MyFiles.Files))
  let router = useHistory()
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFiles(rowsPerPage, currentPage))
  }, [currentPage,rowsPerPage])
  return (

    <Styles>
      <div className={'wrapper'}>
        <Card>
          <CardBody className="p-4 pb-3">

            <table className="table mb-0 p-5">
              <thead className="thead bg-light">
              <tr>
                <th scope="col" className="border-0">
                  ფაილები
                </th>
                <th scope="col" className="border-0">
                  სათაური
                </th>


              </tr>
              </thead>
              <tbody>


              {MyFiles.map((file, index) => {
                return (
                  <tr
                    key={index}
                    className={'File'}
                    onClick={() => {
                      router.push(`File/${index + 1}`)
                    }}
                  >
                    <td className={'td-Id'}>{file.id}</td>
                    <td className={'td-title'}>{file.title}</td>
                  </tr>


                )
              })}
              </tbody>

            </table>

            <Pagination
              totalCount={100}
              rowsPerPage={rowsPerPage}
              currentPage={currentPage - 1}
            />
          </CardBody>
        </Card>

      </div>

    </Styles>


  );
};

export default MyFiles;
