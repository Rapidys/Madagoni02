import React from 'react';


export let MotionTypeFiltering = (chosen, chosenDestination, chosenVisitor) => {
  {
    chosen.documentMotions && chosen.documentMotions.forEach((item, i) => {
      if (item.motionTypeId === 3) return chosenDestination[i] = item;
    })
  }
    {
      chosen.documentMotions && chosen.documentMotions.forEach((item, i) => {
        if (item.motionTypeId === 2) return chosenVisitor[i] = item;
      })
    }

  // {
  //   chosen.documentMotions && chosen.documentMotions.forEach((item) => {
  //     if (item.motionTypeId === 1) return console.log(item);
  //   })
  // }
}


export default MotionTypeFiltering;


