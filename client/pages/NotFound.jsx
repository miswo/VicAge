import React from 'react';


export default class NotFound extends React.Component{
    

    render(){
        return(
            <div id="404-not-found">
                <div className="jumbotron banner">
                    <div className="container">
                        <h2>Oops, No such page.</h2>
                        <p>This is a typical 404 not found.</p>
                    </div>
                </div>
            </div>
        )
    }
}