var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


router.post('/recipes',(req,res)=>{
    var collection = db.get().collection('recipe');
    var terms = req.body.terms;
    var terms_regex = terms.map((term)=>(
        new RegExp(".*"+term+".*","i")
    ));
    collection.find({RecipeName:{$all:terms_regex}}).toArray((err,result)=>{
        if(err) console.log(err);
        res.json({recipes:result})
    })
})


router.post('/add-new-meal',(req,res)=>{
    var collection = db.get().collection('plan');
    var newPlan = req.body;
    collection.save(newPlan,(err,result)=>{
        if(err) return console.log(err);
        res.json({status:200})
    })
})


router.post('/meal-plans',(req,res)=>{
    var collection = db.get().collection('plan');
    collection.find({
        userid:req.body.userid,
        profileid:req.body.profileid,
        type:'Meal'
        }).toArray((err,result)=>{
            if(err) console.log(err);
            res.json({mealPlans:result})
    })
})

router.get('/exercises',(req,res)=>{
    var collection = db.get().collection('exercise');
    collection.find({}).toArray((err,result)=>{
        res.json({exercises:result})
    })
})

router.post('/add-new-exercise',(req,res)=>{
    var collection = db.get().collection('plan');
    collection.save(req.body,(err,result)=>{
        if(err) return console.log(err);
        res.json({status:200});
    })
})


router.post('/exercise-plans',(req,res)=>{
    var collection = db.get().collection('plan');
    collection.find({
        userid:req.body.userid,
        profileid:req.body.profileid,
        type:'Exercise'
    }).toArray((err,result)=>{
        if(err) console.log(err);
        res.json({exercisePlans:result})
    })
})

module.exports = router;