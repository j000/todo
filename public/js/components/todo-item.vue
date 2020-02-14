<!-- vim: set tabstop=2 shiftwidth=2 noexpandtab: -->
<template>
	<v-card
		:color="cardcolor"
		class="pa-2"
		:elevation="fixedelevation"
	>
		<v-card-text>
			<v-textarea
				v-model="todo.name"
				auto-grow
				rows="1"
				@keyup.ctrl.enter="updateTodo"
				@change="updateTodo"
				hint="Zakończ edycję, albo naciśnij Ctrl+Enter, aby zapisać"
			></v-textarea>
			<p class="text-right font-weight-light caption">
				Zaktualizowano: {{ nicedate }}
			</p>
		</v-card-text>
		<v-card-actions>
			<v-btn
				fab small
				:color="checkcolor"
				class="white--text"
				v-on:click="toggleTodo"
				>
				<v-icon v-if="todo.done">mdi-checkbox-marked-circle-outline</v-icon>
				<v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<v-speed-dial
				v-model="fab"
				small
				direction="left"
				transition="scale-transition"
			>
				<template v-slot:activator>
					<v-btn
						v-model="fab"
						color="blue darken-2"
						:loading="saving"
						dark
						fab small
					>
						<v-icon v-if="fab">mdi-close</v-icon>
						<v-icon v-else>mdi-delete</v-icon>
						<template v-slot:loader>
							<span class="custom-loader">
								<v-icon>mdi-cached</v-icon>
							</span>
						</template>
					</v-btn>
				</template>
			<v-btn
				fab small
				color="error"
				v-on:click="deleteTodo"
				><v-icon>mdi-delete</v-icon>
			</v-btn>
			</v-speed-dial>
		</v-card-actions>
	</v-card>
</template>

<script>
	module.exports = {
		data: function() {
			return {
				showModal: false,
				fab: false,
				saving: false,
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
			},
		},
		props: ['todo'],
		methods: {
			updateTodo: function(event) {
				this.saving = true
				axios.put(
					'/todos/' + this.todo.id,
					this.todo,
					this.$root.axiosConfig
				).then(response => {
					this.todo = response.data
					this.saving = false
				}, error => {
					console.log(`Problem z połączeniem: ${error}`)
					this.saving = false
				})
			},
			toggleTodo: function(event) {
				this.todo.done = !this.todo.done
				this.updateTodo(event)
			},
			deleteTodo: function(event) {
				this.saving = true
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
