import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default class ListAllListPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            featuredLists:[],
            lists:[]
        }
    }

    componentDidMount(){
        axios.get(this.props.serverURL+'/list/all')
            .then((res)=>{
                var featuredLists = [];
                var lists =[];
                for(var i=0;i<res.data.lists.length;i++){
                    if(res.data.lists[i].author ==='admin')
                        featuredLists.push(res.data.lists[i]);
                    else
                        lists.push(res.data.lists[i]);
                }
                this.setState({lists,featuredLists})
            })
    }


    renderLists(){
        
        const listRows = this.state.lists.length != 0?
            this.state.lists.map((item)=>(
                <NavLink key={item._id} to={"/list/detail/" + item._id} className="list-group-item"><strong>{item.listName}</strong></NavLink>
            ))
            :
            <a className="list-group-item">No List found</a>
        return listRows;
    }

    renderFeaturedLists(){
        console.log(this.state.featuredLists)
        const listRows = this.state.featuredLists.length != 0?
            this.state.featuredLists.map((item)=>(
                <NavLink key={item._id} to={"/list/detail/" + item._id} className="list-group-item"><strong><span className="glyphicon glyphicon-star"></span>{item.listName}</strong></NavLink>
            ))
            :
            <a className="list-group-item">No List found</a>
        return listRows;
    }
    

    
    render(){
        return(
            <div id="list-all-list-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Lists</h2>
                        <p className="lead">A list contains concepts that can help you to choose from, take a look of the lists below or create a list that suits your need.</p>
                    </div>
                </div>

                <div className="container">
                    <NavLink to="/list/create" className="btn btn-lg btn-primary create-list-button">Create New List</NavLink>
                    
                    <h3>Featured Lists</h3>
                    <div className="list-group">
                        {this.renderFeaturedLists()}
                    </div>
                    
                    <h3>Customize Lists</h3>
                    <div className="list-group">
                        {this.renderLists()}
                    </div>

                </div>
            
            </div>
        )
    }
}