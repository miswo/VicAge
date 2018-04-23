import React from 'react';

export default class PostCodeSearcher extends React.Component{
    constructor(props){
        super(props);
        this.state={
            postcode:''
        }
    }

    handleInputChange(e){
        this.setState({postcode:e.target.value})
    }
    
    handleSubmit(e){
        e.preventDefault();
        if(this.state.postcode.match('^3\\d{3}$')){
            document.getElementById('feedback').innerText = "";
            this.props.history.push('/service/find/all/'+ this.state.postcode);
        }
        else
            document.getElementById('feedback').innerText = "Please enter correct Victoria post code."
    }


    render(){
        return(

            <form id="post-code-searcher" className="form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <input required className="input-lg" placeholder="Post Code" onChange={this.handleInputChange.bind(this)}/> 
                    <button type = "submit" className="btn btn-primary btn-lg" >Find out more</button>
                    <p id="feedback"></p>
                </div>
            </form>
        )
    }
}