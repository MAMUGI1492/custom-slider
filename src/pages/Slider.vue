<template lang="pug">
	q-page.slider.scroll(:style-fn="myTweak")
		SliderImage(
			v-for="slide in slides",
			:key="slide.index",
			@handle-edge="showWarnings",
			@handle-swipe="scrollToElement",
			:id="slide.id",
			v-bind="slide",
			:number-slides="numberSlides"
		)

		SliderControls(
			@handle-click="scrollToElement",
			:controls-styles="controlsStyles",
			:current-slide-index="currentSlideIndex",
			:number-slides="numberSlides",
		)

		SliderRefresh(@update-measures="onUpdateMeasures")

		q-resize-observer(@resize="onResize", debounce="300")
		q-scroll-observer(@scroll="onScroll", debounce="200")
</template>

<script>
	import { dom, scroll, uid } from 'quasar'
	const { height: getHeight } = dom
	const { getScrollTarget, setScrollPosition } = scroll

	import { mapState, mapMutations, mapActions } from 'vuex'

	import SliderControls from 'components/SliderControls.vue'
	import SliderImage from 'components/SliderImage.vue'
	import SliderRefresh from 'components/SliderRefresh.vue'

	export default {
		name: 'PageSlider',
		components: {
			SliderControls,
			SliderImage,
			SliderRefresh
		},
		data() {
			return {
				controlsStyles: {
					height: null,
					top: null
				},
				currentSlideIndex: 0,
				currentSlideStyles: {
					height: null,
					width: null
				},
				newSlideStyles: {
					height: null,
					width: null
				},
				loaded: false
			}
		},
		computed: {
			...mapState('slider', ['numberSlides']),
			slides() {
				const urlBase = 'https://picsum.photos/',
					url = `${urlBase}${this.currentSlideStyles.width}/${this.currentSlideStyles.height}`

				return Array.from({ length: this.numberSlides }, (_, index) => {
					const id = uid(),
						parameters = this.$q.dark.isActive
							? `?grayscale&random=${id}.webp`
							: `?random=${id}.webp`

					return {
						id: `Image-${index}`,
						index,
						src: `${url}${parameters}`,
						styleComponent: {
							height: `${this.currentSlideStyles.height}px`
						}
					}
				})
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
				const body = document.getElementById('q-app'),
					header = document.getElementsByClassName('q-header')[0],
					headerHight = parseInt(getHeight(header)),
					height = parseInt(getHeight(body)) - headerHight

				this.controlsStyles.height = `${height}px`
				this.controlsStyles.top = `${headerHight}px`

				this.newSlideStyles.height = height
				this.newSlideStyles.width = width

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
				const element = document.getElementById(this.slides[index].id),
					target = getScrollTarget(element),
					offset = element.offsetTop

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
			updateMeasures() {
				this.currentSlideStyles.height = 0
				this.currentSlideStyles.width = 0

				this.currentSlideStyles.height = this.newSlideStyles.height
				this.currentSlideStyles.width = this.newSlideStyles.width
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.slider
		scroll-snap-type y mandatory
		scroll-behavior smooth
</style>
