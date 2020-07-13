export default {
	namespaced: true,
	state: {
		numberSlides: 5
	},
	mutations: {
		setNumberSlides: (state, payload) => (state.numberSlides = payload)
	}
}
