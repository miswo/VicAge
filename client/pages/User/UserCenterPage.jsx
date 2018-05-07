import React from 'react';
import {NavLink} from 'react-router-dom';


const FunctionSquare = (title,url,spanName)=>(
    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
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
                        <h2>{this.props.user.profile.name}'s Center</h2>
                        <NavLink to={"/user/profile"} className="btn btn-lg btn-default">Edit {this.props.user.profile.name}'s Profile</NavLink> 
                    
                    </div>

                    
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <NavLink to={"/nutrition-planner"}>
                            <div className="concept-block" id="listImgColor">
                                <div className="img-wrapper">
                                    <img className="userCenterImg" src="http://d-ash.lolipop.jp/img/pizza.png" />
                                </div>
                                <h3>Dietary Planner</h3>
                            </div>
                        </NavLink>  
                        </div>

                  
                        <div className="col-md-3">
                            <NavLink to={"/exercise-planner"}>
                            <div className="concept-block" id="listImgColor">
                                <div className="img-wrapper">
                                    <img className="userCenterImg" src="http://d-ash.lolipop.jp/img/exercise.png" />
                                </div>
                                <h3>Exercise Planner</h3>
                            </div>
                            </NavLink>
                        </div>

                        <div className="col-md-3">
                            <NavLink to={"/goal/calendar"}>
                            <div className="concept-block" id="listImgColor">
                                <div className="img-wrapper">
                                    <img className="userCenterImg" src="http://d-ash.lolipop.jp/img/happy.png" />
                                </div>
                                <h3>Activity Scheduler</h3>
                            </div>
                            </NavLink>
                        </div>

                        <div className="col-md-3">
                            <NavLink to={"/exercise-planner"}>
                            <div className="concept-block" id="listImgColor">
                                <div className="img-wrapper">
                                    <img className="userCenterImg" src="http://d-ash.lolipop.jp/img/monitor.png" />
                                </div>
                                <h3>Health Status Monitor</h3>
                            </div>
                            </NavLink>
                        </div>
    

                    </div>
                </div>
            </div>
          
        )
    }

}