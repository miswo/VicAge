const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'care4udb';

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

MongoClient.connect(url,(err,client) =>{
    assert.equal(null,err);
    console.log("Connected successfully to database");
    const db = client.db(dbName);
    client.close();
    console.log("Connection closed.");
    //insertDocument(db,()=>{client.close()})
});