import React from 'react';

const Column = ({Col}) => {
  return (

    <tr>
      {
        Col && Col.map((item, index) => {

          return  <td key={index}>
              <input type="text" value={Col.value}
                     onChange={(e) => Col[index].value = e.target.value}

              />
            </td>




        })
      }
    </tr>
  );
};

export default Column;
