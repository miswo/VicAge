import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default class CalorieCalculatorPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.data,
            concepts:[],
            energy:[],
            totalCal:0,
            DI:2080
        }
    }

    componentDidMount(){
        if(!this.state.data) return;
        for(var i=0;i<this.state.data.length;i++){
            axios.get(this.props.serverURL+'/concept/detail/'+this.state.data[i])
            .then((res)=>{
                var concepts = this.state.concepts;
                concepts.push(res.data.concept);

                var energy = this.state.energy;
                energy.push({
                    id:res.data.concept._id,
                    energy:parseInt(res.data.concept.data.energy),
                    quantity:1
                })
                this.setState({concepts,energy})
            })
        }
    }

    renderConcepts(){
        const conceptBlocks = this.state.concepts?
        this.state.concepts.map((item)=>(
            <div key={item._id} id={item._id} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <div className="concept-block">
                    <div className="img-wrapper">
                            <img src={item.imgUrl} alt={item.conceptName} />
                    </div>
                    <h5>{item.conceptName}</h5>
                </div>
                <div className="concept-quantity">
                    <p>Quantity:</p>
                    <input  onChange={this.handleQuantityChange.bind(this) }className="form-control" defaultValue={1} type="number"/>
                </div>
            </div>
        ))

        :
        <p>There is no concepts selected...</p>;

        return conceptBlocks;

    }

    handleQuantityChange(e){
        var newQuantity = e.target.value;
        while(e.target.id.length == 0){
            e.target = e.target.parentNode;
        }
        const id = e.target.id;
        var energy = this.state.energy;
        for(var i=0;i<energy.length;i++){
            if(energy[i].id === id)
                energy[i].quantity = newQuantity;
        }

        this.setState({energy})

    }

    totalCalorie(){
        var cal = this.state.energy;
        var total = 0;
        for(var i=0;i<this.state.energy.length;i++){
            total = total + this.state.energy[i].energy * this.state.energy[i].quantity
        }

        return total;
    }

    render(){
        return(
                
            <div id="calorie-calculator">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Calorie Calculator</h2>
                        <p>Input quantity and get the result</p>
                        <p>*Quantity Based on per standard serve,Daily Intake Energy based on average.</p>
                        
                    </div>
                </div>


                <div className="container">
                    <div className="row">
                        {this.renderConcepts()}
                    </div>
                    <hr/>
                    <p className="lead">Total Calorie:{this.totalCalorie()} KCal</p>
                    <p className="lead">Daily Intake Energy Complete:{Math.round(this.totalCalorie()/this.state.DI * 100)} % </p>
                    <NavLink to="/list/detail/5adb9db2a13eac29fc7f01f6" className="btn btn-primary">Select Another Set</NavLink>
                </div>
            </div>
        )
    }
}