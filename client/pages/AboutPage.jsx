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
                <h4>Our Mission</h4>
                <p>
                    The state of Victoria is one of the states in Australia with
                    the most number of aged people and number of aged care facilities.
                    <br/>
                    The website 'VicAge' aims at understanding the situation of "Healthy is..."
                    withe respect to an aged care scenario.
                    <br/>
                    This process will help the elderly stay active and connected to the 
                    community around them which will provide them with an added sense of happiness.
                </p>

                <h4>Overview of the Scene of Aged care in Victoria</h4>
                <p>
                    Our Scope will be written here:
                    <br/>
                    Are you facing some difficulty to communicate with elderly
                    people? Verbal communication is sometime not effective to understand 
                    their needs.
                    <br/>
                    As a carer, do you want to understand elderly people's needs more easily,
                    so that their life will be more enjoyable?
                </p>

                <h4>Our Solution - Communication tool using pictures</h4>
                <p>
                    Try out our products! It is easy to use: Just pick a pre-made list 
                    or create your own list.
                    <br/>
                    <br/>
                    <a href="/list/all" className="btn btn-primary">Try our solution now! </a>
                </p>
            </div>
           
        </div>

    </div>
)

export default AboutPage;