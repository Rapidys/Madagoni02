import React from "react";
import {
  NavLink as RouteNavLink,
} from "react-router-dom";
import {NavItem, NavLink} from "shards-react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {setFilteredDocAC} from "../../../../Reducers/filterReducer";


let Styles = styled.div`
  .navBreak {
    max-width: 130px;
    overflow-wrap: break-word;
    white-space: pre-wrap;

  }
`


const SidebarNavItem = ({item}) => {

  let dispatch = useDispatch()
  let clearFilter = () => {
    dispatch(setFilteredDocAC([]))

  }
  return (
    <Styles>
      <NavItem>
        <NavLink tag={(props) => <RouteNavLink {...props}
                                               onClick={clearFilter}
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
