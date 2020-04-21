require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5e9d4e9fa99f4f2ca4d3ab9e').then((task) => {
    console.log('Task deleted ',task)
    return Task.countDocuments({completed:false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})