var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


router.get('/recipes/:recipeName',(req,res)=>{
    var colelction = db.get().collection('recipe');
    collection.find({recipeName:{$regex:".*"+req.params.recipeName+".*"}}).toArray((err,result)=>{
        if(err) console.log(err);
        console.log(result);
    })
})

module.exports = router;