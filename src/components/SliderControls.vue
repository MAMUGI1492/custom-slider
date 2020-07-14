<template lang="pug">
	.slider__controls(:style="finalControlsStyles")
		q-pagination(
			@input="handleClick",
			:boundary-links="moreThan2",
			:boundary-numbers="false",
			:direction-links="moreThan2",
			:max="numberSlides",
			:max-pages="6",
			:style="styleQPagination",
			:value="currentSlide"
		)
</template>

<script>
	import { scroll } from 'quasar'
	const { getScrollbarWidth } = scroll

	export default {
		name: 'SliderControls',
		props: {
			controlsStyles: {
				required: true,
				type: Object
			},
			currentSlideIndex: {
				required: true,
				type: Number
			},
			numberSlides: {
				required: true,
				type: Number
			}
		},
		computed: {
			finalControlsStyles() {
				return {
					right: `${getScrollbarWidth() + 18}px`,
					...this.controlsStyles
				}
			},
			currentSlide() {
				return this.currentSlideIndex + 1
			},
			moreThan2() {
				return this.numberSlides > 2
			},
			styleQPagination() {
				return {
					'background-color': this.$q.dark.isActive
						? 'rgba(0, 0, 0, 0.75)'
						: 'rgba(255, 255, 255, .75)'
				}
			}
		},
		methods: {
			handleClick(currentSlide) {
				const currentSlideIndex = currentSlide - 1

				this.$emit('handle-click', currentSlideIndex)
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
</style>

<style lang="stylus">
	.slider__controls
		> .q-pagination
			flex-direction column
			border-radius $generic-border-radius
			> .q-btn
				> .q-btn__wrapper
					transform rotate(90deg)
				&:nth-child(3)
				&:nth-last-child(3)
					> .q-btn__wrapper
						> .q-btn__content
							transform rotate(90deg)
			> div
				flex-direction column
</style>
