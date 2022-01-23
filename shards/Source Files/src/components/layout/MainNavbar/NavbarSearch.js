import React, {useState} from "react";
import {
  DropdownToggle,
  Collapse,
  DropdownMenu,
  Dropdown,
  DropdownItem, NavItem,
} from "shards-react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {setChangePage} from "../../../Reducers/files/UpdateFileReducer";
import {useDispatch} from "react-redux";


let Styles = styled.div`
  .items {
    cursor: pointer;
    color: black;
  }

  .items:hover {
    color: #007bff;
  }

  .moreBtn {
    font-size: 20px;
  }

  .hov:hover {
    color: #007bff;

  }


`

export default () => {


  const [visible, setVisible] = useState(false)
  let dotesToggle = () => {
    setVisible((c) => !c);
  }

  return (
    <Styles className={"align-items-center"}>
      <Dropdown open={visible} toggle={dotesToggle}>
        <DropdownToggle className={"bg-light border-0"}>
          <i className="material-icons moreBtn">more_vert</i>

        </DropdownToggle>
        <Collapse tag={DropdownMenu} left={"true"} small>
          <NavLink to="/addChart" className={"text-decoration-none"}>
            <DropdownItem className={"items"}>
              <i
                className="material-icons cursor-pointer hov">add_to_photos</i>
              <span className={"ml-2"}>დიაგრამის შექმნა</span>
            </DropdownItem>
          </NavLink>
          <NavLink to="/MyCharts" className={"text-decoration-none"}>
            <DropdownItem className={"items"}>
              <i
                className="material-icons cursor-pointer hov">assessment</i>
              <span className={"ml-2"}>დიაგრამები</span>
            </DropdownItem>
          </NavLink>

          <DropdownItem divider/>
          <NavLink to="/blog-posts" className={"text-decoration-none"}>
            <DropdownItem className={"items"}>
              <i
                className="material-icons cursor-pointer hov">vertical_split</i>
              <span className={"ml-2"}>პოსტები</span>
            </DropdownItem>
          </NavLink>
          <NavLink to="/newFile" className={"text-decoration-none"}>
            <DropdownItem className={"items"}>
              <i
                className="material-icons cursor-pointer hov">description</i>
              <span className={"ml-2"}>ფაილის შექმნა</span>
            </DropdownItem>
          </NavLink>
          <NavLink to="/MyFiles" className={"text-decoration-none"}>
            <DropdownItem className={"items"}>
              <i
                className="material-icons cursor-pointer hov">description</i>
              <span className={"ml-2"}>ჩემი ფაილები</span>
            </DropdownItem>
          </NavLink>

          <NavLink to="/adminPage" className={"text-decoration-none"}>
            <DropdownItem className={"items"}>
              <i
                className="material-icons cursor-pointer hov">widgets</i>

              <span className={"ml-2"}>ადმინისტრირება</span>
            </DropdownItem>
          </NavLink>
        </Collapse>
      </Dropdown>

    </Styles>

  )
};
