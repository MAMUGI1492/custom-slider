<template lang="pug">
.menu.fullscreen(:class="menuColor")
	div
		.menu__number 404

		.menu__text {{ $t('error404.text') }}

		q-btn(
			:text-color="textColor",
			:label="$t('error404.button')",
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
				return { 'bg-blue': !this.$q.dark.isActive }
			},
			textColor() {
				return this.$q.dark.isActive ? 'black' : 'blue'
			}
		}
	}
</script>

<style lang="stylus">
	.menu
		padding $space-base
		display flex
		justify-content center
		align-items center
		text-align center
		color #fff
		div
			.menu__number
				font-size 30vh
			.menu__text
				line-height $headings.h2.line-height
				font-size $headings.h2.size
				letter-spacing  $headings.h2.letter-spacing
				font-weight $headings.h2.weight
				opacity 0.4
			.q-btn
				margin $space-xl.y 0 0 0
</style>
