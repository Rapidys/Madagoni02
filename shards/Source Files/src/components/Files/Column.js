import React from 'react';

const Column = ({Col}) => {
  return (
    <tr>
      {
        Col && Col.map((item, index) => {
          return <td key={index}>
            <input type="text"/>
          </td>
        })
      }
    </tr>
  );
};

export default Column;
