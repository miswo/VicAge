var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


router.post('/login',(req,res)=>{
    var collection = db.get().collection('user');
    collection.findOne({userName:req.body.userName},(err,result)=>{
        if(err) return console.log(err);
        console.log(result);
        if(!result)
            res.json({status:403,message:'No Such User'})
        else if(result.password === req.body.password)
            res.json({status:200,message:'ok',data:{userName:result.userName,id:result._id,profile:result.profile}})
        else
            res.json({status:403,message:'Incorrect Password'})
    })
});



router.post('/register',(req,res)=>{
    var collection = db.get().collection('user');
    var newUser = req.body;
    newUser.profile={};

    collection.findOne({userName:req.body.userName},(err,result)=>{
        if(err) return console.log(err);
        if(result)
            res.json({status:403,message:'Email Already Exist.'})
        else{
            collection.save(newUser,(err,result)=>{
                if(err) return console.log(err);
                res.json({status:200,message:'ok',data:{userName:result.userName,id:result._id,profile:result.profile}})
            })
        }
    })
        
});


router.post('/profile',(req,res)=>{
    var collection = db.get().collection('user');
    collection.findOneAndUpdate(
        {_id:ObjectID(req.body._id)},
        {$set:{profile:req.body.profile}},
        (err,result)=>{
            if(err) return console.log(err)
            res.json({status:200})
    })
})

router.get('/profile/:userid',(req,res)=>{
    var collection = db.get().collection('user');
    collection.findOne(
        {_id:ObjectID(req.params.userid)},
        (err,result)=>{
            if(err) return console.log(err);
            res.json({profile:result.profile})
        }
    )
})



module.exports = router;