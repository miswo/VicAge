import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default class ListAllListPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            lists:[]
        }
    }

    componentDidMount(){
        axios.get(this.props.serverURL+'/list/all')
            .then((res)=>{
            this.setState({lists:res.data.lists})
        })
    }


    renderLists(){
        
        const listRows = this.state.lists?
            this.state.lists.map((item)=>(
                <tr key = {item._id}>
                    <td>{item.listName}</td>
                    <td><NavLink to={"/list/detail/" + item._id} className="btn btn-default">Details</NavLink></td>
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
                        <p className="lead">A list contains concepts that can help you to choose from, take a look of the lists below or create a list that suits your need.</p>
                        <NavLink to="/list/create" className="btn btn-primary">Create New List</NavLink>
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