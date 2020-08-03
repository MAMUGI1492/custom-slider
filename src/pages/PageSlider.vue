<template lang="pug">
	q-page.slider.scroll(:style-fn="myTweak")
		template(v-if="showSlides")
			x-slider-image(
				v-for="slide in numberSlides",
				:key="slide",
				@handle-edge="showWarnings",
				@handle-swipe="scrollToElement",
				:height="currentSlideStyles.height",
				:id="slideID(slide)"
				:number-slides="numberSlides",
				:slideIDbase="slideIDbase",
				:width="currentSlideStyles.width",
			)

		x-slider-controls(
			@handle-click="scrollToElement",
			v-bind="controlsStyles",
			:current-slide-index="currentSlideIndex",
			:number-slides="numberSlides",
		)

		x-slider-refresh(@update-measures="onUpdateMeasures")

		q-resize-observer(
			@resize="onResize",
			debounce="300"
		)
		q-scroll-observer(
			@scroll="onScroll",
			debounce="200"
		)
</template>

<script>
	import { dom, scroll } from 'quasar'
	const { height: getHeight, width: getWidth } = dom
	const { getScrollTarget, setScrollPosition } = scroll

	import { mapState, mapMutations, mapActions } from 'vuex'

	export default {
		name: 'PageSlider',
		components: {
			/* eslint-disable no-undef */
			'x-slider-controls': require('components/SliderControls.vue')
				.default,
			'x-slider-image': require('components/SliderImage.vue').default,
			'x-slider-refresh': require('components/SliderRefresh.vue').default
			/* eslint-enable no-undef */
		},
		data: () => ({
			controlsStyles: {
				height: 0,
				top: 0
			},
			currentSlideIndex: 0,
			currentSlideStyles: {
				height: 0,
				width: 0
			},
			newSlideStyles: {
				height: 0,
				width: 0
			},
			loaded: false,
			orientation: null,
			slideIDbase: 'Image-' // ???-[Index]
		}),
		computed: {
			...mapState('slider', ['numberSlides']),
			showSlides() {
				return !!this.currentSlideStyles.height
			}
		},
		mounted() {
			this.updateMeasures()
			this.loaded = true
		},
		methods: {
			...mapMutations('slider', ['setNotify']),
			...mapActions('slider', ['stopNotify']),
			myTweak(offset) {
				return {
					height: offset ? `calc(100vh - ${offset}px)` : '100vh'
				}
			},
			onResize({ width }) {
				const body = document.getElementById('q-app')
				const header = document.getElementsByClassName('q-header')[0]
				const bodyHight = parseInt(getHeight(body))
				const bodyWidth = parseInt(getWidth(body))
				const headerHight = parseInt(getHeight(header))
				const height = bodyHight - headerHight
				const newOrientation =
					bodyHight > bodyWidth ? 'portrait' : 'landscape'

				this.controlsStyles.height = height
				this.controlsStyles.top = headerHight

				this.newSlideStyles.height = height
				this.newSlideStyles.width = width

				//	On mobile devices when you change the orientation the
				//		reloading of images should be automatic
				if (
					this.$q.platform.is.mobile &&
					this.orientation !== newOrientation
				) {
					this.orientation = newOrientation

					this.updateMeasures()

					return
				}

				if (this.loaded) {
					this.setNotify(
						this.$q.notify({
							position: 'bottom-right',
							color: 'primary',
							icon: 'image_aspect_ratio',
							message: this.$t('slider.main.notify.message'),
							caption: this.$t('slider.main.notify.caption'),
							progress: true,
							timeout: 5000,
							actions: [
								{
									color: 'white',
									label: this.$t('slider.main.notify.button'),
									icon: 'refresh',
									handler: () => this.updateMeasures()
								}
							]
						})
					)
				}
			},
			onScroll({ position }) {
				const index = Math.round(
					position / this.currentSlideStyles.height
				)

				this.currentSlideIndex = index ? index : 0
			},
			onUpdateMeasures() {
				this.stopNotify()

				this.updateMeasures()
			},
			scrollToElement(index) {
				const element = document.getElementById(
					`${this.slideIDbase}${index}`
				)
				const target = getScrollTarget(element)
				const offset = element.offsetTop

				setScrollPosition(target, offset)
			},
			showWarnings({ caption, message }) {
				this.$q.notify({
					type: 'warning',
					position: 'bottom-right',
					message: message,
					caption: caption,
					progress: true,
					timeout: 2000
				})
			},
			slideID(imageNumber) {
				return `${this.slideIDbase}${imageNumber - 1}`
			},
			updateMeasures() {
				this.currentSlideStyles.height = 0
				this.currentSlideStyles.width = 0

				setTimeout(() => {
					this.currentSlideStyles.height = this.newSlideStyles.height
					this.currentSlideStyles.width = this.newSlideStyles.width
				}, 0)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.slider
		scroll-snap-type y mandatory
		scroll-behavior smooth
</style>
