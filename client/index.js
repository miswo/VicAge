import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Link,Switch} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';

// import ListEventPage from './pages/Event/ListEventPage';
// import CreateEventPage from './pages/Event/CreateEventPage';
// import ViewEventPage from './pages/Event/ViewEventPage';
// import SurveyPage from './pages/Event/SurveyPage';


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
import RegisterPage from './pages/User/RegisterPage';
import ProfilePage from './pages/User/ProfilePage';
import UserCenterPage from  './pages/User/UserCenterPage';
import SwitchProfilePage from './pages/User/SwitchProfilePage';

import NutrtionPage from './pages/Planner/NutritionPage';
import DietaryPlannerPage from './pages/Planner/DietaryPlannerPage';
import ExercisePlannerPage from './pages/Planner/ExercisePlannerPage';
import HealthStatusPage from './pages/Planner/HealthStatusPage';


import CalendarPage from './pages/Goal/CalendarPage';




import "./main.scss";
import "./main2.scss";

// Remote Server 
const serverURL = 'http://13.70.182.53:5000'; 

// Local Server
// const serverURL = 'http://localhost:5000';
// const serverURL = 'http://118.139.84.138:5000';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            // user:{id:'5addf8ff6f2a1d36346222fc',userName:'will',profile:{id:'5aeeabf7a783cc73b711f16a',name:'will',activeLevel:1.55,age:26,gender:"male",height:175,weight:75},allProfile:['5aeeabf7a783cc73b711f16a']},
            user:null,
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
        return (
            <Router>
                <div className="page">
                    <Navbar />
                    <Switch>
                        <Route exact path="/"           render={(history)=>(<HomePage      history={history.history}/>)}/>
                        <Route       path="/login"      render={(history)=>(<LoginPage     callback={this.setLoginUser.bind(this)} history  ={history.history} serverURL={serverURL}/>)} />
                        <Route       path="/register"   render={(history)=>(<RegisterPage  callback={this.setLoginUser.bind(this)} history  ={history.history} serverURL={serverURL}/>)} />
                        <Route                          render={()=>(       <LoginPage     callback={this.setLoginUser.bind(this)} serverURL={serverURL}/>)} />
                    </Switch>

                    <Footer />
                
                </div>
            </Router>
        )

        else
        return(
            <Router>
                <div className="page">
                    <Navbar user={this.state.user}/>
                    <Switch>
                        <Route exact path="/"           render={(history)=>(<HomePage      history={history.history}/>)}/>
                        {/* <Route path="/about"  render ={()=>(<AboutPage/>)}/> */}
                        {/* <Route exact path="/event"  render={()=>(<ListEventPage serverURL= {serverURL} />)}/>
                        <Route path="/event/create" render={(history)=>(<CreateEventPage    history = {history.history} serverURL= {serverURL}/>)}/>
                        <Route exact path="/event/:id" render={(history)=>(<ViewEventPage   history = {history.history} serverURL={serverURL} eventID={history.match.params.id} />)} />
                        <Route path="/event/:id/survey" render={(history)=><SurveyPage      serverURL={serverURL}    eventID={history.match.params.id} />} />
                        <Route path="/concept/create" render={(history)=><CreateConceptPage history ={history.history}  serverURL={serverURL}/>}  /> */}
                        <Route path="/list/create"                  render={(history)=><CreateListPage          history={history.history} serverURL={serverURL} data={this.state.data}/>} />}
                        <Route path="/list/all"                     render={(history)=><ListAllListPage         history={history.history} serverURL={serverURL}/>}/>}
                        <Route path="/list/detail/:id"              render={(history)=><DetailListPage          match ={history}    history={history.history} serverURL={serverURL}/>}/>}

                        <Route path="/concept/detail/:id"           render={(history)=><DetailConceptPage       match = {history} history={history.history} serverURL={serverURL}/>}/>}
                        <Route path="/concept/edit/:id"             render={(history)=><EditConceptPage         match = {history} history={history.history} serverURL={serverURL}/>}/>}
                        
                        <Route path="/survey/list/:id/:actionName"  render={(history)=><SingleListSurveyPage    match = {history} history={history.history} serverURL={serverURL} dataTransfer={this.dataTransfer.bind(this)}/>}/>}
                        <Route path="/survey/result"                render={(history)=><SurveyResultPage        match={history} history={history.history}   serverURL={serverURL} data={this.state.data}/>}/>}
                        <Route path="/survey/calorie-calculator"    render={(history)=><CalorieCalculatorPage   match={history} history={history.history}   serverURL={serverURL} data={this.state.data}/>}/>}

                        <Route path="/goal/calendar"                render={(history)=><CalendarPage            match={history} history={history.history}   serverURL={serverURL} data={this.state.data} user={this.state.user}/>}/>}
                        <Route path="/home"                         render={()=><UserCenterPage                  user = {this.state.user} />} />
                        <Route path="/user/profile"                 render={()=><ProfilePage                     user={this.state.user} serverURL={serverURL} dataTransfer={this.dataTransfer.bind(this)}/>  } />
                        <Route path="/user/switch-profile"          render={(history)=><SwitchProfilePage        user={this.state.user} serverURL={serverURL} history={history.history} dataTransfer={this.dataTransfer.bind(this)}/>  } />                        
                        <Route path="/dietary-planner"              render={()=><DietaryPlannerPage            user={this.state.user} serverURL={serverURL}/>  } />
                        <Route path="/exercise-planner"             render={()=><ExercisePlannerPage             user={this.state.user} serverURL={serverURL}/>  } />
                        <Route path="/health-status"                 render={()=><HealthStatusPage                user={this.state.user} serverURL={serverURL}/>  } />


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
