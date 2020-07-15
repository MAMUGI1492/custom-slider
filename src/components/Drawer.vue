<template lang="pug">
	q-drawer(
		@input="$emit('input', $event)",
		:value="value",
		:content-class="drawerClass",
		bordered,
		show-if-above
	)
		q-img.drawer__head(
			src="~assets/material.png",
			alt="fondo de la cabecera"
		)
			.drawer__head__body
				q-avatar.drawer__head__body__avatar(size="56px")
					img(src="~assets/my-logo.svg", alt="avatar")
				.drawer__head__body__name Manuel Muñoz Gil
				div @MAMUGI1492

		q-list
			q-item-label(
				:class="itemLabelClass",
				header
			) {{ $t('layout.drawer.usefulLinks') }}

			EssentialLink(
				v-for="link in essentialLinks",
				:key="link.title",
				v-bind="link"
			)

			q-separator(spaced)

			q-item-label(
				:class="itemLabelClass",
				header
			) {{ $t('layout.drawer.options') }}

			q-item
				q-item-section(avatar)
					q-icon(name="view_day")
				q-item-section {{ $t('layout.drawer.images') }}: {{ numberSlides }}
				q-item-section
					q-slider(
						:value="numberSlides"
						@change="setNumberSlides"
						:min="1"
						:max="10"
						label
					)

			q-item
				q-item-section(avatar)
					q-icon(name="translate")
				q-item-section
					q-select(
						v-model="lang",
						@input="onInput",
						:label="$t('layout.drawer.language')",
						:options="langOptions",
						dense,
						emit-value,
						map-options,
						options-dense,
						outlined,
						rounded
					)

			q-item(tag="label", v-ripple)
				q-item-section(avatar)
					q-icon(name="brightness_4")
				q-item-section {{ $t('layout.drawer.theme') }}
				q-item-section(avatar)
					q-toggle(
						v-model="lightTheme",
						@input="changeTheme($event)",
						checked-icon="wb_sunny",
						color="blue",
						unchecked-icon="bedtime"
					)
</template>

<script>
	import { mapState, mapMutations, mapActions } from 'vuex'

	import EssentialLink from 'components/EssentialLink.vue'

	export default {
		name: 'Drawer',
		components: {
			EssentialLink
		},
		props: {
			value: {
				required: true,
				type: Boolean
			}
		},
		data() {
			return {
				essentialLinks: [
					{
						title: 'Github',
						caption: 'MAMUGI1492/custom-slider',
						icon: 'code',
						link: 'https://github.com/MAMUGI1492/custom-slider'
					},
					{
						title: this.$t('layout.drawer.website'),
						caption: 'manuelmg.com',
						icon: 'public',
						link: 'https://www.manuelmg.com/'
					},
					{
						title: 'Twitter',
						caption: '@MAMUGI1492',
						icon: 'rss_feed',
						link: 'https://twitter.com/MAMUGI1492'
					},
					{
						title: 'Quasar',
						caption: 'quasar.dev',
						icon: 'favorite',
						link: 'https://quasar.dev'
					}
				],
				lang: this.$q.lang.getLocale().includes('es-')
					? 'es-es'
					: 'en-us',
				langOptions: [
					{ value: 'en-us', label: 'English' },
					{ value: 'es-es', label: 'Español' }
				],
				lightTheme: null
			}
		},
		computed: {
			...mapState('slider', ['numberSlides']),
			drawerClass() {
				return { 'bg-grey-1': this.lightTheme }
			},
			itemLabelClass() {
				return this.$q.dark.isActive ? 'text-grey-6' : 'text-grey-8'
			}
		},
		watch: {
			lang(lang) {
				this.setLocale(lang)
			}
		},
		created() {
			this.lightTheme = !this.$q.dark.isActive

			this.setLocale(this.lang)
		},
		methods: {
			...mapMutations('slider', ['setNumberSlides']),
			...mapActions('slider', ['stopNotify']),
			changeTheme(value) {
				this.$q.dark.set(!value)
			},
			onInput() {
				this.stopNotify()
			},
			setLocale(lang) {
				this.$i18n.locale = lang

				this.essentialLinks[1].title = this.$t('layout.drawer.website')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.drawer__head
		height 150px
		.drawer__head__body
			position absolute
			bottom 0
			width 100%
			background rgba(0 0 0 0)
			.drawer__head__body__avatar
				margin 0 0 $space-sm.y 0
			.drawer__head__body__name
				font-weight $text-weights.bold
</style>
