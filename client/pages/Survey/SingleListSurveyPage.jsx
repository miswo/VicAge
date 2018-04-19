import React from 'react';
import axios from 'axios';




export default class SingleListSurveyPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.match.match.params.id,
            list:{}
        }
    }

    componentDidMount(){
        axios.get(this.props.serverURL + '/list/detail/'+ this.state.id)
            .then((res)=>{
                this.setState({
                    list:res.data.list
                })
                console.log(this.state);
            })  


    }


    render(){
        return(
            <div id="single-list-survey-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Survey</h2>
                        <p className='lead'>{this.state.list?this.state.list.listName :'Single List Survey'}</p>
                    </div>
                </div>

                <div className="container">
                    <h3>Survey starts here.</h3>
                </div>

            </div>
        )
    }
}