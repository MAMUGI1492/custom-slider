<template lang="pug">
	q-item(
		:href="link",
		tag="a",
		target="_blank",
		clickable
	)
		q-item-section(
			v-if="icon",
			avatar
		)
			q-icon(:name="icon")

		q-item-section
			q-item-label {{ title }}
			q-item-label(caption) {{ caption }}
</template>

<script>
	export default {
		name: 'EssentialLink',
		props: {
			title: {
				required: true,
				type: String
			},
			caption: {
				required: true,
				type: String
			},
			link: {
				required: true,
				type: String
			},
			icon: {
				required: true,
				type: String
			}
		}
	}
</script>
