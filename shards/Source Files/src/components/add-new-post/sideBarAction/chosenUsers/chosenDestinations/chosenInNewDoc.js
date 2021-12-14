import React from 'react';
import {Button} from "shards-react";
import Chosen from "./chosen";

const ChosenInNewDoc = ({handleClickOpen, ...props}) => {
  return (
    <div>
      <Button
        className={"w-100"}
        onClick={handleClickOpen}
      >ადრესატები</Button>
      <div>


        <Chosen
          chosenDestination={props.chosenDestination}
        />
      </div>
    </div>
  );
};

export default ChosenInNewDoc;
