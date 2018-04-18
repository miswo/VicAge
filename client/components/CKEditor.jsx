import React from 'react';


export default class CKEditor extends React.Component{
    constructor(props){
        super(props);
    }


    componentDidMount(){
        ClassicEditor.create(document.querySelector("#editor"))
            .then((editor)=>{
                editor.setData(this.props.text);
                editor.model.document.on('change',()=>{
                    this.props.onChange(editor.getData())
                })
            })
    }

    render(){

        return(
            <div id="ck-editor">
                <div id="editor">
                    Loading...
                </div>
        </div>

        )
        
    }
}