import React from 'react';
import Slider from 'react-slick';



export default class Slick extends React.Component{
    constructor(props){
        super(props);
    }

    renderItems(){
        const items = this.props.items? 
            this.props.items.map((item)=>(
                <div className="slick-item" id={item._id} key={item._id}>
                    <img src={item.imgUrl} className="responsive-img" onClick={this.onClick.bind(this)}/>
                    <h3>{item.conceptName}</h3>
                </div>
            ))
        :'';

        return items;
    }

    onClick(e){
        e.target.parentNode.className = e.target.parentNode.className ===  'slick-item active' ? 'slick-item' :'slick-item active'
        this.props.onClick(e);

    }


    render(){
        const settings = {
            dots:false,
            infinite:false,
            speed:500,
            slidesToShow:1,
            slideToScroll:1
        };

        return (
            <div id="slick-slider-wrapper">
                <h3> {this.props.listName}</h3>
                <Slider {...settings}>
                    {this.renderItems()}
                </Slider>
            </div>
        )
    }
}