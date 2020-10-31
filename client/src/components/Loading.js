import React from 'react';

const loadingStyle = {
    display: 'flex',
    margin: '30px auto',
    justifyContent: 'center'
}

const spinnerStyle = {width: '50px', height: '50px', margin: '10px'}


const Loading = () => {
    return (
        <div style={loadingStyle}>
            <div className="spinner-grow text-secondary"
                role="status"
                style={spinnerStyle}
            >
                <span className="sr-only">Loading...</span>
            </div>

            <div className="spinner-grow text-secondary"
                 role="status"
                 style={spinnerStyle}
            >
                <span className="sr-only">Loading...</span>
            </div>

            <div className="spinner-grow text-secondary"
                 role="status"
                 style={spinnerStyle}
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;