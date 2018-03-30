import React from 'react';
import  axios from 'axios';

export default class DetailServicePage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:{}
        }
    }

    componentDidMount(){
        console.log(this.state.data)
        axios.get(this.props.serverURL + this.props.history.location.pathname)
            .then((res)=>{
                this.setState({data:res.data.data})
            })
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
                            <p>{item.value}</p>
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
                        <h2>Service Provider Name</h2>
                    </div>
                </div>

                <div className="container">
                    <div className=".content">
                        {this.renderDetail()}
                    </div>
                </div>
            </div>


        )
    }
}