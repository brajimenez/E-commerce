import React from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';

const Loading = () => {
    return (
        <div className='overlay'>
            <Spinner animation="grow" variant="secondary" />
        </div>
    );
};

export default Loading;