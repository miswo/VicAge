import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import util from '../../util/util';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class ExercisePlannerPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            selectedDate:new Date(),
            exercises:[],
            exercisePlans:[],
            exercisePlansForTheDay:[],
            selectedExerciseLevel:'Light',
        }
    }

    componentDidMount(){ 

        axios.get(this.props.serverURL+'/planner/exercises')
        .then((res)=>{
            this.setState({exercises:res.data.exercises})
        })


        axios.post(this.props.serverURL+'/planner/exercise-plans',{
            userid:this.props.user.id,
            profileid:this.props.user.profile.id
        })
        .then((res)=>{
            this.setState({exercisePlans:res.data.exercisePlans});
        })

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

    onSelectDate(selectedDate){
        this.setState({selectedDate});
        var date = moment(selectedDate).format('YYYY-MM-DD');
        var exercisePlansForTheDay = [];
        for(var i=0;i<this.state.exercisePlans.length;i++){
            if(this.state.exercisePlans[i].date === date)
                exercisePlansForTheDay.push(this.state.exercisePlans[i]);
        }
        this.setState({exercisePlansForTheDay})
        this.forceUpdate();
    }

    onSelectExerciseLevel(e){
        this.setState({selectedExerciseLevel:e.target.value})
    }

    renderExercisesToSelect(){
        var exercisesToDisplay = [];
        for(var i=0;i<this.state.exercises.length;i++){
            if(this.state.exercises[i].ExerciseLevel === this.state.selectedExerciseLevel)
                exercisesToDisplay.push(this.state.exercises[i]);
        }

        const exerciseOptions = exercisesToDisplay.map((item)=>(
            <option key={item._id} value={item._id}>{item.ExerciseName}</option>
        ))

        return exerciseOptions;
    }

    handleSubmit(e){
        e.preventDefault();
        var exerciseID = document.getElementById('exercise-name').value;
        var quantity = document.getElementById('input-quantity').value;
        if(quantity <= 0) return alert('Please Enter correct Exercise Duration');

        var exercise = null;

        for(var i=0;i<this.state.exercises.length;i++){
            if(this.state.exercises[i]._id === exerciseID)
                exercise = this.state.exercises[i];
        }

        if(exercise == null)
            return alert('Something is wrong');
        var newExercisePlan ={
            planName:exercise.ExerciseName,
            type:'Exercise',
            userid:this.props.user.id,
            profileid:this.props.user.profile.id,
            date:moment(this.state.selectedDate).format('YYYY-MM-DD'),
            exercise,
            quantity
        };
        axios.post(this.props.serverURL +'/planner/add-new-exercise',newExercisePlan)
        .then((res)=>{
            if(res.data.status==200){
                alert('Exercise Plan Added');
                var exercisePlans = this.state.exercisePlans;
                exercisePlans.push(newExercisePlan);
                this.setState({exercisePlans});
            }
        })
    }

    renderExercisePlan(){
        const plans = this.state.exercisePlansForTheDay.map((item)=>(
            <p key={item._id}>{item.planName}({item.quantity} Minutes)</p>
        ))

        return plans;
    }

    renderCalorieBurn(){
        if(this.state.exercisePlansForTheDay.length == 0){
            return <p>0 kcal</p>
        }
        var weight = this.props.user.profile.weight;

        var calorieBurn = 0;

        for(var i=0;i<this.state.exercisePlansForTheDay.length;i++){
            var plan = this.state.exercisePlansForTheDay[i];
            calorieBurn += parseFloat(plan.exercise.CalorieBurnt) * plan.quantity * weight / 10 / 10;
        }

        return <p> {calorieBurn} kcal</p>
    }

    render(){
        return(
            <div id="excersise-planner-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Exercise Planner</h2>
                        {/*<p>Selecting appropriate level of exercise with suitable duration could help patient not only for superior weight control, but also help with the monitoring and forward prediction of both calorie burn.</p>*/}
                    </div>

                </div>


                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div id="calendar">
                                <BigCalendar
                                    date={this.state.selectedDate}
                                    events={this.state.exercisePlans}
                                    startAccessor='date'
                                    endAccessor='date'
                                    titleAccessor='type'
                                    views={['month']}
                                    onNavigate={this.onSelectDate.bind(this)}
                                    // selectable
                                    defaultDate ={new Date()}
                                    eventPropGetter={this.eventClassName}
                                    onSelectEvent={null}
                                    popup={false}
                                />
                            </div>
                        </div>


                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="daily-view">
                                <div className="text-center"></div>
                                <h3>{this.state.selectedDate.toDateString()} Daily View</h3>
                                <hr/>
                                <h4>Exercise</h4>
                                {this.renderExercisePlan()}
                                <hr/>
                                <h4>Total Calorie Burn</h4>
                                {this.renderCalorieBurn()}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                                <h3>Select An Exercise to Add:</h3>
                                <div className="form-group">
                                    <label className="ExerciseLabel" htmlFor="exercise-level">Select An Exercise Level:</label>
                                    <select name="exercise-level" id="exercise-level" onChange={this.onSelectExerciseLevel.bind(this)} className="form-control">
                                        <option value="Light"   >Light</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Active"  >Active</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="ExerciseLabel" htmlFor="exercise-name">Exercise Name:</label>
                                    <select name="exercise-name" id="exercise-name" className="form-control">
                                        {this.renderExercisesToSelect()}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="ExerciseLabel" htmlFor="input-quantity">Duration:</label>
                                    <div className="input-group">
                                        <input type="number" id="input-quantity" className="form-control"/>
                                        <div className="input-group-addon">Minute(s)</div>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary">Add Exercise Plan</button>

                            </form>
                        </div>

                    </div>
                </div>

                
            </div>
        )
    }
}