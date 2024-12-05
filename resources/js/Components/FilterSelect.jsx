import PropTypes from 'prop-types';

const FilterSelect = ({ label, value, options, onChange }) => {
    // Menghapus spasi dari label
    const sanitizedLabel = label.replace(/\s+/g, '');

    return (
        <div>
            <label htmlFor={`filter-${sanitizedLabel.toLowerCase()}`} className="block text-sm font-medium text-dark-text">
                {label}
            </label>
            <select
                id={`filter-${sanitizedLabel.toLowerCase()}`}
                name={`filter-${sanitizedLabel.toLowerCase()}`}
                className="mt-2 block w-full px-4 py-3 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue-light focus:border-custom-blue-light sm:text-sm"
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

FilterSelect.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default FilterSelect;