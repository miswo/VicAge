import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';


class Navbar extends Component{
    
    render(){
        return(
            <div className="navbar navbar-inverse navbar-main">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-menu" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <NavLink className="navbar-brand" to="/">
                            <img id="navlogo"src="https://s3-ap-southeast-2.amazonaws.com/vicage-image/5abf1ada26dc6202b31ca2aa.png" />
                            <span id="brand">VicAge</span>
                        </NavLink>
                    </div>

                    <div className="collapse navbar-collapse pull-right" id="navbar-menu">
                        <ul className="nav navbar-nav">
                            <li><NavLink to="/" exact               activeClassName="active">Home</NavLink></li>
                            {/* <li><NavLink to="/event"        activeClassName="active">Event</NavLink></li> */}
                            <li><NavLink to="/list/all"             activeClassName ="active">Lists</NavLink></li>
                            <li><NavLink to="/survey/result"        activeClassName="active">Survey Result</NavLink></li>
                            <li><NavLink to="/service/all/3000"     activeClassName="active">Services</NavLink> </li>
                            {/* <li><NavLink to="/about"                activeClassName="active">About</NavLink></li> */}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};




module.exports = Navbar;