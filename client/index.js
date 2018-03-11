import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';

import Navbar from './components/Navbar';

import "./main.css";

const serverURL = 'http://localhost:5000'


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
                </div>
            </Router>
        )
    }
}

const HomePage = () => (
    <div className="App jumbotron">
        <div className="container">
            <h1>Welcome to Care4U</h1>
            <p className="lead">Proudly present to you by WYSDoM</p>
        </div>
    </div>
);

ReactDOM.render(<App />,document.getElementById("root"));