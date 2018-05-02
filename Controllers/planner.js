var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


router.get('/recipes/:recipeName',(req,res)=>{
    var collection = db.get().collection('recipe');
    collection.find({RecipeName:{$regex:".*"+req.params.recipeName+".*",$options:'i'}}).toArray((err,result)=>{
        if(err) console.log(err);
        res.json({recipes:result})
    })
})

module.exports = router;