import React from 'react';
import {NavLink} from 'react-router-dom';

import PostCodeSearch from '../components/PostCodeSearcher';


export default class HomePage extends React.Component{


    render(){
        return(
            <div id="homepage">
                <div className="jumbotron banner">
                    <div className="container">
                        <div className="caption">
                            <h1 className="carousel-title">VicAge</h1>
                            <h2 className="carousel-subtitle">One picture is worth a thousand words.</h2>
                            <NavLink to="/list/all" className="btn btn-lg btn-primary animated slow">Click Here to Begin</NavLink>
                        </div>
                    </div>
                </div>
            
            </div>
            
        )
    }
}
