import React from 'react';
import axios from 'axios';

var util = require('../../util/util');

export default class ProfilePage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            profile:this.props.user.profile
        }
    }

    componentDidMount(){
        // axios.get(this.props.serverURL+'/user/profile/'+this.props.user.id)
        // .then((res)=>{
        //     this.setState({
        //         profile:res.data.profile,
        //     })
        // })
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
        <div className="row">
            <div className="col-md-1">
                <div className="concept-block" id="NutriImg">
                    <p>Calcium</p>
                    <img src="http://d-ash.lolipop.jp/img/calcium.png" />
                    <h4>{nutritionRequirements.calcium}</h4>
                    <p>mg</p>
                </div>
            </div>

            <div className="col-md-1">
                <div className="concept-block" id="NutriImg">
                    <p>Fiber</p>
                    <img src="http://d-ash.lolipop.jp/img/fiber.png" />
                    <h4>{nutritionRequirements.fiber}</h4>
                    <p>g</p>
                </div>
            </div>

            <div className="col-md-1">
                <div className="concept-block" id="NutriImg">
                <p>Fat</p>
                        <img src="http://d-ash.lolipop.jp/img/fat.png" />
                        <h4>{nutritionRequirements.fat}</h4>
                    <p>g</p>
                </div>
            </div>

            <div className="col-md-1">
                <div className="concept-block" id="NutriImg">
                <p>Protein</p>
                <img src="http://d-ash.lolipop.jp/img/protein.png" />
                <h4>{nutritionRequirements.protein}</h4>
                <p>g</p>
                </div>
            </div>

            <div className="col-md-1">
                <div className="concept-block" id="NutriImg">
                    <p>Calorie</p>
                    <img src="http://d-ash.lolipop.jp/img/calorie.png" />
                    <h4>{nutritionRequirements.calorie}</h4>
                    <p>kcal</p>
                </div>
            </div>

        </div>

        return requirements;
    }

    render(){
        return(
            <div id="profile-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>{this.state.profile?this.state.profile.name + '\'s Profile':'Profile'}</h2>
                        <p>Set a profile.</p>
                    </div>
                </div>


                <div className="container">
                    <div className="row">

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="query-box">
                                <h3 id="decorationH3">Set Profile of Your Dependant</h3>
                                <form id="profileForm" className="form" onSubmit={this.onSubmitInputProfile.bind(this)}>

                                    <div className="row">
                                        <div className="form-group">
                                            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-3">
                                                <label htmlFor="input-name" className="pull-right">Name:</label>
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
                                            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-3">
                                                <label htmlFor="input-age" className="pull-right">Age:</label>
                                            </div>
                                            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                                <input required  value={this.state.profile?this.state.profile.age:''} 
                                                        onChange = {this.onValueChange.bind(this)} 
                                                        className="form-control query-input" 
                                                        type="number" 
                                                        id="input-age" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group">
                                            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-3">
                                            
                                                <label htmlFor="input-gender" className="pull-right">Gender:</label>
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
                                        <div className="col-xs-3 col-sm-3 col-md-2 col-lg-3">
                                    
                                            <label htmlFor="input-height" className="pull-right">Height:</label>
                                        </div>
                                        <div className="col-xs-9 col-sm-9 col-md-8 col-lg-8">
                                        
                                            <input required onChange = {this.onValueChange.bind(this)} 
                                                    value={this.state.profile?this.state.profile.height:''}  
                                                    className="form-control query-input" 
                                                    type="number" 
                                                    id="input-height" />
                                            <label>cm</label>
                                        </div>
                                    </div>
                                    </div>


                                    <div className="row">
                                        <div className="form-group">
                                            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-3">
                                                <label htmlFor="input-weight" className="pull-right">Weight:</label>
                                            </div>
                                            <div className="col-xs-9 col-sm-9 col-md-8 col-lg-8">
                                                <input required onChange = {this.onValueChange.bind(this)} 
                                                        value={this.state.profile?this.state.profile.weight:''} 
                                                        className="form-control query-input" 
                                                        type="number" 
                                                        id="input-weight" />

                                                <label>kg</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group">
                                            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-3">
                                        
                                                <label htmlFor="input-active-level" className="pull-right">Active Level:</label>
                                            </div>
                                            <div className="col-xs-9 col-sm-9 col-md-6 col-lg-6">
                                                <select required onChange = {this.onValueChange.bind(this)} 
                                                        value={this.state.profile?this.state.profile.activeLevel:''}
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


                                    <div className="row">
                                        <div className="form-group">
                                            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-3">
                                           
                                            </div>
                                            <div className="col-xs-9 col-sm-9 col-md-8 col-lg-8" id="saveProfile">
                                            <button type="submit" className="btn btn-primary" id="BtnSaveProfile">Save Profile</button>
                                            </div>
                                        </div>
                                    </div>

                                   
                                </form>                        
                            </div>
                        </div>



                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="query-box">
                                <h3 id="NutritionH3">Nutrition Requirement</h3>
                                <div className="container" id="nutritionReq">
                                    {this.renderNutritionRequirement()}
                                </div>
                                <div className="box19">
                                    <p>*This table of figures may be used to determine the daily nutrition intake a dependant of a carer requires.</p>
                                </div>
                            </div>
                        </div>
                                            
                    </div>
                </div>
            </div>
        )
    }
}