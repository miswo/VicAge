import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default class ListAllConceptListPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            lists:[]
        }
    }

    componentDidMount(){
        axios.get(this.props.serverURL+'/concept/list/all')
            .then((res)=>{
            this.setState({lists:res.data.lists})
            console.log(this.state);
        })
    }


    renderLists(){
        
        const listRows = this.state.lists?
            this.state.lists.map((item)=>(
                <tr key = {item._id}>
                    <td>{item.listName}</td>
                    <td><NavLink to={"/concept/list/" + item._id} className="btn btn-default">Details</NavLink></td>
                </tr>
            ))
            :<tr><td>No list found...</td></tr>

        return listRows;
    }

    
    render(){
        return(
            <div id="list-all-list-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Lists</h2>
                    </div>
                </div>

                <div className="container">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>List Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderLists()}
                        </tbody>
                    </table>
                </div>
            
            </div>
        )
    }
}