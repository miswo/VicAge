var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;
var aws = require('../aws');

const magicWord = 'youshallnotpass';

router.post('/slot',(req,res)=>{
    var data = req.body;
    var collection = db.get().collection('concept');
    var new_doc = {};
    collection.insertOne(new_doc,()=>{
        var id = new_doc._id.toString();
        var filename = id + '.' + data.filetype.split('/')[1];
        aws.sign(filename,data.filetype,(data)=>{
            res.json({
                _id:id,
                imgUrl:'https://s3-ap-southeast-2.amazonaws.com/vicage-image/' + filename,
                signedUrl:data
            })
        })
    })
})

router.post('/create',(req,res)=>{
    var data = req.body;
    var collection = db.get().collection('concept');
    collection.update({_id:ObjectID(data.id)},{
        imgUrl:data.imgUrl,
        conceptName:data.conceptName,
        conceptDescription:data.conceptDescription
    },(err,result)=>{
        if(err) return console.log(err);
        res.json({"result":"OK"})
    })
})


router.get('/detail/:id',(req,res)=>{
    var collection = db.get().collection('concept');
    collection.findOne({_id:ObjectID(req.params.id)},(err,result)=>{
        if(err) console.log(err);
        else res.json({concept:result})
    })
})

router.post('/update/:id',(req,res)=>{
    var data = req.body;
    if(data.password != magicWord)
        res.json({
            status:403,
            message:'Password Incorrect.'
        })
    else{
        var collection = db.get().collection('concept');
        collection.findOneAndUpdate({
            _id:ObjectID(req.params.id),
            conceptDescription:data.conceptDescription},
            (err,result)=>{
                res.json({
                    status:200,
                    message:'ok'
                })
            })
    }
})


module.exports = router;