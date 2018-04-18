import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';


export default class CreateConceptPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:this.props.match.match.params.id,
            concept:null,
            password:null,
            conceptDescription:null
        }
    }
    componentDidMount(){
        axios.get(this.props.serverURL + '/concept/detail/' + this.state.id)
            .then((res)=>{
                this.setState({
                    concept:res.data.concept,
                    conceptDescription:res.data.concept.conceptDescription
                })
            })
    }

    onChangePassword(e){
        this.setState({
            password:e.target.value
        });
    }

    onChangeConceptName(e){
        this.setState({
            concept:{
                conceptName:e.target.value,
                imgUrl:this.state.concept.imgUrl,
                conceptDescription:this.state.concept.conceptDescription
            }
        })
    }

    onChangeConceptDescription(content){
        this.setState({
            conceptDescription:{
                conceptDescription:content
            }
        })

        console.log(this.state.conceptDescription)
    }

    onSubmit(e){
        e.preventDefault();
        axios.post(this.props.serverURL+'/concept/update/'+this.state.id,{
            password:this.state.password,
            concept:{
                conceptName:this.state.concept.conceptName,
                imgUrl:this.state.concept.imgUrl,
                conceptDescription:this.state.conceptDescription
            }
        })
            .then((res)=>{
                if(res.data.status==403) alert('Incorrect Password');
                else this.props.history.goBack();
            })
    }

    onCancel(e){
        e.preventDefault();
        this.props.history.goBack();
    }


    render(){
        return(
            <div id="detail-concept-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Edit Concept</h2>
                    </div>
                </div> 
                <div className="container">
                    <img    className="img-responsive"
                            src={this.state.concept?this.state.concept.imgUrl:""}
                    />
                    <form className="form" onSubmit={this.onSubmit.bind(this)}>

                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="concept-name">
                                        Concept Name:
                                    </label>
                                    <input  type="text" 
                                            className="form-control"
                                            id="concept-name" 
                                            value={this.state.concept?this.state.concept.conceptName:"loading"}
                                            onChange={this.onChangeConceptName.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label htmlFor="concept-description">
                                        Concept Description:
                                    </label>
                                    <textarea   type="text" 
                                                className="form-control"
                                                id="concept-description" 
                                                value={this.state.concept?this.state.concept.conceptDescription:"loading"}
                                                onChange={this.onChangeConceptDescription.bind(this)}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="password">
                                        Password
                                    </label>
                                    <input      type="password" 
                                                className="form-control"
                                                id="edit-password"
                                                onChange={this.onChangePassword.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                        <button className="btn btn-default" onClick={this.onCancel.bind(this)}>Back</button>
                        
                    </form>
                </div>
            </div>
        )
    }
}