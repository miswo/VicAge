const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';
const dbName = 'vicagedb';
const url = "mongodb://wysdom-db-shard-00-00-8zcsc.mongodb.net:27017,wysdom-db-shard-00-01-8zcsc.mongodb.net:27017,wysdom-db-shard-00-02-8zcsc.mongodb.net:27017/admin?replicaSet=wysdom-db-shard-0&ssl=true";
const auth = {
    auth:{
        user: 'will',
        password:'ITwisdom'

    }
}

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