import React from 'react';
import {Button, Collapse} from "shards-react";
import Chosen from "./chosen";
import {useSelector} from "react-redux";

const DocumentDestinates = ({
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

          <Chosen
            chosenDestination={props.chosenDestination}
          />

        </div>

      </Collapse>

    </div>
  );
};

export default DocumentDestinates;
