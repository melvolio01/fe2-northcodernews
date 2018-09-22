import React from 'react';

const Error = (props) => {
    const error = props.location.state.error;
    console.log(error);
    return (
        <div className="error">
            <div>
                <h4>Status: {error.status}</h4>
                <h4>{error.statusText}</h4>
                <h5>{error.data}</h5>
            </div>
        </div>
    );
};

export default Error;