var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


router.post('/create',(req,res)=>{
    var collection = db.get().collection('goal');
    collection.save({
        title:req.body.title,
        concept:req.body.concept,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        desc:req.body.desc,
        type:req.body.type,
        completed:false,
        userid:req.body.userid
    },(err,result)=>{
        if(err) return console.log(err);
        res.json({status:200})
    })
});

router.get('/user/:userid',(req,res)=>{
    var collection = db.get().collection('goal');
    collection.find({userid:req.params.userid}).toArray((err,result)=>{
        if(err) return console.log(err);
        res.json({goals:result})
    })
})

router.post('/completed/:goalid',(req,res)=>{
    var collection = db.get().collection('goal');
    collection.findOneAndUpdate(
        {_id:ObjectID(req.params.goalid)},
        {$set:{completed:req.body.completed}},
        (err,result)=>{
            if (err) return console.log(err);
            res.json({status:200})
        }
    )
})



module.exports = router;