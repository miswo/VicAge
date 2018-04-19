import React from 'react';
import Slider from 'react-slick';



export default class Slick extends React.Component{
    constructor(props){
        super(props);
    }

    renderItems(){
        const items = this.props.items? 
            this.props.items.map((item)=>(
                <div className="slick-item" id={item.id} key={item.id}>
                    <img src={item.imgUrl} className="responsive-img" onDoubleClick={this.onDoubleClick.bind(this)}/>
                    <h3>{item.conceptName}</h3>
                </div>
            ))
        :'';

        return items;
    }

    onDoubleClick(e){
        e.target.parentNode.className = e.target.parentNode.className ===  'slick-item active' ? 'slick-item' :'slick-item active'
        this.props.onDoubleClick(e);

    }


    render(){
        const settings = {
            dots:true,
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