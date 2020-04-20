const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

// const User = mongoose.model('User', {
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid!')
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minlength:7,
//         validate(value){
//            if(value.toLowerCase().includes('password')){
//                 throw new Error('You cannot use "password" as password')
//             }
//         }
//     },
//     age:{
//         type:Number,
//         validate(value){
//             if(value<0){
//                 throw new Error('Age must be a postive number')
//             }
//         }
//     }
// })

// const user = new User({
//     name:' Harpreet ',
//     email:' HarpreetWP@gmail.com ',
//     password:'password123'
// })

// user.save().then(() => {
//     console.log(user)
// }).catch((error) => {
//     console.log(error)
// })


const Task = mongoose.model('Task', {
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
     }
})

const task = new Task({
    description:'Final task to do!',
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error)
})