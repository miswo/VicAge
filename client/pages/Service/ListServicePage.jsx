import React from 'react';
import axios from 'axios';
import{Link} from 'react-router-dom';

import PostCodeSearcher from '../../components/PostCodeSearcher';

export default class ListServicePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            postcode:this.props.match.match.params.postcode,
            active:"community",
            data:[]
        }
    }

    componentDidMount(){
        axios.get(this.props.serverURL+'/service/community/'+this.state.postcode)
            .then((res)=>{
                this.setState({
                    data:res.data.services
                })
            })
    }

    renderServices(){
        const content = this.state.data.length?

        this.state.data.map((item)=>(
            <a href="#" key={item._id} className="list-group-item">
                <h4 className="list-group-item-heading">{item.name}</h4>  
                <p className="list-group-item-text">
                    Address:
                    {item.address}
                </p>
            </a>
        ))
        :
        <a className="list-group-item">No services found..</a>

        return content;

    }

    handleTabsClickCommunity(e){
        e.preventDefault();
        this.setState({active:"community",data:[]})
        axios.get(this.props.serverURL+'/service/community/'+this.state.postcode)
            .then((res)=>{
                this.setState({
                    data:res.data.services
                })
            })
    }

    handleTabsClickDisability(e){
        e.preventDefault();
        this.setState({active:"disability",data:[]})

        axios.get(this.props.serverURL+'/service/disability/'+this.state.postcode)
            .then((res)=>{
                this.setState({
                    data:res.data.services
                })
            })
    }
    
    handleTabsClickAgedCare(e){
        e.preventDefault();
        this.setState({active:"aged-care",data:[]})

        axios.get(this.props.serverURL+'/service/agedcare/'+this.state.postcode)
            .then((res)=>{
                this.setState({
                    data:res.data.services
                })
            })
    }

    handleTabsClickHospital(e){
        e.preventDefault();
        this.setState({active:"hospital",data:[]})

        axios.get(this.props.serverURL+'/service/hospital/'+this.state.postcode)
            .then((res)=>{
                this.setState({
                    data:res.data.services
                })
            })
    }

    render(){
        
        return(

            <div id="list-service-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Services</h2>
                        <p className="lead">Here are some information that might help you.</p>
                        {/* <PostCodeSearcher history = {this.props.history} /> */}
                        <Link to="/" className="btn btn-default">Back</Link>
                    </div>
                </div>

                <div className="container">
                    <h4>In Post Code {this.state.postcode} Area, there are:</h4>
                    <ul className="nav nav-tabs">
                        <li role="presentation" id="community"  className={this.state.active =="community"?"active":""}  onClick={this.handleTabsClickCommunity.bind(this)}><a href="#">Community Service</a></li>
                        <li role="presentation" id="disaility"  className={this.state.active =="disability"?"active":""} onClick={this.handleTabsClickDisability.bind(this)}> <a href="#">Disability Service</a></li>
                        <li role="presentation" id="aged-care"  className={this.state.active =="aged-care"?"active":""}  onClick={this.handleTabsClickAgedCare.bind(this)}> <a href="#">Aged Care</a></li>
                        <li role="presentation" id="aged-care"  className={this.state.active =="hospital"?"active":""}  onClick={this.handleTabsClickHospital.bind(this)}> <a href="#">Hospital</a></li>
                    </ul>

                    <div className="content list-group">

                        {this.renderServices()}
                    </div>
                </div>
                
            </div>
        )
    }
}