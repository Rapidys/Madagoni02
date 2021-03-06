import React from 'react';
import Preloader from "../../../Preloader/Preloader";



const ReferenceTables = ({options, edit,isLoadingTypes}) => {


  if (isLoadingTypes === true) {
    return <Preloader/>
  }

  return (
    <table className="table mb-0 p-5 wrapp-table">
      <thead className="thead bg-light">
      <tr>
        <th scope="col" className="resTtd border-0">
          რედაქტირება
        </th>
        <th scope="col" className="resTtd border-0">
          ტიპები
        </th>
        <th scope="col" className="resTtd border-0">
          აქტიური
        </th>
      </tr>
      </thead>
      <tbody>
      {options && options.map((items) => {
        return <tr
          className={`table-row ${items.isActive === false ? 'bg-danger' : ''}`}
          key={items.referenceId}
        >

          <td>
            <i className="fas fa-edit edit-icon"
               onClick={() => edit(items)}
            />
          </td>
          <td>{items.displayName}</td>

          <td>
            {items.isActive ? 'აქტიური' : 'არა აქტიური'}
          </td>
        </tr>
      })}


      </tbody>


    </table>
  );
};

export default ReferenceTables;
