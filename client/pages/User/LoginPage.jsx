import React from 'react';
import axios from 'axios';



export default class LoginPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
        }
    }

    onSubmit(e){
        e.preventDefault();
        var md5 = require('md5');
        var userName = document.getElementById('userName').value;
        var password = md5(document.getElementById('password').value);

        axios.post(this.props.serverURL + '/user/login',{userName,password})
        .then((res)=>{
            if(res.data.status == 200){
                this.props.callback(res.data.data);
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
                            <h3>Welcome to VicAge!</h3>
                            <div className="form-group">
                                <label htmlFor="user-name">User:</label>
                                <input required id="userName" type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-password">Password:</label>
                                <input required id="password" type="password" className="form-control"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                            <NavLink to="register" className="btn btn-primary">Register</NavLink>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}