import React, {useEffect} from 'react';
import {
  Card,
  CardBody
} from "shards-react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import Pagination from "../../../Pagination/Pagination";
import {getFiles} from "../../../Reducers/files/getFilesReducer";
import Preloader from "../../../Preloader/Preloader";
import API from "../../../API/ApiBases";

let Styles = styled.div`
  .wrapper {
    min-height: 500px;
  }

  .File:hover {
    background: #cfd2ce;
    cursor: pointer;
  }

`

const MyFiles = () => {

  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)

  let MyFiles = useSelector((state => state.MyFiles.files))
  let loading = useSelector((state => state.MyFiles.loading))
  let router = useHistory()
  let dispatch = useDispatch()



  useEffect(() => {
    dispatch(getFiles(currentPage, rowsPerPage))
  }, [currentPage, rowsPerPage])


  let deleteFile = (id) => {
    API.deleteFile(id).then(response => {
      dispatch(getFiles(currentPage, rowsPerPage))
    })
  }

  if (loading) {
    return <Preloader/>
  }
  return (
    <Styles>
      <div className={'wrapper mb-5'}>
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
                <th scope="col" className="border-0">
                </th>


              </tr>
              </thead>
              <tbody>


              {MyFiles.files && MyFiles.files.map((file, index) => {
                return (
                  <tr
                    key={file.fileId}
                    className={'File'}
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`file/${file.fileId}`)
                    }}

                  >
                    <td className={'td-Id'}>{file.fileId}</td>
                    <td className={'td-title'}>{file.fileTitle}</td>

                    <td>
                      <i className="far fa-trash-alt text-danger float-right"
                         onClick={(e) => {
                           e.stopPropagation()
                           deleteFile(file.fileId)
                         }
                         }
                      />

                    </td>

                  </tr>

                )
              })}
              </tbody>

            </table>

            <Pagination
              totalCount={MyFiles.totalCount}
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
