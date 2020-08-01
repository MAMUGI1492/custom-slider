<template lang="pug">
	q-layout(view="lhr Lpr lFf")
		x-header(@toggle-drawer="toggleDrawer")

		x-drawer(v-model="drawerOpen")

		q-page-container
			router-view
</template>

<script>
	export default {
		name: 'LayoutMain',
		components: {
			/* eslint-disable no-undef */
			'x-drawer': require('components/Drawer.vue').default,
			'x-header': require('components/Header.vue').default
			/* eslint-enable no-undef */
		},
		data: () => ({
			drawerOpen: false
		}),
		methods: {
			toggleDrawer() {
				this.drawerOpen = !this.drawerOpen
			}
		}
	}
</script>
