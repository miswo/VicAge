import React from 'react';
import {NavLink} from 'react-router-dom';


const FunctionSquare = (title,url,spanName)=>(
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4">
        <NavLink to={url} className="function-square btn btn-primary">
            <span className={spanName}></span>
            <h3>{title}</h3>
        </NavLink>
    </div>

);

export default class UserCenterPage extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }



    render(){
        return(
            <div id="user-center-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>User Center</h2>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {FunctionSquare('Profile','/profile')}
                        {FunctionSquare('Planner','/planner')}
                        {FunctionSquare('Plan Report','/planner/report')}
                        {FunctionSquare('Activity Calendar','/goal/calendar')}
                    </div>
                   
                </div>
            </div>
        )
    }

}