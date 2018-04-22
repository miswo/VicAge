import React from 'react';
import {Link} from 'react-router-dom';

import {PieChart,Pie,Cell,Label} from 'recharts';

import PostCodeSearch from '../components/PostCodeSearcher';


export default class HomePage extends React.Component{


    render(){
        var not_meet_physical_activity_guidelines = [{'name':'A','value':4},
                                                     {'name':'B','value':96}]
        var need_help_for_core_activiti = [{'name':'A','value':5},
                                        {'name':'B','value':95}]
        var over_75_lives_alone = [{'name':'A','value':35.9},
                                    {'name':'B','value':64.1}]
        return(
            <div id="homepage">
                <div className="jumbotron banner">
                    <div className="container">
                        <div class="caption">
                            <h1 class="carousel-title">VicAge</h1>
                            <h2 class="carousel-subtitle">One picture is worth a thousand words.</h2>
                            <a href="/list/all" class="btn btn-lg btn-secondary animated slow">TRY OUR PRODUCT</a>
                        </div>
                    </div>
                </div>

                <div class="section-home home-reasons">
                    <div class="container">
                        <h2 class="title-style-1">We help carer, so they can help people more effectively. <span class="title-under"></span></h2>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="reasons-col animate-onscroll-home fadeIn">
                                    <img src="https://burst.shopifycdn.com/photos/elementary-school-activity-wall_925x.jpg" alt="" />
                                    <div class="reasons-titles">
                                        <h3 class="reasons-title">working at a care home?</h3>
                                        <h5 class="reason-subtitle">We help your daily job</h5>
                                    </div>
                                    <div class="on-hover hidden-xs">
                                        <p>Are you struggling to decide activities for your care home regidents? We have a solution.</p>
                                        <p>Our survey tool will minimise your job. It provides visual aids, which are easy to understand for everybody without explaining with a thousand words.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="reasons-col animate-onscroll-home fadeIn">
                                    <img src="https://burst.shopifycdn.com/photos/daughter-teaching-technology_925x.jpg" alt="" />
                                    <div class="reasons-titles">
                                        <h3 class="reasons-title">facing verval communication difficulty?</h3>
                                        <h5 class="reason-subtitle">We provide a communication tool</h5>
                                    </div>
                                    <div class="on-hover hidden-xs">                   
                                        <p>Sometime it is difficult to communicate with people who have difficulties of verval communication. </p>
                                        <p>By using pictures, it will be much easier, and which will lead happier experience.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cause" id="cta">
                            <h3 class="cause-title">Are you interested? VicAge will make your life easy.</h3>
                            <div class="btn-holder text-center">                        
                                <a class="btn btn-lg btn-danger" id="productBtn" href="/list/all">TRY OUR PRODUCT</a>
                            </div>                  
                        </div> 
                    </div>
                </div>                


                <div class="section-home about-us fadeIn animated">
                    <div class="container">
                        <h2 class="title-style-1">How can we make your life easy? <span class="title-under"></span></h2>
                        <div class="row">
                            <div class="col-md-3 col-sm-6">
                                <div class="about-us-col">
                                    <div class="col-icon-wrapper">
                                        <img src="https://image.flaticon.com/icons/png/512/637/637178.png" alt="" width="80px"/>
                                    </div>
                                    <h3 class="col-title">1. Choose list</h3>
                                    <div class="col-details">
                                        <p>Choose a list from our preset lists based on your needs, such as "Which sport will he/she want to watch?"</p>
                                    </div>
                                </div>  
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <div class="about-us-col">
                                    <div class="col-icon-wrapper">
                                        <img src="https://image.flaticon.com/icons/png/512/636/636047.png" alt="" width="80px"/>
                                    </div>
                                    <h3 class="col-title">2. Touch images</h3>
                                    <div class="col-details">
                                        <p>Let them choose images to express their needs, such as "I want to watch football."</p> 
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <div class="about-us-col">
                                    <div class="col-icon-wrapper">
                                        <img src="https://image.flaticon.com/icons/png/512/685/685815.png" alt="" width="80px" />
                                    </div>
                                    <h3 class="col-title">3. See information</h3>
                                    <div class="col-details">
                                        <p>You can check informative data about the choice, such as "Places nearby to watch football"</p>
                                    </div>
                                </div> 
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <div class="about-us-col">
                                    <div class="col-icon-wrapper">
                                        <img src="https://image.flaticon.com/icons/png/512/25/25368.png" alt="" width="80px" />
                                    </div>
                                    <h3 class="col-title">4. Servey tool</h3>
                                    <div class="col-details">
                                        <p>If you are taking care of many people, you can take survey to make a decision.</p>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="cause">
                        <h2 class="title-style-1">our mission <span class="title-under"></span></h2>
                        <div class="cause-details" id="mission">
                            <p>The state of Victoria is one of the states in Australia with the most number of aged people and number of aged care facilities.</p>
                            <p>The website 'VicAge' aims at understanding the situation of "Healthy is..." with respect to an aged care scenario.</p>
                            <p>This process will help the elderly stay active and connected to the community around them which will provide them with an added sense of happiness.</p>
                        </div>
                        <div class="btn-holder text-center">
                            <a href="/list/all" class="btn btn-primary"> TRY OUR PRODUCT</a>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
