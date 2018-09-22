import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

const Error = (props) => {
    let error;
    if (props.location.state) { error = props.location.state.error; }
    console.log(error);
    return (
        <div className="error-container">
            <div className="error-content">
                <h4>Status: {error ? error.status : null}</h4>
                <h4>{error ? error.statusText : "404"}</h4>
                <h5>{error ? error.data : "Error, page not found"}</h5>
                <Link to='/'>Home</Link>
            </div>
        </div>
    );
};

export default Error;