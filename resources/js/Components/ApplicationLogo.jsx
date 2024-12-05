import React from 'react';
import Logo from '../assets/images/just-text.png'; // Adjust the path according to your folder structure

export default function ApplicationLogo(props) {
    return (
        <img src={Logo} alt="Application Logo" {...props} />
    );
}
