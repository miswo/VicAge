import React from 'react';
import axios from 'axios';


export default class ViewEventPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            event:{
                name:"No such event",
                date:"1970-1-1"
            }
        }
    }

    componentDidMount(){
        axios.get(this.props.serverURL + '/event/' + this.props.eventID)
            .then((res)=>{console.log(res);this.setState({
                event:{
                    name:res.data.name,
                    date:new Date(res.data.date).toLocaleDateString()
                }
            })});
    }

    render(){
        return(
            <div id="view-event-page">
                <div className="jumbotron">
                    <div className="container">
                        <h2>{this.state.event.name}</h2>
                        <p>{this.state.event.date}</p>
                    </div>
                </div>
            </div>
        )
    }


}