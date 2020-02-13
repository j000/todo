<!-- vim: set tabstop=2 shiftwidth=2 noexpandtab: -->
<template>
	<v-card
		:color="cardcolor"
		class="pa-2"
		:elevation="fixedelevation"
	>
		<v-card-text>
			<p :class="{ 'done' : todo.done }">
				{{ todo.name }}
			</p>
			<p class="text-right font-weight-light caption">
				Zaktualizowano: {{ nicedate }}
			</p>
		</v-card-text>
		<v-card-actions>
			<v-btn
				fab small
				:color="checkcolor"
				v-on:click="toggleTodo"
				>
				<v-icon v-if="todo.done">mdi-checkbox-marked-circle-outline</v-icon>
				<v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn
				fab small
				color="warning"
				v-on:click="deleteTodo"
				><v-icon>mdi-delete</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	module.exports = {
		data: function() {
			return {
				showModal: false
			}
		},
		computed: {
			nicedate: function() {
				return moment(this.todo.updated).format('YYYY-MM-DD HH:mm:ss')
			},
			fixedelevation: function() {
				return this.todo.done ? 1 : 6
			},
			checkcolor: function() {
				return this.todo.done ? 'green' : 'accent'
			},
			cardcolor: function() {
				return this.todo.done ? ((this.$vuetify.theme.dark) ?
					'green darken-4' : 'light-green lighten-4')
					: '' 
					// ((this.$vuetify.theme.dark) ?
					// 	'grey darken-4' : 'grey lighten-2')
					// : ''
			},
		},
		props: ['todo'],
		methods: {
			updateTodo: function(event) {
				axios.put(
					'/todos/' + this.todo.id,
					this.todo,
					this.$root.axiosConfig
				).then(response => {
					this.todo = response.data
				}, error => {
					console.log(`Problem z połączeniem: ${error}`)
				})
			},
			toggleTodo: function(event) {
				this.todo.done = !this.todo.done
				this.updateTodo(event)
			},
			deleteTodo: function(event) {
				axios.delete(
					'/todos/' + this.todo.id,
					this.$root.axiosConfig
				).then(response => {
					console.log(response);
					this.$emit('delete-todo', this.todo.id);
				}, error => {
					console.log(`Problem z połączeniem: ${error}`)
				})
			},
		},
	}
</script>

<style>
.todo-item {
	margin-top: 0.25em;
	margin-bottom: 0.25em;
}
</style>
