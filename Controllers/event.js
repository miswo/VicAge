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
    collection.findOne({},{_id:docID},(err,result)=>{
        res.json(result);
    })
});

router.get('/:id/survey-result',(req,res)=>{
    var collection = db.get().collection('survey');
    collection.find({eventID:req.params.id}).toArray((err,result)=>{
        res.json({surveyResults:result});
    })
});

router.post('/handleSurvey',(req,res)=>{
    var newSurvey = req.body;

    var collection = db.get().collection('survey');

    collection.findOne({
        eventID:newSurvey.eventID,
        activityName:newSurvey.activityName},(err,result)=>{
            if(result){
                collection.findOneAndUpdate({
                    eventID:newSurvey.eventID,
                    activityName:newSurvey.activityName},
                    {$inc:{count:1}
                },(err,result)=>{
                        res.json({result:'ok'})
                    })
            }else{
                collection.insertOne({
                    eventID:newSurvey.eventID,
                    activityName:newSurvey.activityName,
                    count:1
                },(err,result)=>{
                    res.json({result:'ok'})
                })
            }
        });



    // console.log(surveyResult);
    // collection.save({
    //     eventID:newSurvey.eventID,
    //     activityName:newSurvey.activityName,
    //     count:count},(err,result)=>{
    //         if(err) return console.log(err);
    //         else res.json({result:"ok"})
    //     })
});



router.get('/:id/survey',(req,res)=>{
    var collection = db.get().collection('activity');
    collection.find().toArray((err,docs)=>{
        res.json({activities:docs})
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