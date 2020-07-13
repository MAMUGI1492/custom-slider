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
			div {{ $t('layout.header.quasarVersion') }} Quasar
				|
				|
				q-badge(
					:color="colorBadge",
					:text-color="textColorBadge",
					:label="`v${ $q.version }`"
					align="middle"
				)
</template>

<script>
	export default {
		name: 'Header',
		computed: {
			colorBadge() {
				return this.$q.dark.isActive ? 'black' : 'white'
			},
			textColorBadge() {
				return this.$q.dark.isActive ? 'white' : 'primary'
			}
		},
		methods: {
			toggleDrawer() {
				this.$emit('toggle-drawer')
			}
		}
	}
</script>
