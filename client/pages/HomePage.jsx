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
                            <h1 class="carousel-title bounceInDown animated slow">VicAge</h1>
                            <h2 class="carousel-subtitle bounceInUp animated slow">We help carers so they can help people.</h2>
                        </div>
                    </div>
                </div>

                <div class="section-home about-us fadeIn animated">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4 col-sm-6">
                                <div class="about-us-col">
                                    <div class="col-icon-wrapper">
                                        <img src="./icons/our-mission-icon.png" alt="" />
                                    </div>
                                    <h3 class="col-title">our mission</h3>
                                    <div class="col-details">
                                        <p>VicAge is a website to help carer in Victoria.</p>
                                    </div>
                                    <a href="#" class="btn btn-primary"> Read more </a>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-6">
                                <div class="about-us-col">
                                    <div class="col-icon-wrapper">
                                        <img src="../template/assets/images/icons/make-donation-icon.png" alt="" />
                                    </div>
                                    <h3 class="col-title">Facilities around you</h3>
                                    <div class="col-details">
                                        <p>Find out aged care center, community service, disability service and hospital around you</p> 
                                    </div>
                                    <a href="#" class="btn btn-primary"> Find out </a>   
                                </div>  
                            </div>
                            <div class="col-md-4 col-sm-6">
                                <div class="about-us-col">
                                    <div class="col-icon-wrapper">
                                        <img src="../template/assets/images/icons/help-icon.png" alt="" />
                                    </div>
                                    <h3 class="col-title">Communication tool</h3>
                                    <div class="col-details">
                                        <p>Are you struggilng with communicating with elderly people? Here is our solution for that.</p>
                                    </div>
                                    <a href="#" class="btn btn-primary"> Try out our service </a>
                                </div>   
                            </div>   
                        </div>
                    </div>
                </div>

                
                <div className="container">
                                <div className="facts">
                                    <div className="row">
                                        <h2>Do you know in Victoria:</h2>
                                    </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 col-lg-4">
                                        <div className="fact-block">
                                    <PieChart width={300} height={300}>
                                        <Pie data={not_meet_physical_activity_guidelines} dataKey="value" nameKey="name" >
                                            <Label value="4%" position="center" fill="#fff" />
                                            <Cell fill="#8884d8"/>
                                        </Pie>
                                    </PieChart>
                                    <p className="lead">People with severe disability living in the community</p>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <div className="fact-block">
                                    <PieChart width={300} height={300}>
                                        <Pie data={need_help_for_core_activiti} dataKey="value" nameKey="name" >
                                            <Label value="5%" position="center" fill="#fff" />
                                            <Cell fill="#00C49F"/>
                                        </Pie>
                                    </PieChart>
                                    <p className="lead">People with need for assistance with core activity.</p>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <div className="fact-block">
                                    <PieChart width={300} height={300}>
                                        <Pie data={over_75_lives_alone} dataKey="value" nameKey="name" >
                                            <Label value="35.9%" position="center" fill="#fff" />
                                            <Cell fill="#FF8042"/>
                                        </Pie>
                                    </PieChart>
                                    <p className="lead">People aged over 75 years who live alone</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>








            </div>
            
        )
    }
}
