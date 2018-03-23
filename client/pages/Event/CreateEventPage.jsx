import React from 'react';
import {Link,Redirect} from 'react-router-dom';

import axios from 'axios';


export default class CreateEventPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:"",
            date:null
        }
    }

    handleNameChange(e){
        this.setState({name:e.target.value});
    }

    handleDateChange(e){
        this.setState({date:e.target.value});
    }

    handleFormSubmit(e){
        e.preventDefault();
        axios.post(this.props.serverURL + '/event/create',{
            name:this.state.name,
            date:new Date(this.state.date)
        })
        .then((res)=>{
            if(res.data.result == 'ok')
                // window.location.href='/event/' + res.data._id;
                this.props.history.push('/event/'+ res.data._id);
            else
                alert('Something is wrong');
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    render(){
        return(
            <div id="creat-event-page">
                <div className="jumbotron">
                    <div className="container">
                        <h2>Create Event test</h2>
                    </div>
                </div>


                <div className="container">
                    <form name='create-event' onSubmit={this.handleFormSubmit.bind(this)}>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="event-name">Event Name:</label>
                                    <input type="text" className="form-control" id="event-name" onChange={this.handleNameChange.bind(this)}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="event-date">Event Date:</label>
                                    <input type="date" className="form-control" id="event-data" onChange={this.handleDateChange.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        


                        <input type="submit" value="create" className="btn btn-primary"/>
                        <Link to='/event' className="btn btn-default">Back</Link>

                    </form>
                </div>
            </div>

        )
        
    }
}