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
            var newProfile = {name:'default name'};
            profileCollection.insert(newProfile,(err,result)=>{
                if(err) return console.log(err);
                newUser.profile = {id:newProfile._id.toString(),name:'default name'};
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
                    name:profile.name,
                    age:profile.age,
                    gender:profile.gender,
                    height:profile.height,
                    weight:profile.weight,
                    activeLevel:profile.activeLevel
                }}
            ,(err,result)=>{
                if(err) return console.log(err);
                res.json({status:200})
            })
    })
})

router.get('/profile/:profileid',(req,res)=>{
    var collection = db.get().collection('profile');
    collection.findOne(
        {_id:ObjectID(req.params.profileid)},
        (err,result)=>{
            if(err) return console.log(err);
            res.json({profile:result})
        }
    )
})

router.post('/profiles/',(req,res)=>{
    var collection = db.get().collection('profile');

    var allProfile = req.body.allProfile;

    for(var i=0;i<allProfile.length;i++)
        allProfile[i] = ObjectID(allProfile[i]);

    collection.find({_id:{$in:allProfile}}).toArray((err,result)=>{
        if(err) return console.log(err);
        res.json({profiles:result})
    })

});

router.post('/new-profile/',(req,res)=>{
    var profileCollection = db.get().collection('profile');
    var collection = db.get().collection('user');


    var newProfile = {name:'default name'};
    profileCollection.insertOne(newProfile,(err,result)=>{
        if(err) console.log(err)

        console.log(newProfile);
        var allProfile = req.body.allProfile;
        allProfile.push(newProfile._id.toString());

        collection.findOneAndUpdate({_id:Object(req.body.userid)},{allProfile})

        res.json({profile:{id:newProfile._id.toString(),name:newProfile.name},allProfile})
    })
})



module.exports = router;