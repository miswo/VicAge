import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Link,Switch} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';

import ListEventPage from './pages/Event/ListEventPage';
import CreateEventPage from './pages/Event/CreateEventPage';
import ViewEventPage from './pages/Event/ViewEventPage';
import SurveyPage from './pages/Event/SurveyPage';

import "./main.scss";


// const serverURL = 'http://13.70.182.53:5000';

const serverURL = 'http://localhost:5000';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {response:""}
    }


    render(){
        return(
            <Router>
                <div className="page">
                    <Navbar />

                    <Switch>
                        <Route exact path="/" component = {HomePage}/>
                        <Route path="/about" component ={AboutPage}/>
                        <Route exact path="/event"  render={()=>(<ListEventPage serverURL= {serverURL} />)}/>
                        <Route path="/event/create" render={(history)=>(<CreateEventPage history = {history.history} serverURL= {serverURL}/>)}/>
                        <Route exact path="/event/:id" render={(history)=>(<ViewEventPage history = {history.history} serverURL={serverURL} eventID={history.match.params.id} />)} />
                        <Route path="/event/:id/survey" render={(history)=><SurveyPage serverURL={serverURL}    eventID={history.match.params.id} />}  />
                        <Route component={NotFound} />
                    </Switch>

                    <Footer />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />,document.getElementById("root"));