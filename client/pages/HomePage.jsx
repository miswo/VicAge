import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () => (
    <div className="App jumbotron">
        <div className="container">
            <h1>Do you know...</h1>
            <p className="lead">Proudly present to you by WYSDoM</p>

            <Link to='/event' className="btn btn-primary"> Go </Link>
        </div>
    </div>
);

export default HomePage;