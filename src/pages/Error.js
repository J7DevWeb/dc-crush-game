import React from 'react';
import Navigation from '../components/Navigation';

const Error = () => {
    return (
        <div className="error">
            <Navigation />
            <h1>Cette page n'existe pas !!!</h1>
            <img src="/logos/favicon.png" alt="Logo superman animé"/>
        </div>
    );
};

export default Error;