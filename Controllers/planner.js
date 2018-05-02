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

module.exports = router;