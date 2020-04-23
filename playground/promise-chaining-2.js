require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e9d4e9fa99f4f2ca4d3ab9e').then((task) => {
//     console.log('Task deleted ',task)
//     return Task.countDocuments({completed:false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const findAndDeleteTask = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

findAndDeleteTask('5e9e90d0055f190bc8d94683').then((incomplete) => {
    console.log(incomplete)
}).catch((e) => {
    console.log(e)
})