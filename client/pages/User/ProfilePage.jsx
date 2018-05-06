import React from 'react';
import axios from 'axios';

var util = require('../../util/util');

export default class ProfilePage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            profile:{},
        }
    }

    componentDidMount(){
        axios.get(this.props.serverURL+'/user/profile/'+this.props.user.profile.id)
        .then((res)=>{
            this.setState({
                profile:res.data.profile,
            })
        })
    }

    onSubmitInputProfile(e){
        e.preventDefault();

        var name = document.getElementById('input-name').value;
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
        
        var profile = {name,age,gender,weight,height,activeLevel};
        profile.id = this.props.user.profile.id;
        axios.post(this.props.serverURL + '/user/profile',{
            _id:this.props.user.id,
            profile
        })
        .then((res)=>{
            if(res.data.status == 200){
                var user = this.props.user;
                user.profile = profile;
                this.props.dataTransfer({user});
                alert('Profile Change Saved.')
            }
        })

    }

    onValueChange(e){
        e.preventDefault();

        var name = document.getElementById('input-name').value;

        var age = document.getElementById('input-age').value;
        age = parseInt(Math.round(age));

        var gender = document.getElementById('input-gender').value;
        var weight = document.getElementById('input-weight').value;
        weight = parseInt(Math.round(weight));

        var height = document.getElementById('input-height').value;
        height = parseInt(Math.round(height));

        var activeLevel = document.getElementById('input-active-level').value;
        activeLevel = parseFloat(activeLevel);

        this.setState({
            profile:{name,age,gender,weight,height,activeLevel}
        })
    }

    renderNutritionRequirement(){
        var profile = this.state.profile;
        var nutritionRequirements = util.NutritionRequirementCalculator(profile.age,
                                                                        profile.gender,
                                                                        profile.height,
                                                                        profile.weight,
                                                                        profile.activeLevel);
        
        const requirements =
        <div>
            <p>Calcium: {nutritionRequirements.calcium} mg</p>
            <p>Fiber: {nutritionRequirements.fiber} g</p>
            <p>Fat: {nutritionRequirements.fat} g</p>
            <p>Protein: {nutritionRequirements.protein} g</p>
            <p>Calorie: {nutritionRequirements.calorie} kcal</p>

        </div>

        return requirements;
    }

    render(){
        return(
            <div id="profile-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>{this.state.profile.name?this.state.profile.name + '\'s Profile':'Profile'}</h2>
                        <p>Set a profile.</p>
                    </div>
                </div>


                <div className="container">
                    <div className="row">

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="query-box">
                                <h3>Set Profile of Your Dependant</h3>
                                <form className="form" onSubmit={this.onSubmitInputProfile.bind(this)}>

                                    <div className="row">
                                        <div className="form-group">
                                            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-2">
                                                <label htmlFor="input-name">Name:</label>
                                            </div>
                                            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                                <input required  value={this.state.profile?this.state.profile.name:''} 
                                                        onChange = {this.onValueChange.bind(this)} 
                                                        className="form-control query-input" 
                                                        type="text" 
                                                        id="input-name" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group">
                                            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-2">
                                                <label htmlFor="input-age">Age:</label>
                                            </div>
                                            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                                <input required  value={this.state.profile?this.state.profile.age:0} 
                                                        onChange = {this.onValueChange.bind(this)} 
                                                        className="form-control query-input" 
                                                        type="number" 
                                                        id="input-age" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group">
                                            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-2">
                                            
                                                <label htmlFor="input-gender">Gender:</label>
                                            </div>
                                            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                                <select required  onChange = {this.onValueChange.bind(this)} 
                                                        value={this.state.profile?this.state.profile.gender:''}
                                                        className="form-control query-input" 
                                                        name="input-gender" 
                                                        id="input-gender">
                                                    <option value="male" >Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                    <div className="form-group">
                                        <div className="col-xs-3 col-sm-3 col-md-2 col-lg-2">
                                    
                                            <label htmlFor="input-height">Height:</label>
                                        </div>
                                        <div className="col-xs-9 col-sm-9 col-md-8 col-lg-8">
                                        
                                            <input required onChange = {this.onValueChange.bind(this)} 
                                                    value={this.state.profile?this.state.profile.height:0}  
                                                    className="form-control query-input" 
                                                    type="number" 
                                                    id="input-height" />
                                            <label>cm</label>
                                        </div>
                                    </div>
                                    </div>


                                    <div className="row">
                                        <div className="form-group">
                                            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-2">
                                                <label htmlFor="input-weight">Weight:</label>
                                            </div>
                                            <div className="col-xs-9 col-sm-9 col-md-8 col-lg-8">
                                                <input required onChange = {this.onValueChange.bind(this)} 
                                                        value={this.state.profile?this.state.profile.weight:0} 
                                                        className="form-control query-input" 
                                                        type="number" 
                                                        id="input-weight" />

                                                <label>kg</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group">
                                            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-2">
                                        
                                                <label htmlFor="input-active-level">Active Level:</label>
                                            </div>
                                            <div className="col-xs-9 col-sm-9 col-md-6 col-lg-6">
                                                <select required onChange = {this.onValueChange.bind(this)} 
                                                        value={this.state.profile?this.state.profile.activeLevel:0}
                                                        className="form-control query-input" 
                                                        name="input-active-level" 
                                                        id="input-active-level">
                                                    <option value="1.2">No Exercise</option>
                                                    <option value="1.375">Exercise 1-3 Days a Week</option>
                                                    <option value="1.55">Exercise 3-5 Days a Week</option>
                                                    <option value="1.725">Exercise 6-7 Days a Week</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Save Profile</button>
                                </form>                        
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="query-box">
                                <h3>Nutrition Requirement</h3>
                                {this.renderNutritionRequirement()}
                            </div>

                        </div>

                                            
                    </div>

                </div>
            </div>
        )
    }
}