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
                        <button className="btn btn-default" onClick={this.goback.bind(this)}>Back</button>
                    </div>
                </div>

                <div className="container">

                    <div>
                        <h3>Melbourne Oral and Facial Surgery</h3>
                        <h4>Adress:</h4>
                        <h4>Website:</h4>
                        <h4>Phone:</h4>
                    </div>

                    <div>
                        <h3>Yearly Activity Budget Per Resident</h3>
                        <p>$146</p>
                        <p>Lower than the average of your area</p>
                    </div>



                    <div>
                    
                        <button class="btn btn-secondaly" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            What is Activity Budget?
                        </button>
    
                        <div class="collapse" id="collapseExample">
                             <div class="card card-body">
                                <p>Activity budget is allocated to a facility yearly to support their service provided to residents.</p>
                            </div>
                        </div>
                
                        
                    </div>
            </div>
            <div className="container">
                    <div>Picture</div>
                    <div>
                    {this.state.address?
                        <iframe id="google-map"
                        frameBorder="0"
                        src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyB__2CdN6RdNrlhe9prRxREE7cj2R4qwwk&q=" + this.state.address }
                        allowFullScreen>
                        </iframe>
                        :
                        ''
                    }</div>

                </div>
            </div>


        )
    }
}