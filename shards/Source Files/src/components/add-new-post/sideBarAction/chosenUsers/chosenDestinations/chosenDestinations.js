import React from 'react';
import {Button, Col, Collapse, Row} from "shards-react";
import Chosen from "./chosen";

const ChosenDestinations = ({
                              setVisibleDestinations,
                              visibleDestinations,
                              handleClickOpen,
                              ...props
                            }) => {
  return (
    <div>
      <Button
        className={"w-100"}
        onClick={() => {
          setVisibleDestinations(v => !v)
        }}
      >ადრესატები</Button>
      <Collapse open={visibleDestinations}>
          <span className={'circleClases'}>
             <i className="fas fa-plus-circle mt-3"
                onClick={handleClickOpen}
             />
          </span>

        <Chosen
          chosenDestination={props.chosenDestination}
        />
      </Collapse>

    </div>
  );
};

export default ChosenDestinations;
