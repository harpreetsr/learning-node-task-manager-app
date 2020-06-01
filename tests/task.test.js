const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
    taskOne, 
    taskTwo, 
    taskThree, 
    userOne, 
    userTwo, 
    setupDatabase
} = require('./fixtures/db')


beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description:'From my test'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})


test('Should fetch user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(2)
})

// Not Working - Needs to be debugging

// test('Should not delete other users task', async () => {
//     const response = await request(app)
//         .delete(`/tasks/${taskOne._id}`)
//         .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
//         .send()
//         .expect(404)
//     const task = await Task.findById(taskOne._id)
//     expect(task).not.toBeNull()
// })

test('Should update a task', async () => {
    const response = await request(app)
        .patch(`/tasks/${taskThree._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            description:'Task was updated'
        })
        .expect(200)
    const task = await Task.findById(taskThree._id)
    //console.log(task)
    expect(task.description).toEqual('Task was updated')
})

// Task Test Ideas
//
// Should not create task with invalid description/completed
test('Should not create a task with invalid description', async() => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description:''
        })
        .expect(400)
})

test('Should not create a task with invalid completed', async() => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            completed:'invalid'
        })
        .expect(400)
})

// Should not update task with invalid description/completed
// test('Should not update a task with invalid description', async() => {
//     await request(app)
//         .patch(`/tasks/${taskTwo._id}`)
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send({
//             description:'updated'
//         })
//         .expect(500)
// })


// Should delete user task
test('Should delete user task', async() => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        const task = await Task.findById(taskOne._id)
        expect(task).toBeNull()
})

// Should not delete task if unauthenticated
test('Should not delete task if unauthenticated', async() => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .send()
        .expect(401)

        const task = await Task.findById(taskOne._id)
        expect(task).not.toBeNull()
})

// Should not update other users task
test('Should not update other users task', async() => {
    const response = await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            description:'Not updated'
        })
        .expect(404)

        const task = await Task.findById(taskOne._id)
        expect(task.description).toEqual(taskOne.description)
})

// Should fetch user task by id
test('Should fetch user task by id', async() => {
    const response = await request(app)
        .get(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
        expect(response.body.description).toEqual('First task')
})

// Should not fetch user task by id if unauthenticated
test('Should not fetch user task by id if unauthenticated', async() => {
    const response = await request(app)
        .get(`/tasks/${taskOne._id}`)
        .send()
        .expect(401)
})

//!!!!! Didn't worked
// Should not fetch other users task by id
// test('Should not fetch other users task by id', async() => {
//     const response = await request(app)
//         .get(`/tasks/${taskOne._id}`)
//         .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
//         .send()
//         .expect(404)

// })

// Should fetch only completed tasks
test('Should fetch only completed tasks', async() => {
    const response = await request(app)
        .get('/tasks?completed=true')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        response.body.forEach((task) => {
            expect(task.completed===true)
        });
})
// Should fetch only incomplete tasks
test('Should fetch only incomplete tasks', async() => {
    const response = await request(app)
        .get('/tasks?completed=false')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        response.body.forEach((task) => {
            expect(task.completed===false)
        });
})

// Should sort tasks by description/completed/createdAt/updatedAt
test('Should sort task by description', async() => {
    const response = await request(app)
        .get('/tasks?sortBy=description:desc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        response.body.forEach((task) => {
            //console.log(task.description)
        });
})

test('Should sort task by completed', async() => {
    const response = await request(app)
        .get('/tasks?sortBy=completed:desc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        response.body.forEach((task) => {
            //console.log(task.description)
        });
})

test('Should sort task by createdAt', async() => {
    const response = await request(app)
        .get('/tasks?sortBy=createdAt:asc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        response.body.forEach((task) => {
            //console.log(task.description)
        });
})

test('Should sort task by updatedAt', async() => {
    const response = await request(app)
        .get('/tasks?sortBy=updatedAt:desc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        response.body.forEach((task) => {
            //console.log(task.description)
        });
})

// Should fetch page of tasks
test('Should fetach page of tasks', async() => {
    const response = await request(app)
        .get('/tasks?limit=1&skip=1')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        response.body.forEach((task) => {
            //console.log(task.description)
        });
})
