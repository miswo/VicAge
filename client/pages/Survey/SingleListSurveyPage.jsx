import React from 'react';
import axios from 'axios';

import Slick from '../../components/Slick';
import Pager from '../../components/Pager';

export default class SingleListSurveyPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.match.match.params.id,
            list:{},
            selected:[],
            display:'grid',
            actionName:this.props.match.match.params.actionName,
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

    handleClick(e){
        const id = e.target.parentNode.id;
        var selected = this.state.selected;
        for(var i=0;i<selected.length;i++){
            if(selected[i] === id){
                delete selected[i];
                this.setState({selected:selected})
                return;
            }
        }
        selected.push(id);
        this.setState({selected:selected})
    }

    handleGridClick(e){
        while(e.target.id.length == 0){
            e.target = e.target.parentNode;
        }
        const id = e.target.id;

        var selected = this.state.selected;
        for(var i=0;i<selected.length;i++){
            if(selected[i] === id){
                delete selected[i];
                this.setState({selected})
                return;
            }
        }
        selected.push(id);
        this.setState({selected})
    }

    handleSubmitToSurveyResult(){

        this.props.dataTransfer(this.state);
        this.props.history.push('/survey/result');

    }
    handleSubmit(e){
        if(this.state.actionName==='Calorie-Calculator')
            return this.passToListHandler(e);
        if(this.state.actionName==='New-List')
            return this.handleCreateSublist(e);
        if(this.state.actionName==='Survey-Result')
            return this.handleSubmitToSurveyResult(e);
        if(this.state.actionName==='Calendar')
            return this.handleSubmitToCalendar(e);
    }

    handleSubmitToCalendar(){
        this.props.dataTransfer(this.state);
        this.props.history.push('/goal/calendar');
        
    }
    handleBack(){
        this.props.history.goBack();
    }
    handleDisplayChange(e){
        var display = e.target.checked?'slider':'grid';
        this.setState({
            display:display,
            selected:[]
        })
    }

    checkActive(id){
        for(var i=0;i<this.state.selected.length;i++){
            if(this.state.selected[i] === id)
                return 'concept-block selected';
        }
        return 'concept-block';
    }
    renderConcepts(){
        const conceptBlocks = this.state.list.concepts?
        this.state.list.concepts.slice(this.state.itemPerPage*(this.state.currentPage-1),this.state.itemPerPage*this.state.currentPage).map((item)=>(
            <div key={item._id} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <div className={this.checkActive(item._id)} id={item._id} onClick={this.handleGridClick.bind(this)}>
                    <div className="img-wrapper">
                        <img src={item.imgUrl} alt={item.conceptName} />
                    </div>
                        <h5>{item.conceptName}</h5>
                </div>
            </div>
        ))

        :
        <p>There is no concepts in this list....</p>;

        return conceptBlocks;
    }

    handleCreateSublist(e){
        e.preventDefault();
        for(var i=0;i<this.state.selected.length;i++){
            if(this.state.selected[i] != undefined){
                this.props.dataTransfer(this.state.selected);
                this.props.history.push('/list/create/');
                return;
            }
        }
        return alert('Please select at least one concept to create a list.');
    }

    passToListHandler(e){
        e.preventDefault();
        for(var i=0;i<this.state.selected.length;i++){
            if(this.state.selected[i] != undefined){
                this.props.dataTransfer(this.state.selected);
                this.props.history.push(this.state.list.handler.url);
                return;
            }
        }
        return alert('Please select at least one concept to calculate calorie.');
    }

    setCurrentPage(num){
        this.setState({currentPage:num})
    }

    render(){
        return(
            <div id="single-list-survey-page">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Select the Things to Add to {this.state.actionName} </h2>
                        <button className="btn btn-default" onClick={this.handleBack.bind(this)}>Back</button>
                    </div>
                </div>

                <div className="container">
                        <div className="slider-switcher">
                            <p>Slider View:</p>
                                <label className="switch" onChange={this.handleDisplayChange.bind(this)}>
                                    <input type="checkbox"/>
                                    <span className="slider"></span>
                                </label>
                        </div>
                        

                    {
                    this.state.display ==='grid'?

                    <div id="grid-selection">
                        <div className="row">
                            {this.renderConcepts()}
                        </div>
                        <div className="text-center">
                            <Pager pageNum={this.state.totalPageNumber} callback={this.setCurrentPage.bind(this)}/>
                        </div>
                    </div>
                    
                    :
                    
                    <div>
                        <Slick listName={this.state.list.listName} items={this.state.list.concepts} onClick={this.handleClick.bind(this)}/>
                        <p>Double tap the thing you want, swipe left or right to navigate.</p>
                        <p>
                            <span className="slick-item-selected" > *Selected</span>
                            <br/>
                            <span className="slick-item-not-selected"> *Not Selected</span>    
                        </p>
                    </div>
                    }                    
                    <div className="text-center button-group">

                        {/* <button className="btn btn-lg btn-primary" onClick={this.passToListHandler.bind(this)}>Add to {this.state.list.handler.name}</button>
                        <button className="btn btn-lg btn-primary" onClick={this.handleCreateSublist.bind(this)}>Create Sub List</button>    */}
                        <button className="btn btn-lg btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
                    </div>  
                </div>

            </div>
        )
    }
}