const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';
const dbName = 'vicagedb';
const url = "mongodb://wysdom-db.documents.azure.com:10255/?ssl=true";
const auth = {
    auth:{
        user: 'wysdom-db',
        password:'an9tNGnh6NSBYuKuWFu1ndWhlr2k72UcfD4g3MupR7lkrcRmUVrU92978zKYkmNMoXm8x2uAjUORiSPhiPO94g=='
    }}



MongoClient.connect(url,auth,(err,db)=>{
    // if(err) return console.log(err);
    // db = db.db('test')
    // db.collection('event').find().toArray((err,result)=>{
    //     console.log(result)
    // });
    if(err) return console.log(err);
    db.db(dbName).collection('test').insertOne({
        'name':'hi',
        'value':'test'
    },(err)=>{
        if(err) return console.log(err);
        console.log('Insert success');
        db.close();
    })

})