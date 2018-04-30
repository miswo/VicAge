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
            infoReady:false

        }
    }

    onSubmitInputAge(e){
        e.preventDefault();
        var age = document.getElementById('input-age').value;
        age = parseInt(Math.round(age));
        var gender = document.getElementById('input-gender').value;

        var weight = document.getElementById('input-weight').value;
        weight = parseInt(Math.round(weight));


        var calcium = '';
        if(age<0 || age >=150)
            return alert("Please enter a correct age.")
        if(weight<=0 || weight>= 500)
            return alert('Please enter a correct weight.')
        
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
        else
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


        
        this.setState({calcium,fiber,fat,protein});
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
                    <div className="text-center query-box">
                        <h3>Find out the Nutrition Requirement</h3>
                        <form className="form" onSubmit={this.onSubmitInputAge.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="input-age">Age:</label>
                                <input required className="form-control query-input" type="number" id="input-age" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="input-gender">Gender:</label>
                                <select required className="form-control query-input" name="input-gender" id="input-gender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="input-eeight">Weight:</label>
                                <input required className="form-control query-input" type="number" id="input-weight" />
                                <label>KG</label>
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
                </div>


                <div className="container">
                    <div className="text-center">
                        <NavLink to="" className="btn btn-primary">Next--Find out Exercise Requirement </NavLink>
                    </div>
                </div>

            </div>


        )
    }
}