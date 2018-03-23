import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Link,Switch} from 'react-router-dom';

import Navbar from './components/Navbar';

import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

import ListEventPage from './pages/Event/ListEventPage';
import CreateEventPage from './pages/Event/CreateEventPage';
import ViewEventPage from './pages/Event/ViewEventPage';
import SurveyPage from './pages/Event/SurveyPage';

import "./main.scss";

const serverURL = 'http://13.70.182.53:5000';


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
                        <Route exact path="/event"  render={()=>(<ListEventPage serverURL= {serverURL} />)}/>
                        <Route path="/event/create" render={(history)=>(<CreateEventPage history = {history.history} serverURL= {serverURL}/>)}/>
                        <Route exact path="/event/:id" render={(match)=>(<ViewEventPage serverURL={serverURL} eventID={match.match.params.id} />)} />
                        <Route path="/event/:id/survey" render={(match)=><SurveyPage serverURL={serverURL}    eventID={match.match.params.id} />}  />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />,document.getElementById("root"));