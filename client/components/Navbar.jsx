import React,{Component} from 'react';
import {NavLink,Link} from 'react-router-dom';




const LogedinList = () =>(
    <ul className="nav navbar-nav" id="navbarBgColor">
        {/* <li><NavLink to="/" exact                   activeClassName="active">Home</NavLink></li> */}
        <li><NavLink to="/center" exact                   activeClassName="active" ><img src="http://d-ash.lolipop.jp/img/home.png" width="16px"/> Center</NavLink></li>
        {/* <li><NavLink to="/event"                    activeClassName="active">Event</NavLink></li> */}
        {/* <li><NavLink to="/list/all"                 activeClassName ="active">Lists</NavLink></li> */}
        {/* <li><NavLink to="/service/find/all/3000"    activeClassName="active">Services</NavLink> </li> */}
        {/* <li><NavLink to="/about"                    activeClassName="active">About</NavLink></li> */}


        <li><NavLink to="/dietary-planner"              activeClassName="active" >Dietary</NavLink></li>
        <li><NavLink to="/exercise-planner"             activeClassName="active" >Exercise</NavLink></li>
        <li><NavLink to="/goal/calendar"                activeClassName="active"> Activity</NavLink></li>
        <li><NavLink to="/health-status"                activeClassName="active">Health Status</NavLink></li>
        
        {/* <li><NavLink to="/nutrition"                activeClassName="active" className="btn">Activities</NavLink></li> */}
        {/* <li><NavLink to="/nutrition"                activeClassName="active" className="btn">Health Status</NavLink></li> */}
    </ul>
)


const DefaultList = () =>(
    <ul className="nav navbar-nav">
    </ul>
)

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    handleLogout(){
        this.props.dataTransfer({data:null})
    }


    render(){
        return(
            <div className="navbar navbar-fixed-top navbar-default navbar-main">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-menu" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <ul className="nav navbar-nav">
                            <li> 
                                <NavLink className="navbar-brand" to="/">
                                    <img id="navlogo"src="https://s3-ap-southeast-2.amazonaws.com/vicage-image/5abf1ada26dc6202b31ca2aa.png" />
                                    <span id="brand">VicAge</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse " id="navbar-menu">
                        
                        {this.props.user?<LogedinList />:<DefaultList />}

                        <ul className="nav navbar-nav navbar-right">

                            {this.props.user?
                                <li className="dropdown">
                                    <Link to="/home"  className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        Welcome,{this.props.user.userName}<span className="caret"></span>
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><NavLink to="/user/switch-profile"><img src="http://d-ash.lolipop.jp/img/reload.png" width="16px"/> Switch Profile</NavLink></li>
                                        <li><NavLink to="/" onClick={this.handleLogout.bind(this)}><img src="http://d-ash.lolipop.jp/img/exit.png" width="16px"/> Logout</NavLink></li>
                                    </ul>
                                </li>
                                :
                                <li><NavLink to="/login" >Login </NavLink></li>
                            }
                        </ul>
                    </div>


                </div>
            </div>
        )
    }
};




module.exports = Navbar;