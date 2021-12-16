import React from 'react';
import {Button, Collapse} from "shards-react";
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
        <div className={'d-flex flex-column text-center'}>
          <div>
            <span className={'circleClases'}>
             <i className="fas fa-plus-circle mt-3 "
                onClick={handleClickOpen}
             />
          </span>

          </div>
          <Chosen
            chosenDestination={props.chosenDestination}
          />
        </div>

      </Collapse>

    </div>
  );
};

export default ChosenDestinations;
