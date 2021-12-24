import React from 'react';
import {FormCheckbox} from "shards-react";

const VisiblePositions = ({positionVisibility,setPositions}) => {
  return (
    <div className={'checkbox mr-5'}>
      <FormCheckbox toggle small
                    checked={positionVisibility}
                    onChange={setPositions}
      >
        თანამდებობები
      </FormCheckbox>
    </div>
  );
};

export default VisiblePositions;
