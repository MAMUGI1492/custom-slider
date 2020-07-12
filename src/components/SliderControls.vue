<template lang="pug">
	nav.slider__controls(:style="navFinalStyles")
		q-btn(
			v-for="number in numberSlides",
			:key="number",
			@click="handleClick",
			:label="number",
			color="primary",
			round
		)
</template>

<script>
	import { scroll } from 'quasar'
	const { getScrollbarWidth } = scroll

	export default {
		name: 'SliderControls',
		props: {
			navStyles: {
				required: true,
				type: Object
			},
			numberSlides: {
				required: true,
				type: Number
			}
		},
		computed: {
			navFinalStyles() {
				return {
					right: `${getScrollbarWidth() + 18}px`,
					...this.navStyles
				}
			}
		},
		methods: {
			handleClick(event) {
				const id = parseInt(event.target.textContent)

				this.$emit('handle-click', `Image ${id}`)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.slider__controls
		position fixed
		display flex
		flex-direction column
		justify-content center
		.q-btn
			margin 9px 0
			background-color white
			color black
</style>
