export default {
	namespaced: true,
	state: {
		notify: null,
		numberSlides: 5
	},
	mutations: {
		removeNotify: state => (state.notify = null),
		setNotify: (state, payload) => (state.notify = payload),
		setNumberSlides: (state, payload) => (state.numberSlides = payload)
	},
	actions: {
		stopNotify({ commit, state }) {
			const notify = state.notify

			if (notify) {
				notify()

				commit('removeNotify')
			}
		}
	}
}
