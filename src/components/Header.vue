<template lang="pug">
	q-header(elevated)
		q-toolbar
			q-btn(
				@click="toggleDrawer",
				aria-label="Menu",
				icon="menu",
				flat,
				dense,
				round
			)
			q-toolbar-title Custom Slider
			div {{ $t('layout.header.quasarVersion') }} Quasar v{{ $q.version }}
</template>

<script>
	export default {
		name: 'Header',
		methods: {
			toggleDrawer() {
				this.$emit('toggle-drawer')
			}
		}
	}
</script>
