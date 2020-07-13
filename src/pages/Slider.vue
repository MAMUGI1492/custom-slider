<template lang="pug">
	q-page.slider.scroll(:style-fn="myTweak")
		SliderImage(
			v-for="slide in slides",
			:key="slide.id",
			@handle-swipe="scrollToElement",
			:number-slides="numberSlides",
			v-bind="slide"
		)

		SliderControls(
			@handle-click="scrollToElement",
			:nav-styles="navStyles",
			:number-slides="numberSlides"
		)

		SliderRefresh(@update-measures="updateMeasures")

		q-resize-observer(@resize="onResize", debounce="300")
</template>

<script>
	import { dom, scroll, uid } from 'quasar'
	const { height: getHeight } = dom
	const { getScrollTarget, setScrollPosition } = scroll

	import { mapState } from 'vuex'

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
				loaded: false,
				currentImagesStyles: {
					height: null,
					width: null
				},
				navStyles: {
					height: null,
					top: null
				},
				newImagesStyles: {
					height: null,
					width: null
				}
			}
		},
		computed: {
			...mapState('slider', ['numberSlides']),
			slides() {
				const urlBase = 'https://picsum.photos/',
					url = `${urlBase}${this.currentImagesStyles.width}/${this.currentImagesStyles.height}`

				return Array.from({ length: this.numberSlides }, (_, index) => {
					const id = uid(),
						parameters = this.$q.dark.isActive
							? `?grayscale&random=${id}.webp`
							: `?random=${id}.webp`

					return {
						index,
						src: `${url}${parameters}`,
						styleComponent: {
							height: `${this.currentImagesStyles.height}px`
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

				this.navStyles.height = `${height}px`
				this.navStyles.top = `${headerHight}px`

				this.newImagesStyles.height = height
				this.newImagesStyles.width = width

				if (this.loaded) {
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
				}
			},
			scrollToElement(id) {
				const element = document.getElementById(id),
					target = getScrollTarget(element),
					offset = element.offsetTop

				setScrollPosition(target, offset)
			},
			updateMeasures() {
				this.currentImagesStyles.height = 0
				this.currentImagesStyles.width = 0

				this.currentImagesStyles.height = this.newImagesStyles.height
				this.currentImagesStyles.width = this.newImagesStyles.width
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.slider
		scroll-snap-type y mandatory
		scroll-behavior smooth
</style>
