var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


router.post('/login',(req,res)=>{
    var collection = db.get().collection('user');
    collection.findOne({user:req.body.userName},(err,result)=>{
        if(err) return console.log(err);
        if(!result)
            res.json({status:403,message:'No Such User'})
        else if(result.password === req.body.password)
            res.json({status:200,message:'ok',data:{user:result.user,id:result._id}})
        else
            res.json({status:403,message:'Incorrect Password'})
    })
});




module.exports = router;