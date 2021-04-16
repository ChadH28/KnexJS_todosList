const express = require('express');
// application object using express 
const app = express();
// PORT 
const port = process.env.PORT || 3000
// body parser
const bodyParser = require('body-parser');
// bringing in knex
var knex = require('./db/knex');

// Init middleware
app.use(bodyParser.json());
app.use(express.json({
    extended: false
}))

// creating GET req endpoint
app.get('/todos', (req,res) => {
    //  knex.raw(
    //      'SELECT * FROM todos'
    //  )
    //  .then(function(todos) {
    //      res.send(todos.rows);
    //  })
    knex
    .select()
    .from('todos')
    .then(function (todos) {
        res.send(todos)
    })
})

app.get('/todos/:id', (req,res) => {
    const {id} = req.params;
    //  knex.raw(
    //      'SELECT * FROM todos where id = 1'
    //  )
    //  .then(function(todo) {
    //      res.send(todo.rows);
    //  })
    knex
    .select()
    .from('todos')
    .where('id', id)
    .then(function (todo) {
        res.send(todo)
    })
})

app.get('/todos-of-user/:id', (req,res) => {
    const {id} = req.params;
    knex
    .from('todos')
    .innerJoin('users', 'todos.user_id', 'users.id')
    .where('todos.user_id', id)
    .then(function (userTodo) {
        res.send(userTodo)
    })
})


app.post('/todos', (req,res) => {
    const { title, user_id } = req.body;
    //  knex.raw(
    //     'INSERT INTO todos(title, user_id) VALUES($1, $2)',
    //     ['play some sports', '6']
    //  )
    //  .then(function() {
    //     knex.select()
    //     .from('todos')
    //     .then(function (todos) {
    //         res.send(todos)
    //     })
    //  })
    knex('todos')
    .insert({
        title: title,
        user_id: user_id,
    })
    .then(function () {
        knex
        .select()
        .from('todos')
        .then(function (todos) {
            res.send(todos)
        })
    })
})

app.put('/todos/:id', (req,res) => {
    const { field, value, title, completed } = req.body;
    const {id} = req.params;
    //  knex.raw(
    //     `UPDATE todos set ${field} = $1 where id = $2`,
    //     [value, id]
    //  )
    //  .then(function() {
    //     knex.select()
    //     .from('todos')
    //     .then(function (todos) {
    //         res.send(todos)
    //     })
    //  })
    knex('todos')
    .where('id', id)
    .update({
        title: title,
        completed: completed
    })
    .then(function () {
        knex
        .select()
        .from('todos')
        .then(function (todos) {
            res.send(todos)
        })
    })
})

app.delete('/todos/:id', (req,res) => {
    const {id} = req.params;
    //  knex.raw(
    //     `DELETE FROM todos set where id = $1`,
    //     [id]
    //  )
    //  .then(function() {
    //     knex.select()
    //     .from('todos')
    //     .then(function (todos) {
    //         res.send(todos)
    //     })
    //  })
    knex('todos')
    .where('id', id)
    .del()
    .then(function () {
        knex
        .select()
        .from('todos')
        .then(function (todos) {
            res.send(todos)
        })
    })
})

app.listen(port, () =>{
    console.log(`Listening on port: ${port}`)
});

module.exports = app;