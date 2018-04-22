import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';



export default class CreateConceptPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:this.props.match.match.params.id,
            concept:null
        }
    }
    componentDidMount(){
        axios.get(this.props.serverURL + '/concept/detail/' + this.state.id)
            .then((res)=>{
                this.setState({
                    concept:res.data.concept
                })
            })
    }

    render(){
        return(
            <div id="detail-concept-page">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>{this.state.concept?this.state.concept.conceptName:"Concept"}</h2>

                        <button className="btn btn-secondary" onClick={this.props.history.goBack}>Back</button>
                    </div>
                </div> 
                <div className="container">

                    {
                        this.state.concept?
                        <div className="concept-detail">
                            <div className="img-wrapper">
                                <img className="img-responsive" src={this.state.concept.imgUrl} />
                            </div>
                            <div id="conceptDescription" dangerouslySetInnerHTML={{__html:this.state.concept.conceptDescription}}/>
                            <NavLink to={"/concept/edit/" + this.state.id} className="btn btn-primary">Edit</NavLink>
                        </div>
                        :
                        "Loading ...."
                    }
                </div>
            </div>
        )
    }
}