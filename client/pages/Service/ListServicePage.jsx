import React from 'react';

import PostCodeSearcher from '../../components/PostCodeSearcher';

export default class ListServicePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            "active":"community"
        }
    }

    handleTabsClickCommunity(e){
        e.preventDefault();
        this.setState({active:"community"})
    }

    handleTabsClickDisability(e){
        e.preventDefault();
        this.setState({active:"disability"})
    }
    
    handleTabsClickAgedCare(e){
        e.preventDefault();
        this.setState({active:"aged-care"})
    }

    render(){
        
        return(

            <div id="list-service-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Services</h2>
                        <p className="lead">Here are some information that might help you.</p>
                        <PostCodeSearcher history = {this.props.history} />
                    </div>
                </div>

                <div className="container">
                    <ul className="nav nav-tabs">
                        <li role="presentation" id="community"  className={this.state.active =="community"?"active":""}  onClick={this.handleTabsClickCommunity.bind(this)}><a href="#">Community Service</a></li>
                        <li role="presentation" id="disaility"  className={this.state.active =="disability"?"active":""} onClick={this.handleTabsClickDisability.bind(this)}> <a href="#">Disability Service</a></li>
                        <li role="presentation" id="aged-care"  className={this.state.active =="aged-care"?"active":""}  onClick={this.handleTabsClickAgedCare.bind(this)}> <a href="#">Aged Care</a></li>
                    </ul>

                    <div className="content">
                    
                    </div>
                </div>

                

                
            </div>
        )
    }
}