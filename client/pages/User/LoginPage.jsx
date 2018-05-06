import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom'


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

        axios.post(this.props.serverURL + '/user/login',{userName,password})
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
                
                    <div className="login-form">
                        <form className="form" onSubmit={this.onSubmit.bind(this)}>
                    <div className="text-center" id="loginWelcome">
                        <img src="https://s3-ap-southeast-2.amazonaws.com/vicage-image/5abf1ada26dc6202b31ca2aa.png" alt="" width="72" height="72" />
                       
                            <h3>Welcome to VicAge!</h3>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="loginLabel">Email:</label>
                                <input required id="email" type="email" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-password" className="loginLabel">Password:</label>
                                <input required id="password" type="password" className="form-control"/>
                            </div>

                            <button type="submit" className="btn btn-lg btn-primary" id="Btnlogin">Login</button>
                            <NavLink to="/register" className="btn btn-lg btn-warning">Register</NavLink>
                        </form>
                    </div>
                
            </div>
        )
    }
}