import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

import CreateGoalPage from './CreateGoalPage';

export default class CalendarPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            goals : [],
            selected:this.props.data?this.props.data.selected:[],
            concepts:[],
            newGoalConcept:null,
            selectedEvent:null
        }
    }

    componentDidMount(){

        axios.get(this.props.serverURL+'/goal/user/'+this.props.user.id)
        .then((res)=>{
            this.setState({goals:res.data.goals})
        })

        if(!this.state.selected) return;
        for(var i=0;i<this.state.selected.length;i++){
            axios.get(this.props.serverURL + '/concept/detail/'+this.state.selected[i])
                .then((res)=>{
                    var concepts = this.state.concepts;
                    concepts.push(res.data.concept);
                    this.setState({concepts});
                }
            )
        }

    }

    renderConceptsToSetGoal(){
        const concepts = this.state.concepts.length!=0?
            this.state.concepts.map((item)=>(
                <li key={item._id} id={item._id} className="list-group-item">
                    {item.conceptName} <button onClick={this.onClickSetNewGoal.bind(this)} className="btn btn-secondary pull-right">Set New Goal</button>
                </li>
            ))
            :
            <p>None</p>
        return concepts;
    }

    onClickSetNewGoal(e){
        var id = e.target.parentNode.id;
        for(var i=0;i<this.state.concepts.length;i++){
            if(this.state.concepts[i]._id === id){
                this.setState({newGoalConcept:this.state.concepts[i]})
            }
        }
        $('#create-goal-modal').modal('show');
    }

    handleNewGoalCreated(newGoal){
        var goals = this.state.goals;
        goals.push(newGoal);
        this.setState({goals});
        this.forceUpdate();
    }

    eventClassName(event,start,end,isSelected){
        if(event.completed && isSelected)
            return{'className':'rbc-event-compelete rbc-selected'}
        if(event.completed && !isSelected)
            return{'className':'rbc-event-compelete'}
        if(!event.completed && isSelected)
            return{'className':'rbc-event rbc-selected'}
        if(!event.completed && !isSelected)
            return{'className':'rbc-event'}
    }

    onSelectEvent(event,e){
        this.setState({selectedEvent:event});
    }

    onClickComplete(e){
        var completed = e.target.checked;
        var selectedEvent = this.state.selectedEvent;
        selectedEvent.completed = completed;
        this.setState({selectedEvent})
        this.forceUpdate();
        axios.post(this.props.serverURL + '/goal/completed/' + this.state.selectedEvent._id,{completed});
    }

    render(){
        return(
            <div id="calendar-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Calendar</h2>
                        <p>Set and View Your Goals Here. Click the goals in calendar for futhur detail.</p>
                    </div>
                </div>



                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div id="calendar">
                            {   
                                this.state.goals.length!=0?
                                <BigCalendar
                                    events={this.state.goals}
                                    startAccessor='startDate'
                                    endAccessor='endDate'
                                    views={['month']}
                                    selectable
                                    defaultDate ={new Date()}
                                    eventPropGetter={this.eventClassName}
                                    onSelectEvent={this.onSelectEvent.bind(this)}
                                />
                                :
                                <p>No Goals Yet...</p>
                            }
                            </div>

                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            {
                                this.state.selectedEvent?
                                <div className="selected-goal">
                                    <h3>{this.state.selectedEvent.title}</h3>
                                    <h3>
                                        {this.state.selectedEvent.startDate} to {this.state.selectedEvent.endDate}
                                    </h3>
                                    <h3>
                                        {this.state.selectedEvent.desc}
                                    </h3>
                                    <div className="concept-block">
                                        <div className="img-wrapper">
                                            <NavLink to={"/concept/detail/" + this.state.selectedEvent.concept._id}>
                                                <img src={this.state.selectedEvent.concept.imgUrl} alt={this.state.selectedEvent.concept.conceptName} />
                                            </NavLink>
                                        </div>
                                        <NavLink to={"/concept/detail/" + this.state.selectedEvent.concept._id}>
                                            <h5>{this.state.selectedEvent.concept.conceptName}</h5>
                                        </NavLink>
                                    </div>

                                    <div className="slider-switcher">
                                        <p>Completed:</p>
                                            <label className="switch" >
                                                <input type="checkbox" checked={this.state.selectedEvent.completed} onClick={this.onClickComplete.bind(this)}/>
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                </div>

                                :
                                ""
                        }
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <h4>Items to Add:</h4>
                            <ul className="list-group">
                                {this.renderConceptsToSetGoal()}
                            </ul>
                        </div>
                    </div>


                </div>

                <div className="modal fade" id="create-goal-modal" tabIndex="-1" role="dialog" aria-labelledby="create-goal-modal-label">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="gridSystemModalLabel">Set new Goal</h4>
                            </div>


                            <div className="modal-body ">
                                <CreateGoalPage serverURL = {this.props.serverURL}  concept={this.state.newGoalConcept} callback = {this.handleNewGoalCreated.bind(this)} user={this.props.user}/>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        )
    }
}