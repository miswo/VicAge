import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';


export default class LoginPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
        }
    }

    onSubmit(e){
        e.preventDefault();
        var md5 = require('md5');
        var userName = document.getElementById('email').value;
        var password = md5(document.getElementById('password').value);
        var repeatPassword = md5(document.getElementById('repeat-password').value);

        if(!(password === repeatPassword)) return alert('Repeat password is not the same with password.')

        axios.post(this.props.serverURL + '/user/register',{userName,password})
        .then((res)=>{
            if(res.data.status == 200){
                this.props.callback(res.data.data);
                this.props.history.push('/home');
            }
            else
                alert(res.data.message)
        })

    }

    render(){
        return(
            <div id="login-page">
                <div className="container">

                    <div className="login-form">
                        <form className="form" onSubmit={this.onSubmit.bind(this)}>
                            <h3>Register</h3>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input required id="email" type="email" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-password">Password:</label>
                                <input required id="password" type="password" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="repeat-password">Repeat Password:</label>
                                <input required id="repeat-password" type="password" className="form-control"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                            <NavLink to="/login" className="btn btn-default">Go to Login</NavLink>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}