import React from 'react';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';

const Table = ({
  headers,
  data,
  searchQuery,
  onDelete,
  onEdit,
  onSelect,
  selectedIds = [],
  handleCheckboxChange,
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => onSelect(item._id)}>
              <td>
                <input
                  type='checkbox'
                  style={{ height: 16, width: 16, cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => handleCheckboxChange(e, item._id)}
                />
              </td>

              {item.name && <td>{item.name}</td>}
              {item.description && <td>{item.description}</td>}
              {item.price && <td>{item.price}</td>}
              {item.category && <td>{item.category}</td>}
              {item.address && <td>{item.address}</td>}
              {(item.averageRating || item.averageRating === null) && (
                <td>{item.averageRating === null ? 'N/A' : item.averageRating.toFixed(1)}</td>
              )}
              <td>
                {selectedIds.length === 0 && (
                  <button
                    title='Editar'
                    className='editButton'
                    onClick={(event) => {
                      event.stopPropagation();
                      onEdit(item._id);
                    }}
                  >
                    <MdEdit />
                  </button>
                )}
              </td>
              <td>
                {selectedIds.length === 0 && (
                  <button
                    title='Eliminar'
                    className='deleteButton'
                    onClick={() => {
                      event.stopPropagation();
                      onDelete(item._id);
                    }}
                  >
                    <MdDelete />
                  </button>
                )}
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
