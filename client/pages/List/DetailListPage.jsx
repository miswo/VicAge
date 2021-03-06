import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import Pager from '../../components/Pager';

export default class DetailListPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.match.params.id,
            list:{},
            totalPageNumber:1,
            currentPage:1,
            itemPerPage:9
        }
    }


    componentDidMount(){
        axios.get(this.props.serverURL + '/list/detail/'+ this.state.id)
            .then((res)=>{
                this.setState({
                    list:res.data.list,
                    totalPageNumber:Math.ceil(res.data.list.concepts.length/this.state.itemPerPage)
                })
            })
    }

    renderConcepts(){
        const conceptBlocks = this.state.list.concepts?
        this.state.list.concepts.slice(this.state.itemPerPage*(this.state.currentPage-1),this.state.itemPerPage*this.state.currentPage).map((item)=>(
            <div key={item._id} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <div className="concept-block">
                    <div className="img-wrapper">
                        <NavLink to={"/concept/detail/" + item._id}>
                            <img src={item.imgUrl} alt={item.conceptName} />
                        </NavLink>
                    </div>
                    <NavLink to={"/concept/detail/" + item._id}>
                        <h5>{item.conceptName}</h5>
                    </NavLink>
                </div>
            </div>
        ))

        :
        <p>There is no concepts in this list....</p>;

        return conceptBlocks;

    }

    setCurrentPage(num){
        this.setState({currentPage:num})
    }


    render(){
        return(
            <div id="detail-list-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>{this.state.list.listName? this.state.list.listName :"List Detail"}</h2>
                        <p>Select the things you need in the list to save into another list or your personal calendar</p>
                        <NavLink to="/list/all" className="btn btn-default">Back</NavLink>
                    </div>
                </div>


                <div className="container">
                    <div className="center">
                        <div className="dropdown choose-function">
                            <button className="btn btn-primary" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Choose a function
                                <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dLabel">
                                <li>{
                                    this.state.list.handler?
                                        <NavLink to={"/survey/list/" + this.state.id +'/Calorie-Calculator'}>{this.state.list.handler.name}</NavLink>
                                    :
                                    ''
                                    }
                                </li>

                                <li><NavLink to={"/survey/list/" + this.state.id +'/New-List'} >Save to a New List</NavLink></li>
                                <li><NavLink to={"/survey/list/" + this.state.id +'/Survey-Result'} >Start a Survey</NavLink></li>
                                <li><NavLink to={"/survey/list/" + this.state.id +'/Calendar'} >Add to my Calendar</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    

                    <div className="row">
                        {this.renderConcepts()}
                    </div>         
                     <div className="text-center">
                        <Pager pageNum={this.state.totalPageNumber} callback={this.setCurrentPage.bind(this)}/>
                     </div>
                </div>
            </div>
        )
    }
}