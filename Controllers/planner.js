var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


router.post('/recipes/',(req,res)=>{
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


router.get('/meal-plans/:userid',(req,res)=>{
    var collection = db.get().collection('plan');
    collection.find({userid:req.params.userid}).toArray((err,result)=>{
        if(err) console.log(err);
        res.json({mealPlans:result})
    })
})

module.exports = router;