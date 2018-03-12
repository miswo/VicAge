import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class ViewEventPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            event:{
                name:"No such event",
                date:"1970-1-1"
            },
            surveyResults:[]
        }
    }

    componentDidMount(){
        axios.get(this.props.serverURL + '/event/' + this.props.eventID)
            .then((res)=>{this.setState({
                event:{
                    name:res.data.name,
                    date:new Date(res.data.date).toLocaleDateString()
                }
            })});


        axios.get(this.props.serverURL + '/event/' + this.props.eventID +'/survey-result')
            .then((res)=>{
                console.log(res);
                this.setState({surveyResults:res.data.surveyResults})})
    }

    renderSurveyResults(){
        const results = this.state.surveyResults.map((item)=>
            <tr key = {item._id}>
                <td>{item.activityName}</td>
                <td>{item.count}</td>
            </tr>
        )
        return results;
    }

    render(){
        return(
            <div id="view-event-page">
                <div className="jumbotron">
                    <div className="container">
                        <h2>{this.state.event.name}</h2>
                        <p>{this.state.event.date}</p>
                        <Link to={"/event/"+this.props.eventID+"/survey"} className="btn btn-primary">New Survey</Link>

                    </div>
                </div>

                <div className="container">

                    <h3>Survey Result</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Activity</th>
                                <th>Number of people in favor</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderSurveyResults()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


}