import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';


class Navbar extends Component{
    
    render(){
        return(
            <div className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-menu" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <NavLink className="navbar-brand" to="/">VicAge</NavLink>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="nav navbar-nav">
                            <li><NavLink to="/" exact           activeClassName="active">Home</NavLink></li>
                            {/* <li><NavLink to="/event"        activeClassName="active">Event</NavLink></li> */}
                            <li><NavLink to="/service/3000"    activeClassName="active">Service</NavLink> </li>
                            <li><NavLink to="/about"            activeClassName="active">About</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};




module.exports = Navbar;