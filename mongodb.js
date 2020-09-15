// const mongodb = require("mongodb");
// const mongoClient = mongodb.MongoClient;

//shorthand for the obove lines

const {MongoClient, ObjectId} = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task_manager";
const collectionName = "users";

//new collection Task
const dbName_2 = "tasks";
const collectionName_2 = "tasks";

// MongoClient.connect(  connectionURL,  { useNewUrlParser: true },  (error, client) => {
//     if (error) {
//       return console.log("Connection Error: Unable to connect to Database");
//     }

//     const db = client.db(databaseName);
//     db.collection(collectionName).insertOne({
//       name: "Satish",
//       age: "35",
//     });
//   }
// );

//connection to tasks collection.

MongoClient.connect(  connectionURL,  { useNewUrlParser: true, useUnifiedTopology:true },  (error, tasksclient) => {
    if (error) {
      return console.log("Error: Connection error. Try after sometimg");
    }

    const taskCollection = tasksclient.db(dbName_2);
    // taskCollection.collection(collectionName_2).insertMany([{
    //     task:'wrting',
    //     status:'complete'
    // },{
    //     task:'reading',
    //     status:'In progress'
    // },{
    //     task:'drawing',
    //     status:'Not started',
    //     code:'20'
    // }],(error,result) => {
    //     if(error){
    //         return console.log("Unable to insert the record to the tasks database");
    //     }
    //     console.log(result.ops)
    // })

    // taskCollection.collection(collectionName_2).findOne({_id: new ObjectId("5f5cb5a1396c8434f82fd44c")},(error,result)=>{
    //     if(error){
    //         return console.log('Unable to fetch the record')
    //     }

    //     console.log(result)
    // })

    //Find operation

    // taskCollection.collection(collectionName_2).find({status:'Not started'}).toArray((error, result)=>{
    //     if(error) {
    //         console.log('Unable to fetch')
    //     }
    //     console.log(result)
    // })

    // taskCollection.collection(collectionName_2).find({status:'Not started'}).count((error, count)=>{
    //     if(error) {
    //         console.log('Unable to fetch')
    //     }
    //     console.log(count)
    // })

    //Update operation to update the task document using updateOne / updateMany

    // taskCollection.collection(collectionName_2).updateMany({
    //         //status: "complete"  //filter like where conditions in SQL
    //         "_id" : ObjectId("5f5cb51b1bbcbe57c05ceedf")
    //     },{
    //         $set:{
    //             status : "Unknown"  // set the value with data
    //         }
    //     }).then((resolve)=>{
    //     console.log(resolve.modifiedCount)
    // }).catch((reject)=>{
    //     console.log(reject)
    // })

    //Delete operation to delete the document using deleteOnce / deleteMany

    taskCollection.collection(collectionName_2).deleteOne({
        "_id" : ObjectId("5f5cb51b1bbcbe57c05ceedf")
    }).then((resolve)=>{
        console.log(resolve.deletedCount)
    }).catch((reject)=>{
        console.log(error)
    })

  }
);
