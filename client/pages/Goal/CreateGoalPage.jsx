import React from 'react';
import axios from 'axios';


export default class CreateGoalPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            concept:this.props.concept
        }
    }

    componentWillReceiveProps(props){
        this.setState({concept:props.concept})
    }

    handleSubmit(e){
        e.preventDefault();
        var startDate = document.getElementById('startDate').value;
        var endDate = document.getElementById('endDate').value;
        if(startDate > endDate)
            return alert('Ending date is earlier than Starting date');
        var newGoal = {
            title:document.getElementById('title').value,
            concept:this.state.concept,
            startDate:startDate,
            endDate:endDate,
            type:'Activity',
            desc:document.getElementById('desc').value,
            userid:this.props.user.id
        }
        axios.post(this.props.serverURL+'/goal/create',newGoal)
            .then((res)=>{
                if(res.data.status == 200){
                    $('#create-goal-modal').modal('hide');
                    alert("New Activity Plan Added!")
                }
                this.props.callback(newGoal);
            })
    }

    render(){
        return(
            <div id="create-goal-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Add Activity Plan</h2>
                    </div>
                </div>

                <div className="container">
                    <form className="form" onSubmit={this.handleSubmit.bind(this)}>

                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="title">Goal</label>
                                    <input className="form-control" id="title" required value={this.state.concept? this.state.concept.conceptName:''} type="text"/>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="startDate">Start Date</label>
                                    <input className="form-control" id="startDate" required type="date"/>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="endDate">End Date</label>
                                    <input className="form-control" id="endDate" required  type="date"/>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="desc">Description</label>
                                    <input className="form-control" id="desc" type="text"/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <button type="submit" className="btn btn-primary">Add New Activity Plan</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


}