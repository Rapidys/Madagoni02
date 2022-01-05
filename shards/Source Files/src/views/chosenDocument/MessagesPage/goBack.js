import React, {Component} from 'react';
import styled from "styled-components";
import {useHistory} from "react-router-dom";

let Styles = styled.span`
  .backIcon {
    font-size: 30px;
    cursor: pointer;
    color: rgba(231, 204, 1, 0.81);
  }

  .backIcon:hover {
    color: rgba(231, 204, 1, 0.61);
  }
`

let GoBack = () => {
  let history = useHistory()

  return (
    <Styles>
      <i className="fas fa-arrow-circle-left float-left backIcon"
         onClick={history.goBack}
      />
    </Styles>
  );
}

export default GoBack;
