import React from 'react';
import {TablePagination} from "@material-ui/core";
import {rowsPerPageAc, setCurrentPageAC} from "../Reducers/PaginationReducer";
import {useDispatch} from "react-redux";

const Pagination = (props) => {
  let dispatch = useDispatch()

  const handleChangePage = (event, newPage) => {
    dispatch(setCurrentPageAC(newPage + 1));
  };

  const handleChangeRowsPerPage = event => {
    dispatch(rowsPerPageAc(parseInt(event.target.value, 10)));
    dispatch(setCurrentPageAC(1));
  };


  return (
    <div>
      {<TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Number(props.totalCount)}
        rowsPerPage={props.rowsPerPage}
        page={props.currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />}

    </div>
  );
};

export default Pagination;
