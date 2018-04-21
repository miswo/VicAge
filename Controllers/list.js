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
    collection.findOne({_id:ObjectID(req.params.id)},(err,list)=>{
        if(err) console.log(err);
        else{
            var concept_ids =[]
            for(var i=0;i<list.concepts.length;i++){
                console.log(list.concepts[i].id)
                concept_ids.push(ObjectID(list.concepts[i].id))
            }
                
            db.get().collection('concept').find({_id:{$in:concept_ids}}).toArray((err,concepts)=>{
                if (err) console.log(err);
                else{
                    list.concepts = concepts;
                    res.json({list:list})
                }
            })
        }
    })
})

module.exports = router;