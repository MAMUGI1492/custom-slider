<template lang="pug">
	q-img.slider__image(
		v-touch-swipe.mouse.vertical="handleSwipe",
		:id="id",
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
		computed: {
			id() {
				return `Image ${this.index + 1}`
			}
		},
		methods: {
			handleSwipe({ evt, ...information }) {
				const id = evt.target.parentElement.id
				let [name, number] = id.split(' ')

				if (
					information.direction === 'up' &&
					number < this.numberSlides
				) {
					number = parseInt(number) + 1
				} else if (information.direction === 'down' && number > 1) {
					number = parseInt(number) - 1
				}

				this.$emit('handle-swipe', `${name} ${number}`)
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
