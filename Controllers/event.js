var router = require('express').Router();
var db = require('../db');


router.get('/',(req,res)=>{
    var collection = db.get().collection('event');
    collection.find().toArray((err,docs)=>{
        res.json({events:docs})
    })
});

router.post('/create',(req,res)=>{
    console.log(req.body);
    var collection = db.get().collection('event');
    collection.save(req.body,(err,result)=>{
        if(err) return console.log(err);
        else console.log('Inserted..');
    })
})

module.exports = router;