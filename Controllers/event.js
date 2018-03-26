var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


router.get('/',(req,res)=>{
    var collection = db.get().collection('event');
    collection.find().toArray((err,docs)=>{
        if(err) return console.log(err);
        res.json({events:docs})
    })
});

router.get('/:id',(req,res)=>{
    var collection = db.get().collection('event');
    collection.findOne({_id:ObjectID(req.params.id)},(err,result)=>{
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
        conceptName:newSurvey.conceptName},(err,result)=>{
            if(result){
                collection.findOneAndUpdate({
                    eventID:newSurvey.eventID,
                    conceptName:newSurvey.conceptName},
                    {$inc:{count:1}
                },(err,result)=>{
                        res.json({result:'ok'})
                    })
            }else{
                collection.insertOne({
                    eventID:newSurvey.eventID,
                    conceptName:newSurvey.conceptName,
                    count:1
                },(err,result)=>{
                    res.json({result:'ok'})
                })
            }
        });



    // console.log(surveyResult);
    // collection.save({
    //     eventID:newSurvey.eventID,
    //     conceptName:newSurvey.conceptName,
    //     count:count},(err,result)=>{
    //         if(err) return console.log(err);
    //         else res.json({result:"ok"})
    //     })
});

router.get('/:id/survey',(req,res)=>{
    var collection = db.get().collection('concept');
    collection.find().toArray((err,docs)=>{
        res.json({concepts:docs})
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


router.delete('/delete/:id',(req,res)=>{
    var event_collection = db.get().collection('event');
    var survey = db.get().collection('survey')
    event_collection.remove({'_id':ObjectID(req.params.id)},(err,result)=>{
        if(err) return res.json({result:'error'})
        else
            survey.remove({'eventID':req.params.id},(err,result)=>{
                if(err) return res.json({result:'error'})
                else
                    res.json({result:'ok'})
            })
    })
})

module.exports = router;