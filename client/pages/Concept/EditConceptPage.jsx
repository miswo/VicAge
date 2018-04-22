import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import CKEditor from '../../components/CKEditor';
import ImageUploader from '../../components/ImageUploader';


export default class EditConceptPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:this.props.match.match.params.id,
            password:null,
            conceptName:'',
            imgUrl:'',
            conceptDescription:' '
        }
    }
    componentDidMount(){
        axios.get(this.props.serverURL + '/concept/detail/' + this.state.id)
            .then((res)=>{
                var concept = res.data.concept;
                this.setState({
                    conceptName : concept.conceptName,
                    imgUrl :concept.imgUrl,
                    conceptDescription: concept.conceptDescription
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
            conceptName:e.target.value,
        })
    }

    onChangeConceptDescription(content){
        this.setState({
            conceptDescription:content
        })

    }

    handleUploadImage(img){
        console.log(img);
        this.setState({imgUrl:img.imgUrl})
    }

    onSubmit(e){
        e.preventDefault();
        axios.post(this.props.serverURL+'/concept/update/'+this.state.id,{
            password:this.state.password,
            concept:{
                conceptName:this.state.conceptName,
                imgUrl:this.state.imgUrl,
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
            <div id="edit-concept-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Edit Concept</h2>
                    </div>
                </div> 

                <div className="container">

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <img    className="img-responsive"
                                    src={this.state.imgUrl?this.state.imgUrl:""}
                            />
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3">
                            <ImageUploader onUpload={this.handleUploadImage.bind(this) } serverURL = {this.props.serverURL} />
                            <p>Update Image</p>
                        </div>
                    </div>

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
                                            value={this.state.conceptName?this.state.conceptName:"loading"}
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

                                    {this.state.conceptName?
                                        <CKEditor 
                                            text={this.state.conceptDescription} 
                                            onChange={this.onChangeConceptDescription.bind(this)}    
                                        />
                                        :
                                        "Loading.."
                                    }

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
                        <button className="btn btn-secondary" onClick={this.onCancel.bind(this)}>Back</button>
                        
                    </form>
                </div>
            </div>
        )
    }
}