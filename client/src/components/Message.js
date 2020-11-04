import React from 'react';
import styles from './message.module.css'

const Message = ({variant, children}) => {
    return (
        <div className={`alert alert-${variant} ${styles.message}`} role="alert">
            {children}
        </div>
    );
};

Message.default = {
    variant: 'info'
}

export default Message;