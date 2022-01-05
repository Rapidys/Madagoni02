import React, {Component} from 'react';
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {Tooltip} from "@material-ui/core";

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

      <Tooltip
        title={<span style={{
          color: 'white',
          fontSize: '16px'
        }}>უკან</span>}
        arrow>
        <i className="fas fa-arrow-circle-left float-left backIcon"
           onClick={history.goBack}
        />
      </Tooltip>
    </Styles>
  );
}

export default GoBack;
