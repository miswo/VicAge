var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;
var aws = require('../aws');

router.post('/slot',(req,res)=>{
    var data = req.body;
    var collection = db.get().collection('concept');
    var new_doc = {};
    collection.insertOne(new_doc,()=>{
        var id = new_doc._id.toString();
        var filename = id + '.' + data.filetype.split('/')[1];
        aws.sign(filename,data.filetype,(data)=>{
            res.json({
                _id:id,
                imgUrl:'https://s3-ap-southeast-2.amazonaws.com/vicage-image/' + filename,
                signedUrl:data
            })
        })
    })
})

router.post('/create',(req,res)=>{
    var data = req.body;
    var collection = db.get().collection('concept');
    collection.update({_id:ObjectID(data.id)},{
        imgUrl:data.imgUrl,
        conceptName:data.conceptName,
        conceptDescription:data.conceptDescription
    },(err,result)=>{
        if(err) return console.log(err);
        res.json({"result":"OK"})
    })
})


router.post('/list/create',(req,res)=>{
    var collection = db.get().collection('concept-list');
    collection.insertOne({
        listName:req.body.listName,
        concepts:req.body.concepts,
        createDate:new Date()
    },(err,result)=>{
        if(err) return console.log(err);
        res.json({status:200})
    })
})




module.exports = router;