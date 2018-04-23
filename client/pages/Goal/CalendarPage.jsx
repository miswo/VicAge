import React from 'react';
import axios from 'axios';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class CalendarPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount(){
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
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div id="calendar">
                                <BigCalendar
                                    events={[]}
                                    startAccessor='startDate'
                                    endAccesspr='endDate'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}