import React from 'react';

const Table = ({ data }) => {
  console.log('data: ', data);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Dirección</th>
            <th>Reseñas</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {item.name && <td>{item.name}</td>}
              {item.category && <td>{item.category}</td>}
              {item.address && <td>{item.address}</td>}
              {item.reviews && <td>N/A</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
