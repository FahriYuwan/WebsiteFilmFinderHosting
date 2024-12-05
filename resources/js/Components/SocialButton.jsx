import PropType from 'prop-types';
import React from 'react';

function SocialButton(props){
  return (
    <div className="mt-6 grid grid-cols-1 gap-1">
      <a href={route('login.google')} className="w-full inline-flex justify-center py-3 px-4 border border-dark-border rounded-md shadow-sm bg-dark-border text-sm font-medium text-gray-500 hover:bg-white">
        <span className="sr-only">{props.altText}</span>
        <img src={props.iconUrl} alt={props.altText} className="h-6 w-6" />
      </a>
    </div>
  );
};
SocialButton.propTypes = {
    iconUrl: PropType.string.isRequired,
    altText: PropType.string.isRequired
    };

export default SocialButton;
