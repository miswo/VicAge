import React from 'react';


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
                <h3>About VicAge</h3>

                <p>
                    The state of Victoria is one of the states in Australia with the most number of aged people and number of aged care facilities. The website 'VicAge' aims at understanding the situation of "Healthy is.." with respect to an aged care scenario.
                    
                    <br/>
                    The website, with the use of open datasets, will provide valuable information relevant to carers based on their postcode. It aims to help carers to communicate better with aged folks with lesser/ limited cognitive abilities via visuals on a tablet device. 
                    This process will help the elderly stay active and connected to the community around them which will provide them with an added sense of happiness.
                </p>

            </div>
           
        </div>

    </div>
)

export default AboutPage;