import PropTypes from 'prop-types';

const CMSTableReviews = ({ columns, data, rowClassName, idAcessor }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={
                  typeof column.accessor === 'string'
                    ? column.accessor
                    : column.accessor.name
                }
                className="py-3 px-4 border-b border-gray-700 text-left text-sm font-semibold bg-gray-700"
                style={{ width: column.width || 'auto' }}
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody id="reviews-table-body" className="text-sm">
          {data.map((row) => (
            <tr
              key={row[idAcessor]}
              data-review-id={row[idAcessor]}
              className={`hover:bg-gray-700 ${
                rowClassName ? rowClassName(row) : ''
              }`}
            >
              {columns.map((column) => (
                <td
                  key={
                    typeof column.accessor === 'string'
                      ? column.accessor
                      : column.accessor.name
                  }
                  className="py-2 px-4 border-b border-gray-700"
                  data-label={column.Header}
                >
                  {column.accessor === 'select' ? (
                    row.select
                  ) : (
                    <span
                      className={
                        column.accessor === 'user' ? 'user-cell' : ''
                      }
                    >
                      {typeof column.accessor === 'object' ? (
                        row[column.accessor.name][
                          column.accessor.child_accessor
                        ]
                      ) : (
                        row[column.accessor]
                      )}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CMSTableReviews.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string,
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          child_accessor: PropTypes.string,
        }),
      ]).isRequired,
      width: PropTypes.string,
      editable: PropTypes.bool,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowClassName: PropTypes.func, // Optional: Function to apply dynamic classes to rows
  idAcessor: PropTypes.string.isRequired, // ID accessor for unique keys
};

export default CMSTableReviews;