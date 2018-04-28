import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class DetailServicePage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:{},
            address:''
        }
    }

    componentDidMount(){
        axios.get(this.props.serverURL + this.props.history.location.pathname)
            .then((res)=>{
                this.setState({
                    data:res.data.data,
                    address:res.data.address
                })
            })
    }

    goback(){
        this.props.history.goBack();
    }

    renderDetail(){
        if(!this.state.data){
            return <div></div>
        }else{
            var arr = [];
            Object.keys(this.state.data).forEach((key)=>{
                arr.push({
                    key:key,
                    value:this.state.data[key]
                });
            })
            delete arr[0];
            return(
                <div className="service-detail">
                    {arr.map((item)=>(
                        <div key={item.key}>
                            <h4>{item.key}</h4>
                            {item.value?<p>{item.value}</p>:<span>--<br/></span>}
                        </div>
                    ))}
                </div>
            )
        }
        
    }


    render(){
        return(
            <div id="detail-service-page">
        
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Service Provider Details</h2>
                        <button className="btn btn-secondary" onClick={this.goback.bind(this)}>Back</button>
                    </div>
                </div>

                <div className="container">

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-md-6">
                            <div className=".content">
                                {this.renderDetail()}
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-md-6">
                            <h4>Map:</h4>
                            {this.state.address?
                                <iframe id="google-map"
                                width="400"
                                height="400"
                                frameBorder="0"
                                src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyB__2CdN6RdNrlhe9prRxREE7cj2R4qwwk&q=" + this.state.address }
                                allowFullScreen>
                                </iframe>
                                :
                                ''
                            }
                        </div>


                    </div>
                </div>
            </div>


        )
    }
}