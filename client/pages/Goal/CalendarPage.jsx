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
            selectedEvent:null,
            selectedDate:new Date(),
            activities:[]
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

        axios.get(this.props.serverURL + '/list/all')
        .then((res)=>{
            this.setState({activities:res.data.lists})
        })

    }

    renderConceptsToSetGoal(){
        const concepts = this.state.concepts.length!=0?
            this.state.concepts.map((item)=>(
                <li key={item._id} id={item._id} className="list-group-item">
                    {item.conceptName} <button onClick={this.onClickSetNewGoal.bind(this)} className="btn btn-xs btn-default pull-right">+</button>
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

    onSelectDate(selectedDate){
        this.setState({selectedDate});
        var date = moment(selectedDate).format('YYYY-MM-DD');
        this.forceUpdate();
    }

    handleGoToSelectActivities(e){
        e.preventDefault();
        var listId = document.getElementById('select-activity-category').value;
        this.props.history.push('/survey/list/' + listId +'/Calendar');

    }

    renderActivityCategories(){
        const activityCategories = this.state.activities.map((item)=>(
            <option value={item._id} key={item._id}>{item.listName}</option>
        ))

        return activityCategories;
    }

    render(){
        return(
            <div id="calendar-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Activity Planner</h2>
                        {/*<p>Plan and View Your Activities Here.</p>*/}
                    </div>
                </div>



                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div id="calendar">
                                <BigCalendar
                                    date={this.state.selectedDate}
                                    onNavigate={this.onSelectDate.bind(this)}
                                    events={this.state.goals}
                                    startAccessor='startDate'
                                    endAccessor='endDate'
                                    views={['month']}
                                    titleAccessor='type'
                                    selectable
                                    defaultDate ={new Date()}
                                    eventPropGetter={this.eventClassName}
                                    onSelectEvent={this.onSelectEvent.bind(this)}
                                    popup={true}

                                />
                            </div>

                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="daily-view">
                                <div className="text-center"></div>
                                <h3>Activity Detail</h3>
                            </div>
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

                                    {/* <div className="delete">
                                        <button className="btn btn-danger">Delete</button>
                                    </div> */}
                                </div>

                                :
                                ""
                        }
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <h3>Activity Category</h3>
                            <div className="form-inline">
                                <div className="form-group">
                                    <div className="input-group">
                                        <select name="select-activity-category" id="select-activity-category" className="form-control">
                                            {this.renderActivityCategories()}
                                        </select>
                                    </div>
                                </div>
                                <button id="ActivitySearchBtn" className="btn btn-primary" onClick={this.handleGoToSelectActivities.bind(this)}>Go to Select Activities</button>
                            </div>


                            <h3>Select Activities to add:</h3>
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
                                <h4 className="modal-title" id="gridSystemModalLabel">Add Activity</h4>
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