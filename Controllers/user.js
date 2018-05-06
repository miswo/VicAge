var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


router.post('/login',(req,res)=>{
    var collection = db.get().collection('user');
    collection.findOne({userName:req.body.userName},(err,result)=>{
        if(err) return console.log(err);
        if(!result)
            res.json({status:403,message:'No Such User'})
        else if(result.password === req.body.password)
            res.json({status:200,message:'ok',data:{
                userName:result.userName,
                id:result._id,
                profile:result.profile,
                allProfile:result.allProfile
            }})
        else
            res.json({status:403,message:'Incorrect Password'})
    })
});



router.post('/register',(req,res)=>{
    var collection = db.get().collection('user');
    var profileCollection = db.get().collection('profile');

    var newUser = req.body;
    collection.findOne({userName:req.body.userName},(err,result)=>{
        if(err) return console.log(err);
        if(result)
            res.json({status:403,message:'Email Already Exist.'})
        else{
            var newProfile = {};
            profileCollection.insert(newProfile,(err,result)=>{
                if(err) return console.log(err);
                newUser.profile = {id:newProfile._id.toString()};
                newUser.allProfile = [newProfile._id.toString()];
                collection.insert(newUser,(err,result)=>{
                    if(err) return console.log(err);
                    res.json({status:200,message:'ok',data:{
                        userName:newUser.userName,
                        id:newUser._id.toString(),
                        profile:newUser.profile,
                        allProfile:newUser.allProfile
                    }
                })
            })
                    
            })
        }
    })
        
});


router.post('/profile',(req,res)=>{
    console.log(req.body);
    var collection = db.get().collection('user');
    var profileCollection = db.get().collection('profile');

    var profile = req.body.profile;

    collection.findOneAndUpdate(
        {_id:ObjectID(req.body._id)},
        {$set:{profile}},
        (err,result)=>{
            if(err) return console.log(err)
            profileCollection.findOneAndUpdate(
                {_id:ObjectID(req.body.profile.id)},
                {$set:{
                    age:profile.age,
                    gender:profile.gender,
                    height:profile.height,
                    weight:profile.weight,
                    activeLevel:profile.activeLevel
                }}
            ,(err,result)=>{
                if(err) return console.log(err);
                console.log('success');
                res.json({status:200})
            })
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