<template lang="pug">
	q-img.slider__image(
		v-touch-swipe.mouse.vertical="handleSwipe",
		:style="styleComponent",
		:src="src",
		transition="fade"
	)
		template(#loading)
			.slider__image__loading
				q-spinner-tail(
					color="primary",
					size="xl"
				)
				span {{ $t('slider.image.loading') }}...
</template>

<script>
	import { uid } from 'quasar'

	export default {
		name: 'SliderImage',
		props: {
			height: {
				required: true,
				type: Number
			},
			numberSlides: {
				required: true,
				type: Number
			},
			slideIDbase: {
				required: true,
				type: String
			},
			width: {
				required: true,
				type: Number
			}
		},
		computed: {
			src() {
				const urlBase = 'https://picsum.photos/'
				const parameters = this.$q.dark.isActive
					? `?grayscale=true&random=${uid()}.webp`
					: `?random=${uid()}.webp`

				return `${urlBase}${this.width}/${this.height}${parameters}`
			},
			styleComponent() {
				return {
					height: `${this.height}px`
				}
			}
		},
		methods: {
			handleSwipe({ direction, ...data }) {
				const id = data.evt.target.parentElement.id
				const subtract = (value, mask) =>
					value
						.split('')
						.reduce(
							(accumulator, currentValue, index) =>
								mask[index] === currentValue
									? accumulator
									: accumulator + currentValue,
							''
						)
				let index = parseInt(subtract(id, this.slideIDbase))

				const goDown = direction === 'up'
				const goUp = direction === 'down'
				const isEnd = index >= this.numberSlides - 1
				const isBeginning = index <= 0

				if ((goDown && !isEnd) || (goUp && !isBeginning)) {
					if (goDown) index++
					else index--

					this.$emit('handle-swipe', index)
				} else {
					let log = null

					if (goDown) {
						log = {
							message: this.$t('slider.image.logEnd.message'),
							caption: this.$t('slider.image.logEnd.caption')
						}
					} else {
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
