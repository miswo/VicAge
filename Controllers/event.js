var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


router.get('/',(req,res)=>{
    var collection = db.get().collection('event');
    collection.find().toArray((err,docs)=>{
        res.json({events:docs})
    })
});

router.get('/:id',(req,res)=>{
    var docID = new ObjectID(req.params.id);
    var collection = db.get().collection('event');
    var result = collection.findOne({_id:docID},(err,result)=>{
        res.json(result);
    })
});



router.post('/create',(req,res)=>{
    var newEvent = req.body;
    var collection = db.get().collection('event');
    collection.save(newEvent,(err,result)=>{
        if(err) return console.log(err);
        else res.json({result:"ok",_id:newEvent._id})
    })
})

module.exports = router;