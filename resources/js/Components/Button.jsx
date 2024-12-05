import PropTypes from 'prop-types';
import React from 'react';
function Button({ onClick = () => {}, text, className = "", disabled = false }) {
  return (
    <button 
      onClick={onClick} 
      className={`rounded ${className}`}
      disabled={disabled}>
      {text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Button;