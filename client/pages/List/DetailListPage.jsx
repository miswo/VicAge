import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default class DetailListPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.match.params.id,
            list:{}
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

    renderConcepts(){
        const conceptBlocks = this.state.list.concepts?
        this.state.list.concepts.map((item)=>(
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
        <p>There is no concepts in this list....</p>;

        return conceptBlocks;

    }


    render(){
        return(
            <div id="detail-list-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>{this.state.list.listName? this.state.list.listName :"List Detail"}</h2>
                        <NavLink to={"/survey/list/" + this.state.id} className="btn btn-primary"> Start a Survey</NavLink>
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