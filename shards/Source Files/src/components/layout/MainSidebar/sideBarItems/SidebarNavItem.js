import React, {useEffect} from "react";
import {
  NavLink as RouteNavLink,
  useHistory,
  useLocation
} from "react-router-dom";
import {NavItem, NavLink} from "shards-react";
import styled from "styled-components";
import {getDocs} from "../../../../API/sentDocumentService";
import {useDispatch, useSelector} from "react-redux";
import {isFilteredAC} from "../../../../Reducers/filterReducer";

let Styles = styled.div`
  .navBreak {
    max-width: 130px;
    overflow-wrap: break-word;
    white-space: pre-wrap;

  }
`


const SidebarNavItem = ({item}) => {

  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
  let MotionStatus = useSelector((state => state.MotionStatus.motionStatus))

  let dispatch = useDispatch()
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/incomingDocuments') {
      dispatch(getDocs({
        MotionStatus: 5,
        PageNumber: currentPage,
        RecordsPerPage: rowsPerPage,
      }))
    }
    if (location.pathname === '/signatureDocuments') {
      dispatch(getDocs({
        MotionStatus: 3,
        PageNumber: currentPage,
        RecordsPerPage: rowsPerPage,
      }))
    }
    if (location.pathname === '/sentDocuments') {
      dispatch(getDocs({
        MotionStatus: 2,
        PageNumber: currentPage,
        RecordsPerPage: rowsPerPage,
      }))
    }
    if (location.pathname === '/draftDocuments') {
      dispatch(getDocs({
        MotionStatus: 1,
        PageNumber: currentPage,
        RecordsPerPage: rowsPerPage,
      }))
    }
    if (location.pathname === '/canceled') {
      dispatch(getDocs({
        MotionStatus: 7,
        PageNumber: currentPage,
        RecordsPerPage: rowsPerPage,
      }))
    }
  }, [location])


  return (
    <Styles>
      <NavItem>
        <NavLink tag={(props) => <RouteNavLink {...props}
        />} to={item.to}
                 className={'d-flex align-items-center'}>
          {item.htmlBefore && (
            <div
              className="d-inline-block item-icon-wrapper"
              dangerouslySetInnerHTML={{__html: item.htmlBefore}}
            />
          )}
          {item.title &&
            <span className={'navBreak'}>{item.title}</span>
          }
        </NavLink>
      </NavItem>
    </Styles>

  )
};


export default SidebarNavItem;
