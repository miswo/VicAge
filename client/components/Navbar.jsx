import React,{Component} from 'react';
import {Link} from 'react-router-dom';


class Navbar extends Component{


    render(){
        return(
            <div className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-menu" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Care4U</a>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/event">Event</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};




module.exports = Navbar;