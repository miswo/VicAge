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
import DetailConceptPage from './pages/Concept/DetailConceptPage';
import EditConceptPage from './pages/Concept/EditConceptPage';


import CreateListPage from './pages/List/CreateListPage';
import ListAllListPage from './pages/List/ListAllListPage';
import DetailListPage from './pages/List/DetailListPage';


import SingleListSurveyPage from './pages/Survey/SingleListSurveyPage';
import SurveyResultPage from './pages/Survey/SurveyResultPage';
import CalorieCalculatorPage from './Pages/Survey/CalorieCalculatorPage';


import ListServicePage from './pages/Service/ListServicePage';
import DetailServicePage from './pages/Service/DetailServicePage';

import LoginPage from './pages/User/LoginPage';

import CalendarPage from './pages/Goal/CalendarPage';




import "./main.scss";

// Remote Server 
// const serverURL = 'http://13.70.182.53:5000'; 

// Local Server
const serverURL = 'http://localhost:5000';
// const serverURL = 'http://118.139.95.189:5000';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:{id:'5addf8ff6f2a1d36346222fc',user:'will'},
            // user:null,
            data:null
        }
    }

    dataTransfer(data){
        this.setState({data})
    }

    setLoginUser(user){
        this.setState({user});
    }


    render(){
        if(!this.state.user)
        return <LoginPage callback={this.setLoginUser.bind(this)} serverURL={serverURL}/>
        else
        return(
            <Router>
                <div className="page">
                    <Navbar />
                    <Switch>
                        <Route exact path="/" render={(history)=>(<HomePage history={history.history}/>)}/>
                        <Route path="/about"  render ={()=>(<AboutPage/>)}/>
                        {/* <Route exact path="/event"  render={()=>(<ListEventPage serverURL= {serverURL} />)}/>
                        <Route path="/event/create" render={(history)=>(<CreateEventPage    history = {history.history} serverURL= {serverURL}/>)}/>
                        <Route exact path="/event/:id" render={(history)=>(<ViewEventPage   history = {history.history} serverURL={serverURL} eventID={history.match.params.id} />)} />
                        <Route path="/event/:id/survey" render={(history)=><SurveyPage      serverURL={serverURL}    eventID={history.match.params.id} />} />
                        <Route path="/concept/create" render={(history)=><CreateConceptPage history ={history.history}  serverURL={serverURL}/>}  /> */}
                        <Route path="/list/create"              render={(history)=><CreateListPage          history={history.history} serverURL={serverURL} data={this.state.data}/>} />}
                        <Route path="/list/all"                 render={(history)=><ListAllListPage         history={history.history} serverURL={serverURL}/>}/>}
                        <Route path="/list/detail/:id"          render={(history)=><DetailListPage          match ={history}    history={history.history} serverURL={serverURL}/>}/>}

                        <Route path="/concept/detail/:id"       render={(history)=><DetailConceptPage       match = {history} history={history.history} serverURL={serverURL}/>}/>}
                        <Route path="/concept/edit/:id"         render={(history)=><EditConceptPage         match = {history} history={history.history} serverURL={serverURL}/>}/>}
                        
                        <Route path="/survey/list/:id/:actionName"          render={(history)=><SingleListSurveyPage    match = {history} history={history.history} serverURL={serverURL} dataTransfer={this.dataTransfer.bind(this)}/>}/>}
                        <Route path="/survey/result"            render={(history)=><SurveyResultPage        match={history} history={history.history}   serverURL={serverURL} data={this.state.data}/>}/>}
                        <Route path="/survey/calorie-calculator"render={(history)=><CalorieCalculatorPage   match={history} history={history.history}   serverURL={serverURL} data={this.state.data}/>}/>}

                        <Route path="/goal/calendar"            render={(history)=><CalendarPage   match={history} history={history.history}   serverURL={serverURL} data={this.state.data}/>}/>}
                        

                        <Route path="/service/find/:serviceName/:postcode"    render={(history)=>(<ListServicePage        match ={history} history={history.history}  serverURL = {serverURL}/>)} />
                        <Route path={"/service/(agedcare|disability|hospital|community)/detail/:id"} render={(history)=>(<DetailServicePage match={history} history={history.history} serverURL={serverURL}/>)} />
                        <Route render={()=>(<NotFound/>)} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />,document.getElementById("root"));
