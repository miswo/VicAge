import React from 'react';
import axios from 'axios';
import{NavLink,Link} from 'react-router-dom';

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
        this.setState({
            postcode:newPostcode,
            active:'agedcare'
        });
        this.fetchdata(newPostcode);

    }

    fetchdata(postcode){
        axios.get(this.props.serverURL+'/service/agedcare/all/'+postcode)
            .then((res)=>{
                this.setState({
                    agedcare:res.data.services,
                    data:res.data.services
                })
            }
        )

        axios.get(this.props.serverURL+'/service/community/all/'+postcode)
            .then((res)=>{
                this.setState({
                    community:res.data.services
                })
            }
        )

        axios.get(this.props.serverURL+'/service/disability/all/'+postcode)
            .then((res)=>{
                this.setState({
                    disability:res.data.services
                })
            }
        )

        axios.get(this.props.serverURL+'/service/hospital/all/'+postcode)
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
            <Link to={'/service/'+ this.state.active+'/detail/'+item._id} key={item._id} from={this.state.postcode} className="list-group-item">
                <h4 className="list-group-item-heading">{item.name}</h4>  
                <p className="list-group-item-text">
                    Address:
                    {item.address}
                </p>
            </Link>
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
                        <Link to="/" className="btn btn-default back">Back</Link>
                    </div>
                </div>

                <div className="container">
                    <h4>In Post Code {this.state.postcode} Area, there are:</h4>
                    <ul className="nav nav-pills">
                        <li role="presentation" className={this.state.active =="agedcare"?"active":""}  onClick={this.handleTabsClickAgedCare.bind(this)}> <NavLink to="#">         Aged Care({this.state.agedcare.length})</NavLink></li>  
                        <li role="presentation" className={this.state.active =="community"?"active":""}  onClick={this.handleTabsClickCommunity.bind(this)}><NavLink to="#">        Community Service({this.state.community.length})</NavLink></li>
                        <li role="presentation" className={this.state.active =="disability"?"active":""} onClick={this.handleTabsClickDisability.bind(this)}> <NavLink to="#">      Disability Service({this.state.disability.length})</NavLink></li>
                        <li role="presentation" className={this.state.active =="hospital"?"active":""}  onClick={this.handleTabsClickHospital.bind(this)}> <NavLink to="#">         Hospital({this.state.hospital.length})</NavLink></li>
                    </ul>

                    <div className="content list-group">

                        {this.renderServices()}
                    </div>
                </div>
                
            </div>
        )
    }
}