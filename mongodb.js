const {MongoClient, ObjectID} = require('mongodb')

const connectURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectURL, { 'useNewUrlParser':true,useUnifiedTopology:true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to databse!')
    }

    const db = client.db(databaseName)

//    db.collection('users').updateOne({
//        _id: new ObjectID('5e9bcd30b320f60428c38590')
//    }, {
//       $inc:{
//           age:-1
//       }
//    }).then((result) => {
//        console.log(result)
//    }).catch((error) => {
//        console.log(error)
//    })

    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteMany({
        description:'Take a bath'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})
