import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import RecipeSelector from '../../components/RecipeSelector';

import AddNewMealPage from './AddNewMealPage';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class PlannerPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            selectedDate:new Date(),
            selectedRecipe:{},
            mealplans:[],
            excercisePlans:[]
        }
    }

    componentDidMount(){
        
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
        this.forceUpdate();
    }

    onSelectRecipe(selectedRecipe){
        this.setState({selectedRecipe});
        this.forceUpdate();
        $('#add-new-meal-modal').modal('show');
    }

    handleAddNewMeal(newMealPlan){
        $('add-new-meal-modal'),modal('hide');
        var mealPlans = this.state.mealplans;
        mealPlans.push(newMealPlan);
        this.setState({mealPlans});
    }


    render(){
        return(
            <div id="planner-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Planner</h2>
                        <p>Make the Diary and Excersies Plan.</p>
                    </div>

                </div>


                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div id="calendar">
                                <BigCalendar
                                    date={this.state.selectedDate}
                                    events={[]}
                                    startAccessor='startDate'
                                    endAccessor='endDate'
                                    views={['month']}
                                    onNavigate={this.onSelectDate.bind(this)}
                                    selectable
                                    defaultDate ={new Date()}
                                    eventPropGetter={this.eventClassName}
                                    onSelectEvent={null}
                                    popup={true}
                                />
                            </div>
                        </div>


                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="daily-view">
                                <div className="text-center"></div>
                                <h3>{this.state.selectedDate.toDateString()} Daily View</h3>
                                <hr/>
                                <h4>Dietary</h4>
                                    {this.renderMealPlans}  
                                <hr/>
                                <h4>Excercise</h4>
                                <hr/>
                                <h4>Nutrition Status</h4>
                                <p>{this.props.user.profile}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <RecipeSelector serverURL={this.props.serverURL} callback={this.onSelectRecipe.bind(this)}/>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="add-new-meal-modal" tabIndex="-1" role="dialog" aria-labelledby="add-new-meal-modal">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="gridSystemModalLabel">Add Meal</h4>
                            </div>
                            <div className="modal-body ">
                                <AddNewMealPage serverURL={this.props.serverURL}  
                                                recipe={this.state.selectedRecipe} 
                                                date={this.state.selectedDate}
                                                callback = {this.handleAddNewMeal.bind(this)} 
                                                user={this.props.user}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
