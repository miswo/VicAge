import React from 'react';
import axios from 'axios';



export default class RecipeSelector extends React.Component{

    constructor(props){
        super(props);
        this.state={
            loading:false,
            recipeName:'',
            recipes:[]
        }
    }

    handleChange(e){
        this.setState({recipeName:e.target.value})
    }

    handleSearch(e){
        e.preventDefault();
        this.setState({loading:true})
        axios.post(this.props.serverURL + '/planner/recipe' + this.state.recipeName)
            .then((res)=>{
                this.setState({recipes:res.data.recipes,loading:false})
            }) 
    }

    renderRecipes(){
        if(this.state.loading)
            return <p>Loading...</p>
        const recipes = this.state.recipes == 0? <p>No recipe found..</p>:
            this.state.recipes.map((item)=>(
                <a id={item.id} key={item.id} className="list-group-item">
                    {item.recipeName}
                </a>
            ))
    }
    render(){
        return(
            <div id="recipe-selector">
                <div className="form-inline">
                    <h5>Search for Recipes to Add:</h5>
                    <input type="text" id="recipe-searcher" onChange={this.handleChange.bind(this)} className="form-control"/>
                    <button onClick={this.handleSearch.bind(this)} className="btn btn-secondary">Search</button>
                </div>

                <div className="recipeDisplay">
                    <ul className="list-group">
                        {this.renderRecipes()}
                    </ul>
                </div>
            </div>
        )
    }
}