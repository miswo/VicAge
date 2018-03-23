const express = require('express');
const app = express()
const path = require('path');

app.use(express.static(__dirname + '/build'));
app.use('/*',express.static(__dirname + '/build'));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname+'/build/index.html'))
});


app.listen(80,()=>console.log('Server listenning on port 80..'))