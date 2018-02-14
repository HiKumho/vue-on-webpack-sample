<template>
	<div :class="$style.content">
		<span :class="$style.text">
			{{ message }}
		</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				message: 'Vue On Webpack Sample'
			}
		}
	}
</script>

<style module>
	.content {
		display: flex;
		justify-content: center;
	}

	.text {
		composes: red from "./main.css";
		composes: big from "./main.css";
	}
</style>

