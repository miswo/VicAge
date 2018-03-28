import React from 'react';


const MediaListItem = (name,role,des,picURL)=>(
    <div className="media-list-item">
        <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="person-image">
                    <span className="glyphicon glyphicon-user"></span>
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
                    Team WYSDoM is a group of passionate student trying to 
                    help senior people
                </p>
            </div>
        </div>


        <div className="container team-description">
            <h3> Team WYSDoM</h3>
            {MediaListItem('Will','MIT','Descripting this person with words.Descripting this person with words.Descripting this person with words.Descripting this person with words.','')}
            {MediaListItem('Yifan','MBIS','Descripting this person with words.Descripting this person with words.Descripting this person with words.Descripting this person with words.','')}
            {MediaListItem('Sujit','MBIS','Descripting this person with words.Descripting this person with words.Descripting this person with words.Descripting this person with words.','')}
            {MediaListItem('Duncan','MBIS','Descripting this person with words.Descripting this person with words.Descripting this person with words.Descripting this person with words.','')}
            {MediaListItem('Misu','MIT','Descripting this person with words.Descripting this person with words.Descripting this person with words.Descripting this person with words.','')}
        </div>


    </div>
)

export default AboutPage;