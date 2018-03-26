import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class SurveyPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            "concepts":[],
            "selected":'default'
        };
    }

    componentDidMount(){
        axios.get(this.props.serverURL+'/event/'+ this.props.eventID+ '/survey')
            .then((res)=>{
                this.setState({'concepts':res.data.concepts})
            });

    }

    renderConcepts(){
        let conceptItems = this.state.concepts.map((item)=>
            <div key={item._id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="radio">
                    <label className="choice">
                        <input type="radio" name="favoriate-concept" id={'concept'+item._id} value={item.conceptName} onClick={this.handleOnclick.bind(this)}/>
                        <p className="lead">{item.conceptName}</p>
                        <img alt={item.conceptName} src={item.imgUrl} />
                    </label>
                </div>
            </div>
        )
        const test = <h1>Hello</h1>
        return conceptItems;
    }

    handleOnclick(e){
        this.setState({"selected":e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        axios.post(this.props.serverURL+'/event/handleSurvey',{
            eventID: this.props.eventID,
            conceptName: this.state.selected
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
                        <p className="lead">Select your favoriate concept</p>
                    </div>
                </div>

                <div className="container">
                    <h3>Concepts</h3>

                    <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            {this.renderConcepts()}
                        </div>
                        <input type="submit" className="btn btn-primary" />
                    </form>
                </div>
            </div>
        )
    }
}