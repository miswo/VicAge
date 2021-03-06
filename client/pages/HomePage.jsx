import React from 'react';
import {NavLink} from 'react-router-dom';


export default class HomePage extends React.Component{


    render(){
        return(
            <div id="homepage">
                <div id="carousel_sample" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">

                    <li data-target="#carousel_sample" data-slide-to="0" className="active"></li>
                    <li data-target="#carousel_sample" data-slide-to="1" className=""></li>
                    <li data-target="#carousel_sample" data-slide-to="2" className=""></li>

                    </ol>
                    <div className="carousel-inner">
                        <div className="item active">
                            <img src="http://d-ash.lolipop.jp/img/landingpage-1a.jpg" alt="First slide" />
                            <div className="container">
                                <div className="carousel-caption text-left"> 
                                    <div className="col-md-8 px-0">
                                        <h1>VicAge</h1>
                                        <p className="lead text-left carouselDescription">Over 2.6 million Australians provide help and support to a family member or friend - caring can happen to anyone, anytime.</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                        
                        <div className="item">
                            <img src="http://d-ash.lolipop.jp/img/landingpage-2a.jpg" alt="Second slide" />
                            <div className="container">
                                <div className="carousel-caption text-left">
                                    <div className="col-md-8 px-0">
                                        <p className="lead text-left carouselDescription">No matter who you care for, taking on a caring role is a significant event that brings many challenges and rewards.</p>
                                    </div>
                                </div>
                        </div>
                        </div>


                        <div className="item">
                            <img src="http://d-ash.lolipop.jp/img/landingpage-3a.jpg" alt="Third slide" />
                            <div className="container">
                                <div className="carousel-caption text-left">
                                    <div className="col-md-8 px-0">
                                        <p className="lead text-left carouselDescription">Caring can be emotionally taxing and physically draining - Solve that problem today!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <a className="left carousel-control" href="#carousel_sample" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                    </a>
                    <a className="right carousel-control" href="#carousel_sample" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </div>
                <section className="understandingVicAge">
                    <div className="container">
                        <div className="row featurette">
                            <div className="col-md-6">
                                <h2 className="featurette-heading" id="understand-title">What is VicAge?</h2>
                                <p className="lead" id="vicAgeExplain">The website, VicAge aims to help carers in their caring duties so that they can provide improved levels of care for their loved ones and the people they care for.</p>
                            </div>
                            <div className="col-md-6">
                                <div className="embed-responsive embed-responsive-16by9">
                                    <iframe className="embed-responsive-item" src="https://youtube.com/embed/lmsMHAsvSMI" frameBorder="0" allow="autoplay" allowFullScreen></iframe>
                                </div>

                
                            </div>
                        </div>
                    </div>
                </section>



                <section className="features-icons bg-light text-center">
                    <div className="container">
          
                        <h2 className="mb-5" id="offerTitle">What does VicAge offer?</h2>
       
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                    <img src="http://d-ash.lolipop.jp/img/pizza.png" alt="meal image" width="140" height="140" />
                                    <h3>Dietary<br />Planner</h3>
                                    <div id="offerDescription">
                                    <p className="lead mb-0 featureExplain">VicAge enables you to plan meals for coming days, checking the sufficiency of important nutrients. Choose the preferred recipe with a certain amount to fit the average daily nutrition intake.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                    <img src="http://d-ash.lolipop.jp/img/exercise.png" alt="Generic placeholder image" width="140" height="140" />
                                        <h3>Exercise<br />Planner</h3>
                                        <div id="offerDescription">
                                        <p className="lead mb-0 featureExplain">Selecting appropriate level of exercise with suitable duration could help dependant not only for superior weight control, but also help with the monitoring and forward prediction of both calorie burn.</p>
                                        </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                    <img src="http://d-ash.lolipop.jp/img/happy.png" alt="Generic placeholder image" width="140" height="140" />
                                    <h3>Activity<br />Scheduler</h3>
                                    <div id="offerDescription">
                                    <p className="lead mb-0 featureExplain">The activity schedule could help with organizing both social activities and professional appointments with ease, future notifications ensuring that up-coming events are not forgotten.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                    <img src="http://d-ash.lolipop.jp/img/monitor.png" alt="Generic placeholder image" width="140" height="140" />
                                    <h3>Health Status<br />Monitor</h3>
                                    <div id="offerDescription">
                                    <p className="lead mb-0 featureExplain">A display of dependant’s profile, current situation as well as the following month’s overview of nutrition intake and calorie burn.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="call-to-action">

                    <div className="container">
                        <div className="row">

                            <div className="col-md-8">
                                <h2 className="pull-right">Are you interested?</h2>
                                <div className="clearfix"></div>
                                    <p className="pull-right" id="lets">Let's start planning better with VicAge.</p>
                                </div>
                                <div className="col-md-4">
                                    <div id="CTABtn"><a className="btn btn-primary" id="CTAregisterBtn" href="/register">REGISTER</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>     
        )
    }
}
