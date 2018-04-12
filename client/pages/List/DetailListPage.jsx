import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default class DetailListPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:{}
        }
    }


    componentDidMount(){
        axios.get(this.props.serverURL + '/list/detail/'+ this.props.match.match.params.id)
            .then((res)=>{
                this.setState({
                    list:res.data.list
                })
            })  
    }

    renderConcepts(){
        const conceptBlocks = this.state.list.concepts?
        this.state.list.concepts.map((item)=>(
            <div key={item.id} className="col-sm-6 col-md-4 col-lg-4">
                <div className="concept-block"> 
                    <img src={item.imgUrl} alt={item.conceptName} />
                    <h5>{item.conceptName}</h5>
                </div>
            </div>
        ))

        :
        <p>There is no concepts in this list....</p>;

        return conceptBlocks;

    }


    render(){
        return(
            <div id="detail-list-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>{this.state.list.listName? this.state.list.listName :"List Detail"}</h2>
                        <NavLink to="/list/all" className="btn btn-default">Back</NavLink>
                    </div>
                </div>


                <div className="container">
                    <div className="row">
                        {this.renderConcepts()}
                    </div>
                </div>
            </div>
        )
    }
}