import React, {useEffect, useState} from 'react';
import {TablePagination, useMediaQuery} from "@material-ui/core";
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



  let [isTooSmallDisplay, setIsTooSmallDisplay] = useState(false)
  const matchesMax = useMediaQuery('(max-width:330px)');
  const matchesMin = useMediaQuery('(min-width:330px)');

  useEffect(() => {
    if (matchesMax === true) {
      setIsTooSmallDisplay(false)
    }
    if (matchesMin === true) {
      setIsTooSmallDisplay(true)
    }

  }, [matchesMin,matchesMax])


  return (
    <div>
      {<TablePagination
        rowsPerPageOptions={isTooSmallDisplay ? [5, 10, 25] : []}
        labelRowsPerPage=''
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
