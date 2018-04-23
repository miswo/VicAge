import React from 'react';

export default class Pager extends React.Component{


    constructor(props){
        super(props);
        this.state={
            pageNum:parseInt(this.props.pageNum),
            active:1
        }
    }

    renderPageButtons(){
        var pageButtons = [];
        for(var i=1;i<=this.state.pageNum;i++){
            pageButtons.push(
                <li className={this.state.active == i?"active":""} key={i} ><a href="" onClick={this.handlePageChange.bind(this)}>{i}</a></li>
            );
        }
        return(pageButtons);
    }
    componentWillReceiveProps(props){
        this.setState({pageNum:props.pageNum})
    }

    handlePageChange(e){
        e.preventDefault();
        var currentPage = parseInt(e.target.innerHTML);
        this.setState({active:currentPage});
        this.props.callback(currentPage);
    }

    render(){
        return(
            <nav aira-label="pager">
                <ul className="pagination">
                    {this.renderPageButtons()}
                </ul>
            </nav>
        )
    }


}