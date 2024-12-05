import React from 'react';
import { FaBan } from 'react-icons/fa';
import './../../../css/NotificationBanned.css';
import { router } from '@inertiajs/react';
const NotificationBanned = () => {
    return (
        <div className="notification-banned justify-items-center">
            <FaBan className="icon" />
            <h2>Your Account Has Been Temporarily Suspended</h2>
            <p>Please contact customer support for further information.</p>
            <button onClick={() => router.get(route('login'))}>Back to Login</button>
        </div>
    );
};

export default NotificationBanned;