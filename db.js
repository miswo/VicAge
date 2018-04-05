const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';
const dbName = 'vicagedb';
const url = "mongodb://wysdom-db-shard-00-00-8zcsc.mongodb.net:27017,wysdom-db-shard-00-01-8zcsc.mongodb.net:27017,wysdom-db-shard-00-02-8zcsc.mongodb.net:27017/admin?replicaSet=wysdom-db-shard-0&ssl=true";
const auth = {
    auth:{
        user: 'will',
        password:'ITwisdom'
    }}


var state = {
    db: null
};

exports.connect =(callback)=>{
    if(state.db) return callback();
    MongoClient.connect(url,auth,(err,client)=>{
        if(err) return callback(err);
        state.db = client.db(dbName);
        callback();
    })
}

exports.test = () =>{
    console.log(state.db.collection('event').find().toArray());
}

exports.get = ()=>{
    return state.db;
}

exports.close = (callback) =>{
    if(state.db){
        state.db.close((err,result)=>{
            state.db = null;
            callback();
        })
    }
}
