<template>
	<h2>Perfil</h2>
	<div
		class="profileInfo elevation-3 rounded-lg pa-4 mx-0 columnItemsCenter"
		style="max-width: 500px; min-width: "
	>
		<p class="text-center text-subtitle-1">Nombre: {{ profile.name }}</p>
		<p class="text-center text-subtitle-1">Email: {{ profile.email }}</p>
		<div class="d-flex flex-column flex-sm-row justify-center my-2 ga-3">
			<v-btn
				class="bg-blue my-sm-3 px-10 py-3 h-auto rounded-pill"
				prepend-icon="mdi-home"
				@click="this.$router.push('/inicio/')"
				>Inicio</v-btn
			>
			<v-btn
				class="bg-blue my-sm-3 px-10 py-3 h-auto rounded-pill"
				prepend-icon="mdi-calendar-plus"
				@click="this.$router.push('/mis-reservas/')"
				>mis reservas</v-btn
			>
		</div>
	</div>
</template>
<!-- class="bg-blue text-white my-3 px-10 px-lg-16 text-lg-h6 py-3 h-auto rounded-pill" -->
<script>
export default {
	name: "ProfileView",
	/* Perfil Provisorio */
	data() {
		return {
			profile: {
				name: "",
				email: "",
				id: "",
			},
		};
	},
	methods: {
		getUserData() {
			this.profile.name = this.$store.state.user.username;
			this.profile.email = this.$store.state.user.email;
			this.profile.id = this.$store.state.user.id;
		},
	},
	mounted() {
		(document.title = "Perfil"), this.getUserData();
	},
};
</script>

<style scoped>
.profileInfo {
	width: 85%;
	margin: 5vw;
}
@media screen and (max-width: 400px) {
	.profileInfo {
		width: 95%;
	}
}
</style>
