import React from 'react';
import axios from 'axios';
import Pager from '../components/Pager';



export default class RecipeSelector extends React.Component{

    constructor(props){
        super(props);
        this.state={
            loading:false,
            recipeName:'',
            recipes:[],
            currentPage:1
        }
    }

    handleChange(e){
        this.setState({recipeName:e.target.value})
    }

    handleSearch(e){
        e.preventDefault();
        if(this.state.recipeName.length<3) return alert('Input at Least 3 Letters.');
        this.setState({loading:true})
        var terms = this.state.recipeName.split(" ");
        axios.post(this.props.serverURL + '/planner/recipes',{terms})
            .then((res)=>{
                this.setState({recipes:res.data.recipes,loading:false})
            }) 
    }

    renderRecipes(){
        console.log(this.state.recipes);
        if(this.state.loading)
            return <p>Loading...</p>

        const recipes = this.state.recipes == 0? <p> No Recipe found..</p>:
            this.state.recipes.slice(10*(this.state.currentPage-1),this.state.currentPage*10).map((item)=>(
                <a id={item._id} key={item._id} className="list-group-item" data-toggle="tooltip" data-placement="bottom" title={item.Description}>
                    {item.RecipeName}
                </a>
            ))
        return recipes;
    }

    setCurrentPage(num){
        this.setState({currentPage:num})
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
                    <div className="list-group">
                        {this.renderRecipes()}
                        <Pager pageNum = {this.state.recipes.length/10} callback={this.setCurrentPage.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}