import React from 'react';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';

const Table = ({ data, searchQuery, onDelete, onEdit, onSelect }) => {
  console.log('data: ', data);
  console.log('searchQuery: ', searchQuery);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Dirección</th>
            <th>Reseñas</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => onSelect(item._id)}>
              {item.name && <td>{item.name}</td>}
              {item.category && <td>{item.category}</td>}
              {item.address && <td>{item.address}</td>}
              {item.reviews && <td>N/A</td>}
              <td>
                <button title='Editar' className='editButton' onClick={() => onEdit(item._id)}>
                  <MdEdit />
                </button>
              </td>
              <td>
                <button title='Eliminar' className='deleteButton' onClick={() => onDelete(item._id)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {searchQuery !== '' && data.length === 0 && (
        <div className='empty-search'>No hay resultados encontrados buscando por: {searchQuery}</div>
      )}
    </div>
  );
};

export default Table;
