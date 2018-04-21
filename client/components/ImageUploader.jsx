import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class ImgUploader extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:'',
            imgUrl:'',
        }
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
                this.setState({
                    id:id,
                    imgUrl:futureImgUrl
                });
                this.props.onUpload(this.state);
            }
        })
       .catch((err)=>{
        //    console.log(err);
       })
    }

    render(){
        return(
            <div id="image-uploader">
                <Dropzone   accept="image/*" 
                            className="drop-zone"
                            onDrop = {this.onDrop.bind(this)}
                >
                    <span className="glyphicon glyphicon-plus" ></span>
                </Dropzone>
            </div>
        )
    }
}
