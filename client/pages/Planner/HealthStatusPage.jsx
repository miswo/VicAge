import React from 'react';
import axios from 'axios';



export default class HealthStatusPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mealPlans:[]
        }
    }

    componentDidMount(){
        axios.post(this.props.serverURL + '/planner/meal-plans',{userid:this.props.user.id,profileid:this.props.user.profile.id})
        .then((res)=>{
            var mealPlans = res.data.mealPlans;
            
            this.setState({mealPlans:res.data.mealPlans})
            console.log(this.state);
        })
    }

    render(){
        return(
            <div id="health-status-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Health Status of ********</h2>
                    </div>
                </div>
            

                <div className="container">

                </div>
            </div>
        )
    }
}