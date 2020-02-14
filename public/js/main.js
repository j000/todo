const app = new Vue({
	el: '#app',
	vuetify: new Vuetify(),
	components: {
		'list': httpVueLoader('./js/components/todo-list.vue'),
	},
	data: {
		message: 'Hello Vue!',
		endpoint: '/',
		axiosConfig: {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				"Access-Control-Allow-Origin": "*",
			}
		},
	},
	methods: {
		changedTheme: function(event) {
			console.log('theme changed')
			this.$cookies.set('darkTheme', this.$vuetify.theme.dark ? 'dark' : 'light')
		},
	},
	created () {
		this.$cookies.config('30d')
		let cookie = this.$cookies.get('darkTheme')
		this.$vuetify.theme.dark = (cookie === 'dark')
	},
})
