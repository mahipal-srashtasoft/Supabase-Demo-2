import React from 'react';
import Navbar from '../Navbar';

const HOC = (Components) => {
    return (props) => {
        return (
            <div>
                <Navbar />
                <main className=''>
                    <Components {...props} />
                </main>
            </div>
        );
    };
};

export default HOC;