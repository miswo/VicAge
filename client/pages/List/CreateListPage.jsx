import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import CreateConceptPage from '../Concept/CreateConceptPage';

const AddConcept = () =>(
    <div className="col-sm-6 col-md-4 col-lg-4" data-toggle="modal" data-target="#create-concept-modal">
        <div className="add-concept-widget">
            <span className="glyphicon glyphicon-plus" > </span>
        </div>
    </div>
);

const DeleteConcept = ()=>(
    <div className="col-sm-6 col-md-4 col-lg-4">
        <div className="delete-concept-widget">
            <span className="glyphicon glyphicon-minus"> </span>
        </div>
    </div>
);



export default class CreateListPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            listName:'',
            concepts:[],
        };
    }

    renderConcepts(){
        const conceptBlocks = this.state.concepts? this.state.concepts.map((item)=>(
            <div key={item.id} className="col-sm-6 col-md-4 col-lg-4">
                <div className="concept-block"> 
                    <img src={item.imgUrl} alt={item.conceptName} />
                    <h5>{item.conceptName}</h5>
                </div>
            </div>
        )):"";

        return conceptBlocks;
    }

    addNewConcept(newConcept){
        var concepts = this.state.concepts;
        concepts.push(newConcept);
        this.setState({concepts:concepts})
    }

    handleOnChangeListName(e){
        e.preventDefault();
        this.setState({listName:e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        axios.post(this.props.serverURL+'/list/create/',{
            listName:this.state.listName,
            concepts:this.state.concepts
        })
        .then((result)=>{
            if (result.status == 200) this.props.history.push('/list/all')
        })
        
    }


    render(){
        return(
            <div id='create-list-page'>
            
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Create List</h2>
                        <p className="lead">
                            You can put any concepts in a list(e.g. food, places, activities), as long as it can help you explain, 
                            by a image*.
                        </p>
                        <p>
                            *Please make sure your image doesn't violate any copyrights, we are not responsiable for the images you upload.
                        </p>
                    </div>
                </div>

                <div className="container">
                    <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="list-name"> List Name:</label>
                                    <input required type="text" className="form-control" onChange={this.handleOnChangeListName.bind(this)}/>
                                 </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-4">
                                <div className="form-group">
                                    <div className="list-contents">
                                        <label htmlFor="concepts"> Concepts: </label>
                                    </div>
                                </div>
                            </div>                                
                        </div>

                        <div className="row">
                            {this.renderConcepts()}
                            <div className="clearfix"></div>
                            <AddConcept />
                            {/* <DeleteConcept /> */}
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <NavLink to="/list/all" className="btn btn-default">Cancel</NavLink>

                    </form>
                </div>

                <div className="modal fade" id="create-concept-modal" tabIndex="-1" role="dialog" aria-labelledby="create-concept-modal-label">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">

                            <div className="modal-body ">
                                <CreateConceptPage serverURL = {this.props.serverURL}  callback = {this.addNewConcept.bind(this)}/>
                            </div>
                        </div>
                    </div>

                </div>
            
            </div>
        )
    }
} 