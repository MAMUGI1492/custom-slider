<template lang="pug">
	q-img.slider__image(
		v-touch-swipe.mouse.vertical="handleSwipe",
		:style="styleComponent",
		:src="src",
		transition="fade"
	)
		template(#loading)
			.slider__image__loading
				q-spinner-tail(color="primary", size="xl")
				span {{ $t('slider.image.loading') }}...
</template>

<script>
	export default {
		name: 'SliderImage',
		props: {
			index: {
				required: true,
				type: Number
			},
			numberSlides: {
				required: true,
				type: Number
			},
			src: {
				required: true,
				type: String
			},
			styleComponent: {
				required: true,
				type: Object
			}
		},
		methods: {
			handleSwipe({ direction, ...data }) {
				let index = parseInt(
					data.evt.target.parentElement.id.split('-')[1]
				)

				const goDown = direction === 'up',
					goUp = direction === 'down',
					isEnd = index >= this.numberSlides - 1,
					isBeginning = index <= 0

				if ((goDown && !isEnd) || (goUp && !isBeginning)) {
					if (goDown && !isEnd) {
						index++
					} else if (goUp && !isBeginning) {
						index--
					}

					this.$emit('handle-swipe', index)
				} else {
					let log = null

					if (goDown && isEnd) {
						log = {
							message: this.$t('slider.image.logEnd.message'),
							caption: this.$t('slider.image.logEnd.caption')
						}
					} else if (goUp && isBeginning) {
						log = {
							message: this.$t(
								'slider.image.logBeginning.message'
							),
							caption: this.$t(
								'slider.image.logBeginning.caption'
							)
						}
					}

					this.$emit('handle-edge', log)
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.slider__image
		background-size cover
		background-position center
		scroll-snap-align center
		.slider__image__loading
			height 100%
			width 100%
			background-color rgba(0, 0, 0, .75)
			display flex
			justify-content center
			align-items center
			span
				margin 0 0 0 $space-base
				line-height $headings.subtitle1.line-height
				font-size $headings.subtitle1.size
				font-weight $headings.subtitle1.letter-spacing
				letter-spacing $headings.subtitle1.weight
				color white
</style>
