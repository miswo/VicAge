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


import CreateConceptPage from './pages/Concept/CreateConceptPage';


import ListServicePage from './pages/Service/ListServicePage';


import "./main.scss";

// Remote Server 
// const serverURL = 'http://13.70.182.53:5000'; 

// Local Server
const serverURL = 'http://localhost:5000';
// const serverURL = 'http://118.139.73.54:5000';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            active:true,
            inputPassword:''
        }
    }

    handlePasswordInput(e){
        this.setState({inputPassword:e.target.value});
        if(this.state.inputPassword == 'asdfghjkl')
            this.setState({active:true})
    }

    componentDidMount(){
        var target = document.getElementById("input-password")
        target?target.focus():'';
    }


    render(){
        return(
            <Router>
                {this.state.active?
                    <div className="page">
                        <Navbar />
                        <Switch>
                            <Route exact path="/" render={(history)=>(<HomePage history={history.history}/>)}component = {HomePage}/>
                            <Route path="/about" component ={AboutPage}/>
                            <Route exact path="/event"  render={()=>(<ListEventPage serverURL= {serverURL} />)}/>
                            <Route path="/event/create" render={(history)=>(<CreateEventPage    history = {history.history} serverURL= {serverURL}/>)}/>
                            <Route exact path="/event/:id" render={(history)=>(<ViewEventPage   history = {history.history} serverURL={serverURL} eventID={history.match.params.id} />)} />
                            <Route path="/event/:id/survey" render={(history)=><SurveyPage      serverURL={serverURL}    eventID={history.match.params.id} />} />
                            <Route path="/concept/create" render={(history)=><CreateConceptPage history ={history.history}  serverURL={serverURL}/>}  />
                            <Route path="/service/:postcode" render={(history)=>(<ListServicePage match ={history} history={history.history} serverURL = {serverURL}/>)} />
                            <Route component={NotFound} />
                        </Switch>
                        <Footer />
                    </div>
                    :
                    <div className="form-group" id="app-lock">
                        <label htmlFor="input-password">Password:</label>   
                        <input id="input-password" className="form-control" type="password" onChange={this.handlePasswordInput.bind(this)} />
                    </div>
                }
            </Router>
        )
    }
}

ReactDOM.render(<App />,document.getElementById("root"));