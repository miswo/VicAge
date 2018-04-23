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

                <div className="section-home home-reasons">
                    <div className="container">
                        <h2 className="title-style-1">We help carers, so they can help people more effectively. <span className="title-under"></span></h2>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="reasons-col animate-onscroll-home fadeIn">
                                    <img src="https://burst.shopifycdn.com/photos/elementary-school-activity-wall_925x.jpg" alt="" />
                                    <div className="reasons-titles">
                                        <h3 className="reasons-title">Working at a home care?</h3>
                                        <h5 className="reason-subtitle">We help with your daily job</h5>
                                    </div>
                                    <div className="on-hover hidden-xs">
                                        <p>Are you struggling to decide activities for your home care residents? We have a solution.</p>
                                        <p>Our survey tool will minimise your job. It provides visual aids, which are easy to understand without having to explain with thousands of words.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="reasons-col animate-onscroll-home fadeIn">
                                    <img src="https://s3-ap-southeast-2.amazonaws.com/vicage-image/5adc5c6aa2e03386263e4f0f.jpeg" alt="" />
                                    <div className="reasons-titles">
                                        <h3 className="reasons-title">Facing difficulty verbally communicating with your patient ?</h3>
                                        <h5 className="reason-subtitle">We provide a communication tool</h5>
                                    </div>
                                    <div className="on-hover hidden-xs">                   
                                        <p>Sometimes, it is difficult to communicate with people who have difficulties communicating verbally.  </p>
                                        <p>By using pictures, it will be much easier and will lead to a happier experience.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>                


                <div className="section-home about-us fadeIn animated">
                    <div className="container">
                        <h2 className="title-style-1">How can we make your life easy? <span className="title-under"></span></h2>
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <div className="about-us-col">
                                    <div className="col-icon-wrapper">
                                        <img src="https://image.flaticon.com/icons/png/512/637/637178.png" alt="" width="80px"/>
                                    </div>
                                    <h3 className="col-title">1. Choose list</h3>
                                    <div className="col-details">
                                        <p>Choose a list from our preset lists based on your needs, such as "Which sport will he/she want to watch?"</p>
                                    </div>
                                </div>  
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="about-us-col">
                                    <div className="col-icon-wrapper">
                                        <img src="https://image.flaticon.com/icons/png/512/636/636047.png" alt="" width="80px"/>
                                    </div>
                                    <h3 className="col-title">2. Touch images</h3>
                                    <div className="col-details">
                                        <p>Let them choose images to express their needs, such as "I want to watch football."</p> 
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="about-us-col">
                                    <div className="col-icon-wrapper">
                                        <img src="https://image.flaticon.com/icons/png/512/685/685815.png" alt="" width="80px" />
                                    </div>
                                    <h3 className="col-title">3. See information</h3>
                                    <div className="col-details">
                                        <p>You can check informative data about the choice, such as "Places nearby to watch football"</p>
                                    </div>
                                </div> 
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="about-us-col">
                                    <div className="col-icon-wrapper">
                                        <img src="https://image.flaticon.com/icons/png/512/25/25368.png" alt="" width="80px" />
                                    </div>
                                    <h3 className="col-title">4. Survey tool</h3>
                                    <div className="col-details">
                                        <p>If you are taking care of many people, you can take surveys to make informed decisions.</p>
                                    </div>  
                                </div>
                            </div>
                        </div>

                        <div className="cause" id="cta">
                            <h3 className="cause-title">Are you interested? VicAge will make your life easy.</h3>
                            <div className="btn-holder text-center">                        
                                <NavLink className="btn btn-lg btn-primary" id="productBtn" to="/list/all">Click Here to Begin</NavLink>
                            </div>                  
                        </div> 
                    </div>
                </div>
            
            </div>
            
        )
    }
}
