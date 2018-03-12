import React from 'react';

import {Link} from 'react-router-dom';

export default class ListEventPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {"events":[]};
    }

    componentDidMount(){
        fetch(this.props.serverURL + '/event')
            .then(res => res.json())
            .then((res) => this.setState({"events":res.events}));
    }

    renderEvents(){
        const eventItems = this.state.events.length !== 0? this.state.events.map((event)=>
            <tr key={event._id}>
                <td>{event._id}</td>
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
            </tr>
        ):<tr><td>No event found.</td></tr>;

        return eventItems;
    }

    render(){
        return(
            <div id="list-event-page">
                <div className="jumbotron">
                    <div className="container">
                        <h2>Events</h2>
                        <p>Decide what activity should be held for each event.</p>
                        <div className="btn-group">
                            <Link to="/event/create" className="btn btn-primary">Create Event</Link>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Event Name</th>
                                <th>Event Date</th>
                            </tr>

                        </thead>
                        <tbody>
                          {this.renderEvents()}
                        </tbody>
                    </table>
                
                </div>

            </div>

        )
    }
}