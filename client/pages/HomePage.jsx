import React from 'react';
import {Link} from 'react-router-dom';

import {PieChart,Pie,Cell,Label} from 'recharts';


export default class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            postcode:''
        }
    }

    handleInputChange(e){
        this.setState({postcode:e.target.value})
    }
    
    handleSubmit(e){
        e.preventDefault();
        if(this.state.postcode.match('[0-9]{4}')){
            document.getElementById('feedback').innerText = "";
            this.props.history.push('/service/'+ this.state.postcode);
        }
        else
            document.getElementById('feedback').innerText = "Please enter correct post code."

    }

    render(){
        var not_meet_physical_activity_guidelines = [{'name':'A','value':4},
                                                     {'name':'B','value':96}]
        var need_help_for_core_activiti = [{'name':'A','value':5},
                                        {'name':'B','value':95}]
        var over_75_lives_alone = [{'name':'A','value':35.9},
                                    {'name':'B','value':64.1}]
        return(
            <div id="homepage">
                <div className="jumbotron banner">
                    <div className="container">
                        <div className="caption">
                            <h1>VicAge</h1>
                            <p className="lead">There are services in your community that are going to help you taking care of people</p>
                            

                            <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <input required className="input-lg" placeholder="Post Code" onChange={this.handleInputChange.bind(this)}/> 
                                    <button type = "submit" className="btn btn-primary btn-lg" >Find out more</button>
                                </div>
                            </form>

                            <p id="feedback"></p>
                            
                        </div>
                        
                    </div>
                </div>

                <div className="container">
                    <div className="facts">
                        <div className="row">
                            <h2>Do you know in Victoria:</h2>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <div className="fact-block">
                                    <PieChart width={300} height={300}>
                                        <Pie data={not_meet_physical_activity_guidelines} dataKey="value" nameKey="name" >
                                            <Label value="4%" position="center" fill="#fff" />
                                            <Cell fill="#8884d8"/>
                                        </Pie>
                                    </PieChart>
                                    <p className="lead">People with severe disability living in the community</p>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <div className="fact-block">
                                    <PieChart width={300} height={300}>
                                        <Pie data={need_help_for_core_activiti} dataKey="value" nameKey="name" >
                                            <Label value="5%" position="center" fill="#fff" />
                                            <Cell fill="#00C49F"/>
                                        </Pie>
                                    </PieChart>
                                    <p className="lead">People with need for assistance with core activity.</p>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <div className="fact-block">
                                    <PieChart width={300} height={300}>
                                        <Pie data={over_75_lives_alone} dataKey="value" nameKey="name" >
                                            <Label value="35.9%" position="center" fill="#fff" />
                                            <Cell fill="#FF8042"/>
                                        </Pie>
                                    </PieChart>
                                    <p className="lead">People aged over 75 years who live alone</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    


                </div>
            </div>
        )
    }
}
