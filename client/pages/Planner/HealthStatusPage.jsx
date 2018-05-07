import React from 'react';
import axios from 'axios';
import moment from 'moment';
import util from '../../util/util';
import rechart from 'recharts';





export default class HealthStatusPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mealPlans:[],
            exercisePlans:[],
            nutritionRequirements:{},
            dailyAverageIntake:{}
        }
    }

    componentDidMount(){
        axios.post(this.props.serverURL + '/planner/meal-plans',{userid:this.props.user.id,profileid:this.props.user.profile.id})
        .then((res)=>{
            var mealPlans = res.data.mealPlans;
            mealPlans = this.filterPlansForThisMonth(mealPlans);
            this.setState({mealPlans})
            this.calculateDailyAverageNutritionIntake(mealPlans);
        })

        axios.post(this.props.serverURL + '/planner/exercise-plans',{userid:this.props.user.id,profileid:this.props.user.profile.id})
        .then((res)=>{
            var exercisePlans = res.data.exercisePlans;
            exercisePlans = this.filterPlansForThisMonth(exercisePlans);
            this.setState({exercisePlans})
        })

        var profile = this.props.user.profile;
        var nutritionRequirements = util.NutritionRequirementCalculator(profile.age,profile.gender,profile.height,profile.weight,profile.activeLevel);
        this.setState({nutritionRequirements});
    }

    filterPlansForThisMonth(plans){
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();
        var temp = [];
        for(var i=0;i<plans.length;i++){
            var planDate = moment(plans[i].date).toDate();
            if(planDate.getMonth() == month && planDate.getFullYear() == year)
                temp.push(plans[i])
        }
        return temp;
    }

    calculateDailyAverageNutritionIntake(plans){
        var calcium = 0;
        var fiber = 0;
        var fat = 0;
        var protein = 0;
        var calorie = 0;

        var uniqueDay = new Set();
        for(var i=0;i<plans.length;i++){
            uniqueDay.add(moment(plans[i].date).date())
            calcium += parseFloat(plans[i].recipe.Calcium) * plans[i].quantity / 100.0;
            fiber   += parseFloat(plans[i].recipe.Fiber)   * plans[i].quantity / 100.0;  
            fat     += parseFloat(plans[i].recipe.Fat)     * plans[i].quantity / 100.0;
            protein += parseFloat(plans[i].recipe.Protein) * plans[i].quantity / 100.0;
            calorie += parseFloat(plans[i].recipe.Energy)  * plans[i].quantity / 100.0;
        }
        var uniqueDayNumber = (uniqueDay.size).toFixed(2);
        calcium = Math.round(calcium/uniqueDayNumber*100)/100;
        fiber   = Math.round(fiber/uniqueDayNumber*100)/100;
        fat     = Math.round(fat/uniqueDayNumber*100)/100;
        protein = Math.round(protein/uniqueDayNumber*100)/100;
        calorie = Math.round(calorie/uniqueDayNumber*100)/100;
        this.setState({dailyAverageIntake:{calcium,fiber,fat,protein,calorie}})
    }

    renderProgressBarClass(percentage){
        if(percentage > 150)
            return 'progress-bar progress-bar-warning';
        if(percentage <100)
            return 'progress-bar progress-bar-danger';
        
        return 'progress-bar progress-bar-success';
    }

    renderAverageDailyIntake(){

        var calciumPercentage   = Math.round(this.state.dailyAverageIntake.calcium  / this.state.nutritionRequirements.calcium * 100);
        var fiberPercentage     = Math.round(this.state.dailyAverageIntake.fiber    / this.state.nutritionRequirements.fiber * 100);
        var fatPercentage       = Math.round(this.state.dailyAverageIntake.fat      / this.state.nutritionRequirements.fat * 100);
        var proteinPercentage   = Math.round(this.state.dailyAverageIntake.protein  / this.state.nutritionRequirements.protein * 100);
        var caloriePercentage   = Math.round(this.state.dailyAverageIntake.calorie  / this.state.nutritionRequirements.calorie * 100);
        return(
            <div className="nutrition-status">
                <h4>Calcium</h4>
                <p>{this.state.dailyAverageIntake.calcium}/{this.state.nutritionRequirements.calcium} mg</p>
                <div className="progress">
                    <div className={this.renderProgressBarClass(calciumPercentage)} role="progressbar" aria-valuenow={calciumPercentage} aria-valuemin="0" aria-valuemax="100" style={{width: calciumPercentage>100?'100%':calciumPercentage+'%'}}>
                        {calciumPercentage}%
                    </div>
                </div>


                <h4>Fiber</h4>
                <p>{this.state.dailyAverageIntake.fiber}/{this.state.nutritionRequirements.fiber} g</p>
                <div className="progress">
                    <div className={this.renderProgressBarClass(fiberPercentage)} role="progressbar" aria-valuenow={fiberPercentage} aria-valuemin="0" aria-valuemax="100" style={{width: fiberPercentage>100?'100%':fiberPercentage+'%'}}>
                        {fiberPercentage}%
                    </div>
                </div>


                <h4>Fat</h4>
                <p>{this.state.dailyAverageIntake.fat}/{this.state.nutritionRequirements.fat} g</p>
                <div className="progress">
                    <div className={this.renderProgressBarClass(fatPercentage)} role="progressbar" aria-valuenow={fatPercentage} aria-valuemin="0" aria-valuemax="100" style={{width: fatPercentage>100?'100%':fatPercentage+'%'}}>
                        {fatPercentage}%
                    </div>
                </div>


                <h4>Protein</h4>
                <p>{this.state.dailyAverageIntake.protein}/{this.state.nutritionRequirements.protein} g</p>
                <div className="progress">
                    <div className={this.renderProgressBarClass(proteinPercentage)} role="progressbar" aria-valuenow={proteinPercentage} aria-valuemin="0" aria-valuemax="100" style={{width: proteinPercentage>100?'100%':proteinPercentage+'%'}}>
                        {proteinPercentage}%
                    </div>
                </div>

                <h4>Calorie</h4>
                <p>{this.state.dailyAverageIntake.calorie}/{this.state.nutritionRequirements.calorie} kcal</p>
                <div className="progress">
                    <div className={this.renderProgressBarClass(caloriePercentage)} role="progressbar" aria-valuenow={caloriePercentage} aria-valuemin="0" aria-valuemax="100" style={{width: caloriePercentage>100?'100%':caloriePercentage+'%'}}>
                        {caloriePercentage}%
                    </div>
                </div>
            </div>
        )
                                        
    }

    renderCalorieAreaChart(){
        console.log(moment(Date()).endOf('month'))
        
    }


    render(){
        return(
            <div id="health-status-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Health Status of {this.props.user.profile.name}</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {/* <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="profile-status">
                                <h4>Name:{this.props.user.profile.name}</h4>
                                <h4>Age:{this.props.user.profile.age}</h4>
                                <h4>Height:{this.props.user.profile.height}cm</h4>
                                <h4>Weight:{this.props.user.profile.weight}kg</h4>
                            </div>
                        </div> */}

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="">
                                <h3>Average Daily Nutrition Intake</h3>
                                {this.renderAverageDailyIntake()}
                                
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <h3>Risk Evaluation</h3>
                            <ul>
                                <li><p className={this.state.dailyAverageIntake.calcium<this.state.nutritionRequirements.calcium?'text-danger':'text-success'}>Rickets</p></li>
                                <li><p className={this.state.dailyAverageIntake.calcium<this.state.nutritionRequirements.calcium?'text-danger':'text-success'}>Osteomalacia</p></li>
                                <li><p className={this.state.dailyAverageIntake.calcium<this.state.nutritionRequirements.calcium?'text-danger':'text-success'}>Leg Cramps</p></li>
                                <li><p className={this.state.dailyAverageIntake.calcium<this.state.nutritionRequirements.calcium?'text-danger':'text-success'}>High Blood Pressure</p></li>

                                <li><p className={this.state.dailyAverageIntake.protein<this.state.nutritionRequirements.protein?'text-danger':'text-success'}>Marasmus</p></li>
                                <li><p className={this.state.dailyAverageIntake.protein<this.state.nutritionRequirements.protein?'text-danger':'text-success'}v>Kwashiorkor</p></li>
                                <li><p className={this.state.dailyAverageIntake.protein<this.state.nutritionRequirements.protein?'text-danger':'text-success'}>Cachexia</p></li>
                                <li><p className={this.state.dailyAverageIntake.protein<this.state.nutritionRequirements.protein?'text-danger':'text-success'}>Chronic Kidney Failure</p></li>
                                <li><p className={this.state.dailyAverageIntake.protein<this.state.nutritionRequirements.protein?'text-danger':'text-success'}>Chronic Obstructive Pulmonary Disease</p></li>
                                <li><p className={this.state.dailyAverageIntake.protein<this.state.nutritionRequirements.protein?'text-danger':'text-success'}>Rheumatoid Arthritis</p></li>

                                <li><p className={this.state.dailyAverageIntake.fat<this.state.nutritionRequirements.fat?'text-danger':'text-success'}>Poor Vitamin Absorption</p></li>
                                <li><p className={this.state.dailyAverageIntake.fat<this.state.nutritionRequirements.fat?'text-danger':'text-success'}>Depression</p></li>
                                <li><p className={this.state.dailyAverageIntake.fat<this.state.nutritionRequirements.fat?'text-danger':'text-success'}>High Cholesterol</p></li>
                                <li><p className={this.state.dailyAverageIntake.fat<this.state.nutritionRequirements.fat?'text-danger':'text-success'}>Heart Disease</p></li>
                                <li><p className={this.state.dailyAverageIntake.fat<this.state.nutritionRequirements.fat?'text-danger':'text-success'}>Weight Loss</p></li>
                            </ul>
                        </div>
                    </div>


                    <div className="row">
                        {this.renderCalorieAreaChart()}
                    </div>
                </div>
            </div>
        )
    }
}