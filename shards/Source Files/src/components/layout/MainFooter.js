import React from "react";
import {Container, Row} from "shards-react";


const MainFooter = ({contained}) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top fixed-bottom">
    <Container fluid={contained}>
      <Row>
        <span className="copyright ml-auto my-auto mr-2">copyright CyberDoc</span>
      </Row>
    </Container>
  </footer>
);


export default MainFooter;
