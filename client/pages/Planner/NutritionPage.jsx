import React from 'react';
import {NavLink} from 'react-router-dom';


export default class NutritionPage extends React.Component{

    constructor(props){
        super(props);

        this.state={
            age:NaN,
            calcium:'',
            fiber:'',
            fat:'',
            protein:'',
            calorie:''

        }
    }

    onSubmitInputQuery(e){
        e.preventDefault();
        var age = document.getElementById('input-age').value;
        age = parseInt(Math.round(age));
        var gender = document.getElementById('input-gender').value;

        var weight = document.getElementById('input-weight').value;
        weight = parseInt(Math.round(weight));

        var height = document.getElementById('input-height').value;
        height = parseInt(Math.round(height));

        var activeLevel = document.getElementById('input-active-level').value;
        activeLevel = parseFloat(activeLevel);


        if(age<0 || age >=150)
            return alert("Please enter a correct age.")
        if(weight<=0 || weight>= 500)
            return alert('Please enter a correct weight.')
        if(height<=0 || height>= 300)
        return alert('Please enter a correct height.')
        

        var calcium = '';
        if(age>=71)
            calcium = '1200mg ~ 2000mg';
        else if(age >=51 && gender ==='female')
            calcium = '1200mg ~ 2000mg';
        else if(age >=51 && gender ==='male')
            calcium = '1000mg ~ 2000mg';
        else if(age >= 19)
            calcium = '1000mg ~ 2500mg';
        else if(age >= 9)
            calcium = '1300mg ~ 3000mg';
        else if(age >= 4)
            calcium = '1000mg ~ 2500mg';
        else if(age >= 1)
            calcium = '700mg ~ 2500mg';
        else 
            calcium = '260mg ~ 1500mg'


        var fiber = '';
        if(gender === 'male')
            if(age>=51)
                fiber='30g';
            else
                fiber='38g';
        if(gender === 'female')
            if(age>=51)
                fiber= '21g';
            else    
                fiber= '25g';

        var fat = '';
        if(age >20)
            fat = '20~35g';
        else if (age>4)
            fat = '30~35g';
        else 
            fat = '40g';

        var protein ='';
        protein = Math.round(weight * 0.8,2) + 'g';

        var bmr = 0;

        if(gender ==='male')
            bmr = 10 * weight + 6.25 * height - 5 * age +5;
        if(gender ==='female')
            bmr = 10 * weight  + 6.25 * height - 5* age -161;

        var calorie = Math.round(bmr * activeLevel,2) + 'kcal';

        this.setState({calcium,fiber,fat,protein,calorie});
    }


    render(){
        return(
            <div id="nutrition-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Nutrtions Requirement</h2>
                        <p>Input age to check nutrion requirements </p>
                    </div>
                </div>


                <div className="container">
                    <div className="query-box">
                        <h3>Find out the Nutrition Requirement</h3>
                        <form className="form" onSubmit={this.onSubmitInputQuery.bind(this)}>
                            
                            <div className="row">
                                <div className="form-group">
                                    <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
                                        <label htmlFor="input-age">Age:</label>
                                    </div>
                                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                        <input required className="form-control query-input" type="number" id="input-age" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group">
                                    <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
                                    
                                        <label htmlFor="input-gender">Gender:</label>
                                    </div>
                                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                        <select required className="form-control query-input" name="input-gender" id="input-gender">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                            <div className="form-group">
                                <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
                            
                                    <label htmlFor="input-height">Height:</label>
                                </div>
                                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                
                                    <input required className="form-control query-input" type="number" id="input-height" />
                                    <label>cm</label>
                                </div>
                            </div>
                            </div>


                            <div className="row">
                                <div className="form-group">
                                    <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
                                        <label htmlFor="input-weight">Weight:</label>
                                    </div>
                                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                        <input required className="form-control query-input" type="number" id="input-weight" />
                                        <label>kg</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                            <div className="form-group">
                                <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
                            
                                    <label htmlFor="input-active-level">Active Level:</label>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <select required className="form-control query-input" name="input-active-level" id="input-active-level">
                                        <option value="1.2">No Exercise</option>
                                        <option value="1.375">  Exercise 1-3 Days a Week</option>
                                        <option value="1.55">   Exercise 3-5 Days a Week</option>
                                        <option value="1.725">  Exercise 6-7 Days a Week</option>
                                    </select>
                                </div>
                            </div>
                            </div>

                            <button type="submit" className="btn btn-primary">Get Nutrition Requirement</button>
                        </form>                        
                    </div>

                    <h3>Nutrition Daily Requirement:</h3>
                    <h4>Calcium:</h4>
                        <p>{this.state.calcium}</p>
                    <h4>Fiber:</h4>
                        <p>{this.state.fiber}</p>
                    <h4>Fat:</h4>
                        <p>{this.state.fat}</p>
                    <h4>Protein:</h4>
                        <p>{this.state.protein}</p>
                    <h4>Calorie Baseline:</h4>
                        <p>{this.state.calorie}</p>
                </div>


                <div className="container">
                    <div className="text-center">
                        <NavLink to="/planner" className="btn btn-primary">Next--Make Plans to Get Healthier</NavLink>
                    </div>
                </div>

            </div>


        )
    }
}