<template lang="pug">
	q-page-sticky(
		:offset="[18, 18]",
		position="bottom-left"
	)
		q-btn(
			@click="updateMeasures",
			color="primary",
			icon="refresh",
			round
		)
			q-tooltip(
				content-class="bg-primary"
			) {{ $t('slider.refresh.tooltip') }}
</template>

<script>
	export default {
		name: 'SliderRefresh',
		methods: {
			updateMeasures() {
				this.$emit('update-measures')
			}
		}
	}
</script>
