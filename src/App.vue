<template>
	<v-app class="bg-white h-full">
		<HeaderComponent />
		<div class="routerViewWrapper columnItemsCenter mt-16">
			<router-view />
		</div>
	</v-app>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
	name: "App",
	components: {
		HeaderComponent,
	},

	mounted() {
		this.$store.commit("initializeStore");
	},
};
</script>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	list-style: none;
}
body {
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}

button {
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.columnItemsCenter {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.inputWidth {
	width: 60vw;
}
h2 {
	text-align: center;
	font-size: 1.7rem;
	font-weight: 500;
	margin: 5vw 0 2vw 0;
}
@media screen and (max-width: 480px) {
	h3 {
		font-size: 1.1rem;
	}
	p {
		font-size: 0.8rem;
	}
	li {
		font-size: 0.8rem;
	}
	label {
		font-size: 0.8rem;
	}
}
@media screen and (min-width: 720px) {
	.inputWidth {
		width: 40vw;
	}
}
@media screen and (min-width: 1000px) {
	p,
	label {
		font-size: 1.2rem;
	}
}
</style>
