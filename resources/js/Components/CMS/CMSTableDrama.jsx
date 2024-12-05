import React from 'react';

const CMSTableDrama = ({ columns, data, handleDelete, showPopup }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-dark-text bg-gray-800">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.Header}
                style={{ width: column.width }}
                className="px-4 py-2 bg-gray-900 text-white"
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((drama, index) => (
            <tr
              key={drama.film_id}
              className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}
            >
              {columns.map((column) => {
                if (column.Cell) {
                  return (
                    <td key={column.Header} className="border px-4 py-2 text-white">
                      {column.Cell({ row: drama })}
                    </td>
                  );
                }
                return (
                  <td key={column.Header} className="border px-4 py-2 text-white">
                    {drama[column.accessor]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CMSTableDrama;