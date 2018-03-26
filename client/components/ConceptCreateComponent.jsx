import React from 'react';
import Dropzone from 'react-dropzone';

export default class ConceptCreateComponent extends React.Component{
    
    

    handleSubmit(e){
        e.preventDefault();
        console.log('submit');
    }

    onDrop(file){
        const req = request.post('/concept/create');
        req.attach(file.name)
    }

    
    render(){
        return(
            <form id="concept-create-compoenent" className="form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="form-group">
                            <label htmlFor="concept-image">Concept Image:</label>
                            <Dropzone accept="image/jpeg,image/png" className="drop-zone">
                                <span className="glyphicon glyphicon-plus" ></span>
                            </Dropzone>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="form-group">
                            <label htmlFor="concept-name">Concept Name:</label>
                            <input required type="text" className="form-control" id="concept-name"/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="form-group">
                            <label htmlFor="concept-description">Concept Description:</label>
                            <textarea className="form-control" rows="5" />
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}