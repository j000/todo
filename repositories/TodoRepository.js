'use strict'

const sequelize = require('../Sequelize')

class TodoRepository {
	constructor(model) {
		this.model = model
	}

	// create a new todo
	create(name, done) {
		const newTodo = this.model.build({
			name,
			done
		})

		return newTodo.save()
	}

	// return all todos
	findAll() {
		return this.model.findAll()
	}

	// find todo by the id
	findById(id) {
		return this.model.findByPk(id)
	}

	// delete todo
	deleteById(id) {
		return this.findById(id)
			.then((todo) => todo.destroy())
	}

	// update todo
	updateById(id, object) {
		return this.findById(id)
			.then((todo) => {
				if ('name' in object)
					todo.name = object.name
				if ('done' in object)
					todo.done = object.done
				return todo.save()
			})
	}
}

module.exports = new TodoRepository(sequelize.models.Todo);
