import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';

import Navbar from './components/Navbar';

import HomePage from './pages/HomePage';
import ListEventPage from './pages/Event/ListEventPage';

import "./main.css";

const serverURL = 'http://localhost:5000';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {response:""}
    }

    componentDidMount(){
        fetch(serverURL + '/event')
            .then(Response => {return Response.json()})
            .then(data => this.setState({response:data.data}));
    }
    render(){
        return(
            <Router>
                <div className="page">
                    <Navbar />
                    
                    <Route exact path="/" component = {HomePage}/>
                    <Route path="/event"  render={()=>(<ListEventPage serverURL= {serverURL} />)} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />,document.getElementById("root"));