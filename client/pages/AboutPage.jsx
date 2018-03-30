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
                <h2>About us</h2>
                <p className="lead">
                    Team WYSDoM is a group of passionate students trying to 
                    help the carers in Victoria.
                </p>
            </div>
        </div>


        <div className="container team-description">
            <h3> Team WYSDoM</h3>
            {MediaListItem('Will',
                            'MIT',
                            'I am passionate about learning and applying cutting-edge technologies to solve real-world problems, including gather and analyze data, design and implement application architecture, and optimize its performance.',
                            'https://s3-ap-southeast-2.amazonaws.com/vicage-image/5abe31f9b8918f3070db21c6.jpeg')}
            {MediaListItem('Yifan',
                            'MBIS',
                            'Having plenty of IT knowledge, concerning on business analysis and design, good at documentation issues.',
                            'https://s3-ap-southeast-2.amazonaws.com/vicage-image/5abe3239b8918f3070db21ca.jpeg')}
            {MediaListItem('Sujit',
                            'MBIS',
                            'Application of Technical skills in the area of web page development and user interface design amalgamated with operational support tasks and activities such as content creating and reviewing documentation and material for presentations. Additional assistance in project housekeeping and the meeting of milestones.',
                            'https://s3-ap-southeast-2.amazonaws.com/vicage-image/5abe3228b8918f3070db21c9.jpeg')}
            {MediaListItem('Duncan',
                            'MBIS',
                            'Predominantly of a technical nature concerning the utilization of skills in the area of web page and database development. Additional support in terms of some systems design analysis, project management, and documentation-based duties are also envisaged to assist in project housekeeping and the meeting of milestones.',
                            'https://s3-ap-southeast-2.amazonaws.com/vicage-image/5abe3215b8918f3070db21c7.jpeg')}
            {MediaListItem('Misu',
                            'MIT',
                            'Wide range of knowledge of IT especially user interface and usability design, and web site development. ',
                            'https://s3-ap-southeast-2.amazonaws.com/vicage-image/5abe321eb8918f3070db21c8.jpeg')}
        </div>


    </div>
)

export default AboutPage;