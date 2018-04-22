import React from 'react';
import axios from 'axios';

import Slick from '../../components/Slick';




export default class SingleListSurveyPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.match.match.params.id,
            list:{},
            selected:[]
        }
    }

    componentDidMount(){
        axios.get(this.props.serverURL + '/list/detail/'+ this.state.id)
            .then((res)=>{
                this.setState({
                    list:res.data.list
                })
            })  

    }

    handleClick(e){
        const id = e.target.parentNode.id;
        var selected = this.state.selected;
        for(var i=0;i<selected.length;i++){
            if(selected[i] === id){
                delete selected[i];
                this.setState({selected:selected})
                return;
            }
        }
        selected.push(id);
        this.setState({selected:selected})
    }

    handleSubmit(){
        this.props.dataTransfer(this.state);
        this.props.history.push('/survey/result');

    }

    handleBack(){
        this.props.history.goBack();
    }


    render(){
        return(
            <div id="single-list-survey-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Survey</h2>
                        <button className="btn btn-default" onClick={this.handleBack.bind(this)}>Back</button>
                    </div>
                </div>

                <div className="container">
                    <Slick listName={this.state.list.listName} items={this.state.list.concepts} onClick={this.handleClick.bind(this)}/>
                    <p>Double tap the thing you want, swipe left or right to navigate.</p>
                    <p>
                        <span className="slick-item-selected" > *Selected</span>
                        <br/>
                        <span className="slick-item-not-selected"> *Not Selected</span>    
                    </p>
                    <div class="text-center">   
                        <button className="btn btn-lg btn-danger" onClick={this.handleSubmit.bind(this)}>Submit</button>
                                       
                    </div>  
                    
                </div>

            </div>
        )
    }
}