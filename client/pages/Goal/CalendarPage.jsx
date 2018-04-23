import React from 'react';
import axios from 'axios';



export default class CalendarPage extends React.Component{

    constructor(props){
        super(props);
        this.state={

        }
    }


    render(){
        return(
            <div id="calendar-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Calendar</h2>
                        <p>Set and View Your Goals Here.</p>
                    </div>
                </div>



                <div className="container">
                
                </div>
            </div>
        )
    }
}