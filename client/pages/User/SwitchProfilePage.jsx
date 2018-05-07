import React from 'react';
import axios from 'axios';



export default class SwitchProflePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profiles:[]
        }
    }

    componentDidMount(){
        var allProfile = this.props.user.allProfile;
        axios.post(this.props.serverURL+'/user/profiles/',{allProfile})
        .then((res)=>{
            this.setState({profiles:res.data.profiles});
        })

    }

    handleAddnewProfile(e){
        e.preventDefault();
        axios.post(this.props.serverURL + '/user/new-profile',{userid:this.props.user.id,allProfile:this.props.user.allProfile})
        .then((res)=>{
            var user = this.props.user;
            user.profile = res.data.profile;
            user.allProfile = res.data.allProfile;
            this.props.dataTransfer({user});
            this.props.history.push('/user/profile');    
        })

    }

    setActiveProfile(e){
        axios.get(this.props.serverURL + '/user/profile/' + e.target.id)
        .then((res)=>{
            var user = this.props.user;
            user.profile = res.data.profile;
            user.profile.id = user.profile._id;
            delete user.profile._id;

            axios.post(this.props.serverURL + '/user/profile',{
                _id:user.id,
                profile:user.profile
            })
            .then((res)=>{
                if(res.data.status == 200){
                    this.props.dataTransfer({user});
                    this.props.history.push('/home');
                }
            })
        })
        
    }

    renderProfiles(){
        const profiles = this.state.profiles.map((item)=>(
            <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4" key={item._id}>
                <div className="btn btn-default function-square profileListName" id={item._id} onClick={this.setActiveProfile.bind(this)}>
                    <p>{item.name}</p>
                </div>
            </div>
        ))

        return profiles;
    }

    render(){
        return(
            <div id="switch-profile-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Switch Profile</h2>
                    </div>                
                </div>


                <div className="container">
                    <div className="row">
                        {this.renderProfiles()}
                        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4">
                            <div className="btn btn-default function-square" id="addProfileImg" onClick={this.handleAddnewProfile.bind(this)}>Add New Profile</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}