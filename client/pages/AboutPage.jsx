import React from 'react';
import {NavLink} from 'react-router-dom';


const MediaListItem = (name,role,des,picURL)=>(
    <div className="media-list-item">
        <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="person-image">
                    <img src={picURL} />
                </div>
            </div>

            <div className="col-sm-12 col-md-8 col-lg-8">
                <div className = "person-description">
                    <h4>{name}</h4>
                    <p>{role}</p>
                    <p>{des}</p>
                </div>
            </div>
        </div>
    </div>
);

const AboutPage=()=>(
    <div id="about-page">
        <div className="jumbotron banner">
            <div className="container">
                <h2>About</h2>
            </div>
        </div>

        <div className="container">

            <div className="project-description">

                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <h4 className="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Our Mission
                        </a>
                      </h4>
                    </div>
                    <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                      <div className="panel-body">
                        <p>The state of Victoria is one of the states in Australia with the most number of aged people and number of aged care facilities.</p>
                        <p>The website 'VicAge' aims at understanding the situation of "Healthy is..." with respect to an aged care scenario.</p>
                        <p>This process will help the elderly stay active and connected to the community around them which will provide them with an added sense of happiness.</p>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingTwo">
                      <h4 className="panel-title">
                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Overview of the Scene of Aged care in Victoria
                        </a>
                      </h4>
                    </div>
                    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                      <div className="panel-body">
                        <p>Something here</p>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingThree">
                      <h4 className="panel-title">
                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Our Solution - Communication tool using pictures
                        </a>
                      </h4>
                    </div>
                    <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                      <div className="panel-body">
                      <p>Are you struggling to decide activities for your care home regidents? We have a solution.
                        Our survey tool will minimise your job. It provides visual aids, which are easy to understand for everybody without explaining with a thousand words.
                        Sometime it is difficult to communicate with people who have difficulties of verval communication.
                        By using pictures, it will be much easier, and which will lead happier experience.</p>
                        <br />
                        <NavLink to="/list/all" className="btn btn-primary">Try our solution now! </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
            </div>
        </div>
)

export default AboutPage;