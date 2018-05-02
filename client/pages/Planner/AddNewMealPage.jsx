import React from 'react';
import axios from 'axios';
import moment from 'moment';


export default class AddNewMealPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            date:moment(this.props.date).format('YYYY-MM-DD'),
            quantity:0
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            name:props.recipe.RecipeName,
            date:moment(props.date).format('YYYY-MM-DD')
        })
    }
    handleSubmit(e){
        e.preventDefault();
        var name = document.getElementById('input-name').value;
        var date = document.getElementById('input-date').value;
        var quantity = document.getElementById('input-quantity').value;
        if(quantity<=0) return alert('Please enter correct quantity');

        var newMealPlan = {
            planName:name,
            type:'meal',
            recipe:this.props.recipe,
            userid:this.props.user.id,
            date,quantity
        };


        axios.post(this.props.serverURL+'/planner/add-new-meal/',newMealPlan)
        .then((res)=>{
            if(res.data.status == 200) {
                alert('Added a New Meal Plan');
                this.props.callback(newMealPlan)
            }
        })


        document.getElementById('input-quantity').value = 0;

    }


    onValueChange(){
        var name = document.getElementById('input-name').value;
        var date = document.getElementById('input-date').value;
        var quantity = document.getElementById('input-quantity').value;

        this.setState({
            name,date,quantity
        })
    }

    render(){
        return(
            <div id="add-new-meal-page">
                {/* <div className="jumbotron banner">
                    <div className="container">
                        <h2>Add New Plan</h2>
                    </div>
                </div> */}
                <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <p>{this.props.recipe?this.props.recipe.Description:''}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                            <label htmlFor="input-name">Name:</label>
                                <input type="text" value={this.state.name} id="input-name" onChange={this.onValueChange.bind(this)} className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="input-date">Date:</label>
                                <input type="date" value={this.state.date} id="input-date" onChange={this.onValueChange.bind(this)} className="form-control" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="input-quntity">Quantity:</label>
                                <div className="input-group">   
                                    <input type="number" id="input-quantity" onChange={this.onValueChange.bind(this)} className="form-control"/>
                                    <div className="input-group-addon">g</div>
                                </div>
                               
                            </div>
                        </div>

                    </div>

                    <button type="sbumit" className="btn btn-primary">Add Meal Plan</button>

                </form>                
            
            </div>
        )
    }
}