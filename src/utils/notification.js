import React from 'react';
import { toast } from 'react-toastify';
import { Icon } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';


export const showNotification = (config) => {
    const options = {
        autoClose: config.autoClose,
        type: config.type,
        icon: config.icon,
        hideProgressBar: false
    };

    return (
        toast(
            <div>
                <span style={{ display: 'flex', alignItems: 'center' }}> <Icon>{config.icon}</Icon>
                    <p style={{ margin: '20px' }} className="animated">{config.message}</p>
                </span>
            </div>
            , options
        )
    );
}
