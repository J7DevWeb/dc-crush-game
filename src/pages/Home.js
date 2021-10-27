import React from 'react';
import Navigation from '../components/Navigation';

const Home = () => {

    return (
        <div className="home">
            <Navigation />
            <img src="/images/Background.jpg" alt="Image de Gotham city en arriére plan." className="background"/>
            <img src="/images/bvs-trinity.png" alt="Batman, wonder woman et superman au premier plan." className="foreground"/>
        </div>
    );
};

export default Home;