var router = require('express').Router();
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


router.get('/community/:postcode',(req,res)=>{
    var collection = db.get().collection('community_service');
    collection.find({"Post code":req.params.postcode}).toArray((err,result)=>{
        data = []
        result.map((item)=>{
            data.push({
                "_id":item._id,
                "name":item["Community Service Organisation Name"],
                "address":item["Street Address"]
            })
        })

        res.json({services:data})
    })
})


router.get('/disability/:postcode',(req,res)=>{
    var collection = db.get().collection('disability_service_provider');
    collection.find({"Postcode":req.params.postcode}).toArray((err,result)=>{
        data = []
        result.map((item)=>{
            data.push({
                "_id":item._id,
                "name":item["Disability Service Provider  Name"],
                "address":item["Street Address"]
            })
        })

        res.json({services:data})
    })
})

router.get('/agedcare/:postcode',(req,res)=>{
    var collection = db.get().collection('aged_care_service');
    collection.find({"Physical Address Post Code":req.params.postcode}).toArray((err,result)=>{
        data = []
        console.log(result);
        result.map((item)=>{
            data.push({
                "_id":item._id,
                "address":item['Physical Address Line 1'] + ' ' + item['Physical Address Line 2'] ,
                "name":item["Service name"]
            })
        })

        res.json({services:data})
    })
})


router.get('/hospital/:postcode',(req,res)=>{
    var collection = db.get().collection('hospital_locations');
    collection.find({"Postcode":req.params.postcode}).toArray((err,result)=>{
        data = []
        console.log(result);
        result.map((item)=>{
            data.push({
                "_id":item._id,
                "name":item['LabelName'],
                "address":item["StreetNum"] +' '+ item["RoadName"]
            })
        })

        res.json({services:data})
    })
})






module.exports = router;