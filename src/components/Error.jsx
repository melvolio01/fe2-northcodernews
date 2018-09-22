import React from 'react';

const Error = (props) => {
    console.log(props.message);
    return (
        <div className="error">
            <div>
                <h4 className>{props.message}</h4>
            </div>
        </div>
    );
};

export default Error;