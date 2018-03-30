import React from 'react';
import axios from 'axios';
import{Link} from 'react-router-dom';

import PostCodeSearcher from '../../components/PostCodeSearcher';

export default class ListServicePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            postcode:this.props.match.match.params.postcode,
            active:"agedcare",
            data:[],
            community:[],
            disability:[],
            agedcare:[],
            hospital:[]
        }
    }

    componentDidMount(){
        this.fetchdata(this.state.postcode);
    }

    componentWillReceiveProps(nextProps){
        var newPostcode = nextProps.match.match.params.postcode;
        this.setState({postcode:newPostcode});
        this.fetchdata(newPostcode);
    }

    fetchdata(postcode){
        axios.get(this.props.serverURL+'/service/agedcare/'+postcode)
            .then((res)=>{
                this.setState({
                    agedcare:res.data.services,
                    data:res.data.services
                })
            }
        )

        axios.get(this.props.serverURL+'/service/community/'+postcode)
            .then((res)=>{
                this.setState({
                    community:res.data.services
                })
            }
        )

        axios.get(this.props.serverURL+'/service/disability/'+postcode)
            .then((res)=>{
                this.setState({
                    disability:res.data.services
                })
            }
        )

        axios.get(this.props.serverURL+'/service/hospital/'+postcode)
            .then((res)=>{
                this.setState({
                    hospital:res.data.services
                })
            }
        )
    }

    renderServices(){
        const content = this.state.data.length?

        this.state.data.map((item)=>(
            <a href="#" key={item._id} className="list-group-item" onClick={(e)=>{e.preventDefault()}}>
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
        this.setState({active:"community",data:this.state.community})

    }

    handleTabsClickDisability(e){
        e.preventDefault();
        this.setState({active:"disability",data:this.state.disability})

    }
    
    handleTabsClickAgedCare(e){
        e.preventDefault();
        this.setState({active:"agedcare",data:this.state.agedcare})

    }

    handleTabsClickHospital(e){
        e.preventDefault();
        this.setState({active:"hospital",data:this.state.hospital})


    }

    render(){
        return(
            <div id="list-service-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Services</h2>
                        <p className="lead">Here is some information that might help you.</p>
                        <PostCodeSearcher history = {this.props.history} />
                        <Link to="/" className="btn btn-default">Back</Link>
                    </div>
                </div>

                <div className="container">
                    <h4>In Post Code {this.state.postcode} Area, there are:</h4>
                    <ul className="nav nav-pills">
                        <li role="presentation" className={this.state.active =="agedcare"?"active":""}  onClick={this.handleTabsClickAgedCare.bind(this)}> <a href="#">         Aged Care({this.state.agedcare.length})</a></li>  
                        <li role="presentation" className={this.state.active =="community"?"active":""}  onClick={this.handleTabsClickCommunity.bind(this)}><a href="#">        Community Service({this.state.community.length})</a></li>
                        <li role="presentation" className={this.state.active =="disability"?"active":""} onClick={this.handleTabsClickDisability.bind(this)}> <a href="#">      Disability Service({this.state.disability.length})</a></li>
                        <li role="presentation" className={this.state.active =="hospital"?"active":""}  onClick={this.handleTabsClickHospital.bind(this)}> <a href="#">         Hospital({this.state.hospital.length})</a></li>
                    </ul>

                    <div className="content list-group">

                        {this.renderServices()}
                    </div>
                </div>
                
            </div>
        )
    }
}