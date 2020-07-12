<template lang="pug">
	q-layout(view="lhr Lpr lFf")
		Header(@toggle-drawer="toggleDrawer")

		Drawer(v-model="drawerOpen")

		q-page-container
			router-view
</template>

<script>
	import Header from 'components/Header.vue'
	import Drawer from 'components/Drawer.vue'

	export default {
		name: 'LayoutMain',
		components: {
			Drawer,
			Header
		},
		data() {
			return {
				drawerOpen: false
			}
		},
		methods: {
			toggleDrawer() {
				this.drawerOpen = !this.drawerOpen
			}
		}
	}
</script>
