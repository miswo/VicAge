import React from 'react';
import axios from 'axios';


export default class ProfilePage extends React.Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        axios.get(this.props.serverURL+'/user/profile/'+this.props.user.id)
        .then((res)=>{
            this.setState({
                profile:res.data.profile
            })
        })
    }

    onSubmitInputProfile(e){
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
        
        axios.post(this.props.serverURL + '/user/profile',{
            _id:this.props.user.id,
            profile:{age,gender,weight,height,activeLevel}
        })
        .then((res)=>{
            if(res.data.status == 200)
                alert('Profile have been saved');
        })

    }

    onValueChange(e){
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

        this.setState({
            profile:{age,gender,weight,height,activeLevel}
        })
    }

    render(){
        var profile = this.state.profile?this.state.profile:null
        return(
            <div id="profile-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Profile</h2>
                        <p>Set a profile.</p>
                    </div>
                </div>


                <div className="container">
                    <div className="query-box">
                            <h3>Set Profile of Your Dependant</h3>
                            <form className="form" onSubmit={this.onSubmitInputProfile.bind(this)}>
                                
                                <div className="row">
                                    <div className="form-group">
                                        <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
                                            <label htmlFor="input-age">Age:</label>
                                        </div>
                                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                            <input required  value={this.state.profile?this.state.profile.age:undefined} 
                                                    onChange = {this.onValueChange.bind(this)} 
                                                    className="form-control query-input" 
                                                    type="number" 
                                                    id="input-age" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group">
                                        <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
                                        
                                            <label htmlFor="input-gender">Gender:</label>
                                        </div>
                                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                            <select required  onChange = {this.onValueChange.bind(this)} 
                                                    value={this.state.profile?this.state.profile.gender+'':undefined}
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
                                    <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
                                
                                        <label htmlFor="input-height">Height:</label>
                                    </div>
                                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                    
                                        <input required onChange = {this.onValueChange.bind(this)} 
                                                value={this.state.profile?this.state.profile.height:undefined}  
                                                className="form-control query-input" 
                                                type="number" 
                                                id="input-height" />
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
                                            <input required onChange = {this.onValueChange.bind(this)} 
                                                    value={this.state.profile?this.state.profile.weight:undefined} 
                                                    className="form-control query-input" 
                                                    type="number" 
                                                    id="input-weight" />

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
                                        <select required onChange = {this.onValueChange.bind(this)} 
                                                value={this.state.profile?this.state.profile.activeLevel+'':undefined}
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
            </div>
        )
    }
}