import React from 'react';
import axios from 'axios';

export default class DetailListPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:{}
        }
    }


    componentDidMount(){
        console.log(this.props.history);
        axios.get(this.props.serverURL + '/list/detail/'+ this.props.history)    
    }

    
    render(){
        return(
            <div id="detail-list-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>{this.state.list.listName? this.state.list.listName :"List Detail"}</h2>
                        <p>List Detail</p>
                    </div>
                </div>
            </div>
        )
    }
}