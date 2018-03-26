const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';
const dbName = 'vicagedb';
const url = "mongodb://wysdom-db.documents.azure.com:10255/?ssl=true";
const auth = {
    auth:{
        user: 'wysdom-db',
        password:'an9tNGnh6NSBYuKuWFu1ndWhlr2k72UcfD4g3MupR7lkrcRmUVrU92978zKYkmNMoXm8x2uAjUORiSPhiPO94g=='
    }
}

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



// Sample Code for MongoDB CRUD.
// const insertDocument = (db,callback)=>{
//     const collection = db.collection('event');

//     collection.insertMany([
//         {id:1,date:new Date()},
//         {id:1,date:new Date()},
//         {id:1,date:new Date()}
//     ],(err,result)=>{
//         assert.equal(err,null);
//         assert.equal(3,result.result.n);
//         assert.equal(3,result.ops.length);
//         console.log("Inserted 3 documents into the collection");
//         callback(result);
//     })
// }

// MongoClient.connect(url,(err,client) =>{
//     assert.equal(null,err);
//     console.log("Connected successfully to database");
//     const db = client.db(dbName);
//     client.close();
//     console.log("Connection closed.");
//     //insertDocument(db,()=>{client.close()})
// });
