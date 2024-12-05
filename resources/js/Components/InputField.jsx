import PropTypes from 'prop-types';

function InputField(props) {
  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    props.onChange({ target: { name: props.name, value: selectedOption } });
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const idStr = id.toString(); // Pastikan id adalah string
    
    let newValue;
    if (checked) {
      newValue = [...props.value, idStr];
    } else {
      newValue = props.value.filter((item) => item !== idStr);
    }
    props.onChange({ target: { name: props.name, value: newValue } });
  };

  return (
    <div>
      <label htmlFor={props.id} className="sr-only">{props.name}</label>
      {props.type === 'select' ? (
        <select
          id={props.id}
          name={props.name}
          className="w-full px-4 py-3 border bg-gray-700 border-gray-600 focus:ring focus:ring-blue-500 text-white rounded-md"
          required
          value={props.defaultValue}
          onChange={handleSelectChange}
        >
          <option value="">{props.placeholder}</option>
          {props.value.map((option) => (
            <option key={option[props.id]} value={option[props.id]} label={option[props.name]}>
              {option[props.name]}
            </option>
          ))}
        </select>
      ) : props.type === 'checkbox' && Array.isArray(props.options) ? (
        <ul className="flex flex-wrap w-full text-sm font-medium text-gray-700 bg-gray-700 border border-gray-700 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {props.options.map((option) => (
            <li key={option[props.id]} className="w-1/5 border-b border-gray-700 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id={option[props.id]}
                  name={option[props.id]}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  checked={props.value.includes(option[props.id].toString())}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={option.id} className="w-full py-3 ms-2 text-sm font-medium text-white dark:text-gray-300">
                  {option[props.name]}
                </label>
              </div>
            </li>
          ))}
        </ul>
      ) : props.type === 'file' ? (
        <input
          id={props.id}
          name={props.name}
          type="file"
          accept="image/*"
          className="w-full px-4 py-3 border bg-gray-700 border-gray-600 focus:ring focus:ring-blue-500 text-white rounded-md"
          required={props.required}
          onChange={props.onChange}
        />
      ) : (
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          className="w-full px-4 py-3 border bg-gray-700 border-gray-600 focus:ring focus:ring-blue-500 text-white rounded-md"
          required
          accept={props.accept}
        />
      )}
    </div>
  );
}

InputField.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.bool,
    PropTypes.object
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
};


export default InputField;