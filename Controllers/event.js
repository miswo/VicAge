var router = require('express').Router();
var db = require('../db');


router.get('/',(req,res)=>{
    var collection = db.get().collection('event');
    collection.find().toArray((err,docs)=>{
        res.json({events:docs})
    })
});

module.exports = router;