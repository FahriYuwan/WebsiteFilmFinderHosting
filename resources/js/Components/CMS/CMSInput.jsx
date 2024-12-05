import Button from '../Button.jsx';
import PropTypes from 'prop-types';

function CMSInput(props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{props.label}</label>
      <input type = {props.type} value={props.value} onChange={props.onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      <Button type='submit' text={'Submit'} />
    </div>
  );
}

export default CMSInput;

CMSInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    };
CMSInput.defaultProps = { 
    type: 'text',
};

