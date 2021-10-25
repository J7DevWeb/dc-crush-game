import React from 'react';
import Navigation from '../components/Navigation';

const Home = () => {

    return (
        <div className="home">
            <Navigation />
            <img src="/images/Background.jpg" className="background"/>
            <img src="/images/bvs-trinity.png" className="foreground"/>
        </div>
    );
};

export default Home;