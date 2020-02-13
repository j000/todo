'use strict'

const express = require('express')

const app = express.Router()
const repository = require('../repositories/TodoRepository')

// get all todo items in the db
app.get('/', (req, res) => {
	repository.findAll()
		.then((todos) => res.json(todos))
		.catch((error) => console.log(error))
})

// get a todo item
app.get('/:id(\\d+)', (req, res) => {
	const { id } = req.params;
	repository.findById(id)
		.then((todo) => res.json(todo))
		.catch((error) => console.log(error))
})

// add a todo item
app.post('/', (req, res) => {
	const { name } = req.body;
	repository.create(name)
		.then((todo) => res.json(todo))
		.catch((error) => console.log(error))
})

// delete a todo item
app.delete('/:id(\\d+)', (req, res) => {
	const { id } = req.params;
	repository.deleteById(id)
		.then((ok) => res.status(200).json({}))
		.catch((error) => console.log(error));
})

// update a todo item
app.put('/:id(\\d+)', (req, res) => {
	const { id } = req.params;
	const todo = req.body;
	repository.updateById(id, todo)
		.then((newTodo) => res.status(200).json(newTodo))
		.catch((error) => console.log(error));
})

module.exports = app
