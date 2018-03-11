import React from 'react';

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
                <td>{new Date(event.createDate).toLocaleDateString()}</td>
            </tr>
        ):<tr><td>No event found.</td></tr>;

        return eventItems;
    }


    render(){
        return(
            <div id="list-event-page">
                <div className="jumbotron">
                    <div className="container">
                        <h2>All events are list below:</h2>
                    </div>
                </div>

                <div className="container">
                    <h3>Events</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Event Name</th>
                                <th>Create Date</th>
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