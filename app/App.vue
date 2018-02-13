<template>
	<div>
		{{ message }}
	</div>
</template>

<script>
	import config from './config.json'

	export default {
		data() {
			return {
				message: ''
			}
		},
		mounted() {
			this.message = config.message
		}
	}
</script>