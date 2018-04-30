import React from 'react';
import axios from 'axios';


export default class PlannerPage extends React.Component{

    constructor(props){
        super(props);
        this.state={

        }
    }


    render(){
        return(
            <div id="planner-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Planner</h2>
                        <p>Make the Diary and Excersies Plan.</p>
                    </div>
                </div>
            
            </div>
        )
    }
}
