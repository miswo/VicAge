import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class SurveyPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            "activities":[],
            "selected":'default'
        };
    }

    componentDidMount(){
        axios.get(this.props.serverURL+'/event/'+ this.props.eventID+'/survey')
            
            .then((res)=>{
                this.setState({'activities':res.data.activities})
            });

    }

    renderActivities(){
        let activityItems = this.state.activities.map((item)=>
            <div key={item._id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="radio">
                    <label>
                        <input type="radio" name="favoriate-activity" id={'activity'+item._id} value={item.name} onClick={this.handleOnclick.bind(this)}/>
                        <img alt={item.name} src={item.picurl} />
                    </label>
                </div>
            </div>
        )
        const test = <h1>Hello</h1>
        return activityItems;
    }

    handleOnclick(e){
        this.setState({"selected":e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        axios.post(this.props.serverURL+'/event/handleSurvey',{
            eventID: this.props.eventID,
            activityName: this.state.selected
        })
            .then((res)=>{
                if(res.data.result=='ok')
                    window.location.href="/event/"+this.props.eventID;
                else
                    alert('Something is wrong');
            })
    }

    render(){
        return(
            <div id="survey-page">
                <div className="jumbotron">
                    <div className="container">
                        <h2>New Survey</h2>
                        <p className="lead">Select your favoriate activity</p>
                    </div>
                </div>

                <div className="container">
                    <h3>Activities</h3>

                    <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            {this.renderActivities()}
                        </div>
                        <input type="submit" className="btn btn-primary" />
                    </form>
                </div>
            </div>
        )
    }
}