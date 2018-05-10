import React from 'react';
import axios from 'axios';
import moment from 'moment';
import util from '../../util/util';
import {AreaChart,XAxis,YAxis,CartesianGrid,Tooltip,Area,Legend} from 'recharts';





export default class HealthStatusPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mealPlans:[],
            exercisePlans:[],
            nutritionRequirements:{},
            dailyAverageIntake:{},
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
                <h4><img src="http://d-ash.lolipop.jp/img/calcium.png" width="30px"/> Calcium</h4>
                <p>{this.state.dailyAverageIntake.calcium}/{this.state.nutritionRequirements.calcium} mg</p>
                <div className="progress">
                    <div className={this.renderProgressBarClass(calciumPercentage)} role="progressbar" aria-valuenow={calciumPercentage} aria-valuemin="0" aria-valuemax="100" style={{width: calciumPercentage>100?'100%':calciumPercentage+'%'}}>
                        {calciumPercentage}%
                    </div>
                </div>


                <h4><img src="http://d-ash.lolipop.jp/img/fiber.png" width="30px"/> Fiber</h4>
                <p>{this.state.dailyAverageIntake.fiber}/{this.state.nutritionRequirements.fiber} g</p>
                <div className="progress">
                    <div className={this.renderProgressBarClass(fiberPercentage)} role="progressbar" aria-valuenow={fiberPercentage} aria-valuemin="0" aria-valuemax="100" style={{width: fiberPercentage>100?'100%':fiberPercentage+'%'}}>
                        {fiberPercentage}%
                    </div>
                </div>


                <h4><img src="http://d-ash.lolipop.jp/img/fat.png" width="30px"/>  Fat</h4>
                <p>{this.state.dailyAverageIntake.fat}/{this.state.nutritionRequirements.fat} g</p>
                <div className="progress">
                    <div className={this.renderProgressBarClass(fatPercentage)} role="progressbar" aria-valuenow={fatPercentage} aria-valuemin="0" aria-valuemax="100" style={{width: fatPercentage>100?'100%':fatPercentage+'%'}}>
                        {fatPercentage}%
                    </div>
                </div>


                <h4><img src="http://d-ash.lolipop.jp/img/protein.png" width="30px"/> Protein</h4>
                <p>{this.state.dailyAverageIntake.protein}/{this.state.nutritionRequirements.protein} g</p>
                <div className="progress">
                    <div className={this.renderProgressBarClass(proteinPercentage)} role="progressbar" aria-valuenow={proteinPercentage} aria-valuemin="0" aria-valuemax="100" style={{width: proteinPercentage>100?'100%':proteinPercentage+'%'}}>
                        {proteinPercentage}%
                    </div>
                </div>

                <h4><img src="http://d-ash.lolipop.jp/img/calorie.png" width="30px"/> Calorie</h4>
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
        var dateNumber = moment().endOf('month').date();
        var calorieIntake = [];
        var calorieBurn = [];
        var basicCalorieBurn = this.state.nutritionRequirements.calorie / this.props.user.profile.activeLevel * 1.2;

        for(var i=0;i<dateNumber;i++){
            calorieIntake.push(0);
            calorieBurn.push(basicCalorieBurn);
        }

        for(var i=0;i<this.state.mealPlans.length;i++){
            var date = moment(this.state.mealPlans[i].date).date();
            calorieIntake[date] += this.state.mealPlans[i].recipe.Energy * this.state.mealPlans[i].quantity / 100;
        }

        for(var i=0;i<dateNumber;i++){
            if(calorieIntake[i] == 0)
                calorieIntake[i] = this.state.dailyAverageIntake.calorie;
        }

        for(var i=0;i<this.state.exercisePlans.length;i++){
            var date = moment(this.state.exercisePlans[i].date).date();
            calorieBurn[date] += this.state.exercisePlans[i].exercise.CalorieBurnt * this.state.exercisePlans[i].quantity * this.props.user.profile.weight /10 /10 ;
        }
        var data = [];

        for(var i=0;i<dateNumber;i++){
            data.push({
                Date:i+1,
                Intake:Math.round(calorieIntake[i]*100)/100,
                Burn:Math.round(calorieBurn[i]*100)/100
            })
        }


        var width = document.getElementById('chart-wrapper')?document.getElementById('chart-wrapper').offsetWidth:1080;
        return(
            <AreaChart width={width} height={400} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
            <XAxis dataKey="Date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend verticalAlign="top" height={36}/>
            <Tooltip />
            <Area type="monotone" dataKey="Intake"  stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="Burn"    stroke="#82ca9d"   fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        )
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
                                <h3 className="MonitorTitles">Average Daily Nutrition Intake</h3>
                                {this.renderAverageDailyIntake()}
                                
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" id="monitorDesease">
                            <h3 className="MonitorTitles">Risk Evaluation <img src="http://d-ash.lolipop.jp/img/traffic.png" width="50px" /></h3>
                            <ul>
                                <li><p className={this.state.dailyAverageIntake.calcium<this.state.nutritionRequirements.calcium?'text-danger':'text-success'}>Rickets</p></li>
                                <li><p className={this.state.dailyAverageIntake.calcium<this.state.nutritionRequirements.calcium?'text-danger':'text-success'}>Osteomalacia</p></li>
                                <li><p className={this.state.dailyAverageIntake.calcium<this.state.nutritionRequirements.calcium?'text-danger':'text-success'}>Leg Cramps</p></li>
                                <li><p className={this.state.dailyAverageIntake.calcium<this.state.nutritionRequirements.calcium?'text-danger':'text-success'}>High Blood Pressure</p></li>

                                <li><p className={this.state.dailyAverageIntake.protein<this.state.nutritionRequirements.protein?'text-danger':'text-success'}>Marasmus</p></li>
                                <li><p className={this.state.dailyAverageIntake.protein<this.state.nutritionRequirements.protein?'text-danger':'text-success'}>Kwashiorkor</p></li>
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
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <h4 className="MonitorTitles">Monthly Calorie Chart</h4>
                            <div id="chart-wrapper">
                                {this.renderCalorieAreaChart()}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}