import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default class SurveyResult extends React.Component{

    constructor(props){
        super(props);
        this.state={
            loading:true,
            data:this.props.data,
            concepts:[]
        }
    }


    componentDidMount(){
        if(this.state.data == null){
            return;
        }
        var concepts = [];
        var selected = this.state.data.selected;
        for(var i=0;i<selected.length;i++){
            if(selected[i] != undefined){
                axios.get(this.props.serverURL + '/concept/detail/' + selected[i])
                    .then((res)=>{
                        concepts.push(res.data.concept);
                        this.setState({concepts:concepts})
                        
                    })
            }
        }

    }

    renderConcepts(){
        const conceptBlocks = this.state.concepts?
        this.state.concepts.map((item)=>(
            <div key={item._id} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <div className="concept-block">
                    <div className="img-wrapper">
                        <NavLink to={"/concept/detail/" + item._id}>
                            <img src={item.imgUrl} alt={item.conceptName} />
                        </NavLink>
                    </div>
                    <h5>{item.conceptName}</h5>
                </div>
            </div>
        ))
        :
        ""
        return conceptBlocks;
    }
    render(){
        return(
            <div id="survey-result">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Result</h2>
                    </div>
                </div>

                <div className="container">
                        {
                            this.state.data?
                                <p>In the list: <br/>
                                    <strong>{this.state.data.list.listName}</strong><br/>
                                    These concepts are selected: 
                                </p>
                                :
                                <p>No survey result found...</p>
                        }
                    <div className="row">
                        {this.renderConcepts()}
                    </div>

                    <p> 
                        *Only display your latest survey result.
                        <br/>
                        *Do NOT refresh this page, or your last survey result will be gone.    
                    </p>
                    
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="input-email">Send result to:</label>
                                <input type="email" className="form-control" placeholder="Email"/>
                            </div>
                            <button className="btn btn-primary">Send</button>
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }
}