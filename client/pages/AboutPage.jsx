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
<div class="accordion" id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        <h4>Our Mission</h4>
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
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
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        <h4>Overview of the Scene of Aged care in Victoria</h4>
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
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
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        <h4>Our Solution - Communication tool using pictures</h4>
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
                       
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
</div>



            </div>
           
        </div>

    </div>
)

export default AboutPage;