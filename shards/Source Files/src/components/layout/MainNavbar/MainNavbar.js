import React from "react";
import classNames from "classnames";
import {Container, Navbar} from "shards-react";
import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";
import jwtDecode from "jwt-decode";

const MainNavbar = ({stickyTop}) => {
  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );


  let token = localStorage.getItem('token')
  let decoded = jwtDecode(token);


  return (
    <div className={classes}>
      <Container className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          <NavbarSearch/>

          <div>
            <h6 className={'align-self-center mb-0 mr-2'}>{decoded.Email}</h6>
            <NavbarNav/>
            <NavbarToggle/>
          </div>

        </Navbar>
      </Container>
    </div>
  );
};


MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
