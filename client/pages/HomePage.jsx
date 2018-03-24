import React from 'react';
import {Link} from 'react-router-dom';



const FactBlock = ()=>(
    <div className="col-sm-12 col-md-4 col-lg-4">
        <div className="fact-block">
            <span className="glyphicon glyphicon-signal"></span>
            <p className="lead">There are 100 85+ people in your community</p>
        </div>
    </div>
)

const HomePage = () => (
    <div className="homepage">
        <div className="jumbotron">
            <div className="container">
                <h1>VicAge</h1>
                <p className="lead">Proudly present to you by WYSDoM</p>
                <Link to='/event' className="btn btn-primary" id="start-event">Start</Link>
            </div>
        </div>

        <div className="container">
            <div className="facts">
                <div className="row">
                    <h2>Do You Know...</h2>
                    <p className="lead">Here are some random facts</p>
                </div>


                <div className="row">
                   <FactBlock />
                   <FactBlock />
                   <FactBlock />
                </div>

            
            </div>
        </div>
    </div>
);

export default HomePage;