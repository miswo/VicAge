var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

router.post('/create',(req,res)=>{
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

//

router.get('/all',(req,res)=>{
    var collection = db.get().collection('concept-list');
    collection.find({}).toArray((err,result)=>{
        if(err) console.log(err);
        else res.json({lists:result})
    })
})

router.get('/detail/:id',(req,res)=>{
    var collection = db.get().collection('concept-list');
    collection.findOne({_id:ObjectID(req.params.id)},(err,result)=>{
        if(err) console.log(err);
        else res.json({data:result})
    })
})

module.exports = router;