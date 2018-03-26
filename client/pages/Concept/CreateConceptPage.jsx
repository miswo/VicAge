import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class CreateConceptPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            imgUrl:"",
            conceptName:"",
            conceptDescription:""
        }
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.imgUrl=='') return alert('Please upload concept image.')

        axios.post(this.props.serverURL+'/concept/create',this.state)
            .then((result)=>{
                this.props.history.push('/');
            })

    }

    handleNameChange(e){
        this.setState({conceptName:e.target.value})
    }

    handleDescriptionChange(e){
        this.setState({conceptDescription:e.target.value})
    }

    onDrop(files){
        var futureImgUrl = '';
        var id = '';
        if(files.length == 0) return alert('File type must be image.');
        var file = files[0];
        axios.post(this.props.serverURL+'/concept/slot',{
           filetype:file.type
       })
       .then((result)=>{
           var signedUrl = result.data.signedUrl;
           futureImgUrl = result.data.imgUrl;
           id = result.data._id;
           var options = {
               headers:{
                   'Content-Type':file.type
               }
           };
           return axios.put(signedUrl,file,options);
       })
       .then((result)=>{
            if(result.status==200) {
                this.setState({id:id});
                this.setState({imgUrl:futureImgUrl});
            }
        })
       .catch((err)=>{
           console.log(err);
       })

    }


    render(){
        return(
            <div id="create-concept-page">
                <div className="jumbotron">
                    <div className="container">
                        <h2>Create Concept</h2>
                    </div>
                </div>


                <div className="container">
                    <form id="concept-create-compoenent" className="form" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="concept-image">Concept Image:</label>

                                    {
                                        this.state.imgUrl?
                                        <img src={this.state.imgUrl} />
                                        :
                                        <Dropzone accept="image/*" 
                                                className="drop-zone"
                                                onDrop = {this.onDrop.bind(this)}>
                                            <span className="glyphicon glyphicon-plus" ></span>
                                        </Dropzone>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="concept-name">Concept Name:</label>
                                    <input required type="text" className="form-control" id="concept-name" onChange={this.handleNameChange.bind(this)}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="concept-description">Concept Description:</label>
                                    <textarea className="form-control" rows="5" onChange={this.handleDescriptionChange.bind(this)}/>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>

                    </form>
                    
                </div>
            </div>
        )
    }
}