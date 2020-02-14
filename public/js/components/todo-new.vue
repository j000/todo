<template>
	<v-btn
		fab
		fixed bottom right
		x-large
		dark color="accent"
		@click="dialog = true"
	>
		<v-icon>mdi-plus</v-icon>
		<v-dialog
			v-model="dialog"
			max-width="500px"
		>
			<v-card
				:color="cardcolor"
				class="pa-2"
			>
				<v-card-text>
					<v-textarea
						clearable
						auto-grow
						outlined
						class="ma-2"
						v-model="todo.name"
						label="Notatka"
						@keyup.ctrl.enter="saveTodo"
						hint="Ctrl+Enter aby zapisać"
					></v-textarea>
					<v-checkbox
						v-model="todo.done"
						hint="Oznacz jako zrobione?"
						label="Oznacz jako zrobione?"
						color="accent"
						></v-checkbox>
				</v-card-text>
				<v-card-actions>
					<v-btn class="ma-2" color="orange darken-2" @click="dialog = false">
 						<v-icon left>mdi-arrow-left</v-icon>
						Wróć
					</v-btn>
					<v-btn class="ma-2" color="red darken-2" @click="resetTodo">
						<v-icon left>mdi-delete</v-icon>
						Wyczyść
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn class="ma-2" color="light-green" @click="saveTodo">
						<v-icon left>mdi-cloud-upload</v-icon>
						Zapisz
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-btn>
</template>

<script>
	module.exports = {
		components: {
		},
		data: function() {
			return {
				todo: {
					name: '',
					done: false,
				},
				dialog: false,
			}
		},
		computed: {
			cardcolor: function() {
				return this.$vuetify.theme.dark ? 'grey darken-3' : ''
			}
		},
		methods: {
			resetTodo: function() {
				this.todo.name = ''
				this.todo.done = false
			},
			saveTodo: function() {
				if (this.todo.name === '')
					return
				axios.post(
					'/todos',
					this.todo,
					this.$root.axiosConfig
				).then(response => {
					this.resetTodo()
					this.dialog = false
					this.$parent.todos.push(response.data)
				}, error => {
					console.log('Problem z połączeniem: ' + error)
				})
			},
		},
		mounted: function() {
			axios.get(
				'/todos',
				this.$root.axiosConfig
			).then(response => {
				this.todos = response.data
			}, error => {
				console.log('Problem z połączeniem: ' + error)
			})
		},
	}
</script>
