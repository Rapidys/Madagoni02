import React, {useState} from 'react';
import {Card, Col, Nav, NavItem} from "shards-react";
import {Link, NavLink} from "react-router-dom";
import styled from "styled-components";

let Styles = styled.div`

  * {
    flex-direction: column;
  }

  .wrapp {
    height: 514px;
  }
`

const AdminPage = () => {

  let [adminPanelFunctions, setAdminPanelFunctions] = useState([
    {
      title: "დიაგრამების კონტროლი",
      to: "chartControl"
    },
    {
      title: "სტრუქტურის რედაქტირება",
      to: "/register"
    },
    {
      title: "სხვა",
      to: "/register"
    },
  ])
  return (
    <Styles>
      <Card className={'wrapp '}>
        <Col>
          <Nav className={" p-5"}>
            {adminPanelFunctions.map((item, idx) => (
              <NavItem key={idx} className={"mt-5"}>
                <NavLink tag={Link} to={item.to} className={"mr-3"}>
                  {idx + 1}. {item.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Col>
      </Card>
    </Styles>

  );
};

export default AdminPage;
