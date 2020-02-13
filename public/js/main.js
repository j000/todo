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
	created () {
		this.$vuetify.theme.dark = true
	},
})
