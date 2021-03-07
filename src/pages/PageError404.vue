<template lang="pug">
	.menu.fullscreen.q-pa-md(:class="menuColor")
		div
			.menu__number 404

			.menu__text.text-h2 {{ $t('error404.text') }}

			q-btn.q-mt-xl(
				:label="$t('error404.button')",
				:text-color="textColor",
				color="white",
				to="/",
				no-caps,
				rounded,
				unelevated
			)
</template>

<script>
	export default {
		name: 'PageError404',
		computed: {
			menuColor() {
				return { 'bg-primary': !this.$q.dark.isActive }
			},
			textColor() {
				return this.$q.dark.isActive ? 'black' : 'primary'
			}
		}
	}
</script>

<style lang="stylus">
	.menu
		display flex
		justify-content center
		align-items center
		text-align center
		color #fff
		div
			.menu__number
				font-size 30vh
			.menu__text
				opacity 0.4
</style>
