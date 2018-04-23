var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


router.get('/community/all/:postcode',(req,res)=>{
    var collection = db.get().collection('community_service');
    collection.find({"Post code":req.params.postcode}).toArray((err,result)=>{
        data = []
        result.map((item)=>{
            data.push({
                "_id":item._id,
                "name":item["Name"],
                "address":item["Address"]
            })
        })

        res.json({services:data})
    })
})


router.get('/disability/all/:postcode',(req,res)=>{
    var collection = db.get().collection('disability_service_provider');
    collection.find({"Postcode":req.params.postcode}).toArray((err,result)=>{
        data = []
        result.map((item)=>{
            data.push({
                "_id":item._id,
                "name":item["Name"],
                "address":item["Address"]
            })
        })

        res.json({services:data})
    })
})

router.get('/agedcare/all/:postcode',(req,res)=>{
    var collection = db.get().collection('aged_care_service');
    collection.find({"Post Code":req.params.postcode}).toArray((err,result)=>{
        data = []
        result.map((item)=>{
            data.push({
                "_id":item._id,
                "address":item['Address'],
                "name":item["Name"]
            })
        })

        res.json({services:data})
    })
})


router.get('/hospital/all/:postcode',(req,res)=>{
    var collection = db.get().collection('hospital_locations');
    collection.find({"Postcode":req.params.postcode}).toArray((err,result)=>{
        data = []
        result.map((item)=>{
            data.push({
                "_id":item._id,
                "name":item['Name'],
                "address":item["Address"]
            })
        })

        res.json({services:data})
    })
})




//--------------------------- Service Detail API ---------------
router.get('/community/detail/:id',(req,res)=>{
    var collection = db.get().collection('community_service');
    collection.findOne({_id:ObjectID(req.params.id)},(err,result)=>{
        if(err) return err;
        res.json({
            data:result,
            address:result["Address"]

        })
    })
})

router.get('/disability/detail/:id',(req,res)=>{
    var collection = db.get().collection('disability_service_provider');
    collection.findOne({_id:ObjectID(req.params.id)},(err,result)=>{
        if(err) return err;
        res.json({
            data:result,
            "address":result["Address"]
        })
    })
})

router.get('/agedcare/detail/:id',(req,res)=>{
    var collection = db.get().collection('aged_care_service');
    collection.findOne({_id:ObjectID(req.params.id)},(err,result)=>{
        if(err) return err;
        res.json({
            data:result,
            "address":result['Address']
        })
    })
})

router.get('/hospital/detail/:id',(req,res)=>{
    var collection = db.get().collection('hospital_locations');
    collection.findOne({_id:ObjectID(req.params.id)},(err,result)=>{
        if(err) return err;
        res.json({
            data:result,
            "address":result["Address"]
        })
    })
})


module.exports = router;