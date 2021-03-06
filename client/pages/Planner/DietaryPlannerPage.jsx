import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import RecipeSelector from '../../components/RecipeSelector';
import AddNewMealPage from './AddNewMealPage';

import util from '../../util/util';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class DietaryPlannerPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            nutritionRequirement:[],
            selectedDate:new Date(),
            selectedRecipe:{},
            mealPlans:[],
            mealPlansForTheDay:[],
        }
    }

    componentDidMount(){ 
        axios.post(this.props.serverURL+'/planner/meal-plans/',{userid:this.props.user.id,profileid:this.props.user.profile.id})
        .then((res)=>{
            this.setState({mealPlans:res.data.mealPlans});
            this.onSelectDate(new Date());
        })

        var profile = this.props.user.profile;
        if(profile.age == undefined) return this.setState({nutritionRequirement:false})
        var nutritionRequirement = util.NutritionRequirementCalculator(profile.age,profile.gender,profile.height,profile.weight,profile.activeLevel);
        this.setState({nutritionRequirement})

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
        var mealPlansForTheDay = [];
        for(var i=0;i<this.state.mealPlans.length;i++){
            if(this.state.mealPlans[i].date === date)
                mealPlansForTheDay.push(this.state.mealPlans[i]);
        }
        this.setState({mealPlansForTheDay})
        this.forceUpdate();
    }

    onSelectRecipe(selectedRecipe){
        this.setState({selectedRecipe});
        this.forceUpdate();
        $('#add-new-meal-modal').modal('show');
    }

    handleAddNewMeal(newMealPlan){
        $('#add-new-meal-modal').modal('hide');
        var mealPlans = this.state.mealPlans;
        mealPlans.push(newMealPlan);
        this.setState({mealPlans});
        this.onSelectDate(this.state.selectedDate);
    }

    renderMealPlans(){
        const mealPlans = this.state.mealPlansForTheDay.map((item)=>(
            <p key={item._id}>{item.planName}({item.quantity}g)</p>
        ));
        return mealPlans;
    }

    renderNutritionStatus(){
        if(this.state.nutritionRequirement == false)
            return(<NavLink to="/user/profile" className="btn btn-primary">Set Profile</NavLink>)
        else
            var currentNutrition = {
                Calcium:0,
                Fiber:0,
                Fat:0,
                Protein:0,
                Calorie:0
            };
            for(var i=0;i<this.state.mealPlansForTheDay.length;i++){
                var mealPlan = this.state.mealPlansForTheDay[i];
                currentNutrition.Calcium += parseFloat(mealPlan.recipe.Calcium) * mealPlan.quantity/100;
                currentNutrition.Fiber   += parseFloat(mealPlan.recipe.Fiber)   * mealPlan.quantity/100;
                currentNutrition.Fat     += parseFloat(mealPlan.recipe.Fat)     * mealPlan.quantity/100;
                currentNutrition.Protein += parseFloat(mealPlan.recipe.Protein) * mealPlan.quantity/100;
                currentNutrition.Calorie += parseFloat(mealPlan.recipe.Energy)  * mealPlan.quantity/100;
            }

            const nutritionStatus = (
                <div className="nutritionStatusBox">
                    <p><img src="http://d-ash.lolipop.jp/img/fiber.png" width="20px"/> Fiber:   {Math.round(currentNutrition.Fiber,2)}    / {Math.round(this.state.nutritionRequirement.fiber,2)} g</p>
                    <p><img src="http://d-ash.lolipop.jp/img/fat.png" width="20px"/> Fat:     {Math.round(currentNutrition.Fat,2)}      / {Math.round(this.state.nutritionRequirement.fat,2)} g</p>
                    <p><img src="http://d-ash.lolipop.jp/img/protein.png" width="20px"/> Protein: {Math.round(currentNutrition.Protein,2)}  / {Math.round(this.state.nutritionRequirement.protein,2)} g</p>
                    <p><img src="http://d-ash.lolipop.jp/img/calcium.png" width="20px"/> Calcium: {Math.round(currentNutrition.Calcium,2)}  / {Math.round(this.state.nutritionRequirement.calcium,2)} mg</p>
                    <p><img src="http://d-ash.lolipop.jp/img/calorie.png" width="20px"/> Calorie: {Math.round(currentNutrition.Calorie,2)}  / {Math.round(this.state.nutritionRequirement.calorie,2)} kcal</p>
                
                </div>
            )

            return nutritionStatus;


    }

    render(){
        return(
            <div id="nutrition-planner-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>{this.props.user.profile.name}'s Dietary Planner</h2>
                        {/*<p>A calendar you could manage the following month’s recipe for your patient. <br />Choose the preferred recipe with a certain amount to fit the average daily nutrition intake.</p>*/}
                    </div>

                </div>


                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div id="calendar">
                                <BigCalendar
                                    date={this.state.selectedDate}
                                    events={this.state.mealPlans}
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
                                <h4>Dietary <a href="#recipe-searcher" className="badge">add</a></h4>
                                    {this.renderMealPlans()}  
                                <hr/>
                                <h4>Nutrition Status</h4>
                                {this.renderNutritionStatus()}
                            </div>
                        </div>
                    </div>
                    <div id="MealsearchBox"></div>
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
