<!-- vim: set tabstop=2 shiftwidth=2 noexpandtab: -->
<template>
	<v-container>
		<v-row v-if="todos.length">
			<v-col
				cols="12" sm="12" lg="6" xl="4"
				v-for="todo in todos"
			>
				<todo-item
					:todo="todo"
					v-on:delete-todo="deleteTodo"
				></todo-item>
			</v-col>
		</v-row dense>
		<new-item>
		</new-item>
	</v-container>
</template>

<script>
	module.exports = {
		components: {
			'todo-item': httpVueLoader('./todo-item.vue'),
			'new-item': httpVueLoader('./todo-new.vue'),
		},
		data: function() {
			return {
				todos: [],
			}
		},
		methods: {
			deleteTodo: function(id) {
				console.log('deleteTodo(): ' + id)
				const todoIndex = this.todos.findIndex(item => item.id === id)
				this.todos.splice(todoIndex, 1)
			},
		},
		mounted: function() {
			axios.get(
				'/todos',
				this.$root.axiosConfig
			).then(response => {
				this.todos = response.data
			}, error => {
				console.log('Problem z połączeniem')
			})
		},
	}
</script>
