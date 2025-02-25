<template>
	<div
		class="columnItemsCenter w-100"
		style="max-width: 1000px; margin: auto"
	>
		<h2>Aulas Disponibles</h2>
		<v-btn
			@click="$router.push('/reservar')"
			elevation="5"
			class="bg-blue text-white my-3 px-10 px-lg-16 text-lg-h6 py-3 h-auto rounded-pill"
			append-icon="mdi-plus"
			>Reservar aula</v-btn
		>
		<div class="elevation-5 pa-5 rounded-xl mt-5 mb-3 w-75 text-sm-center">
			<h3 class="text-center text-h5 mb-2">Guia</h3>
			<div
				class="d-flex flex-column flex-sm-row ga-2 flex-wrap justify-center"
			>
				<div class="d-flex mx-sm-5 align-center ga-1">
					<v-icon
						icon="mdi-radiology-box"
						class="text-h4"
						color="blue"
					></v-icon>
					<p class="m-0 text-subtitle-1">Negatoscopio</p>
				</div>
				<div class="d-flex mx-sm-5 align-center ga-1">
					<v-icon
						icon="mdi-projector-screen"
						class="text-h4"
						color="blue"
					></v-icon>
					<p class="m-0 text-subtitle-1">Pantalla</p>
				</div>
				<div class="d-flex mx-sm-5 align-center ga-1">
					<v-icon
						icon="mdi-account"
						class="text-h4"
						color="blue"
					></v-icon>
					<p class="m-0 text-subtitle-1">Capacidad</p>
				</div>
			</div>
		</div>
		<div class="aulasWrapper">
			<v-card
				class="aula d-flex flex-column justify-space-between bg-blue-darken-1 elevation-7 text-start pa-5 w-100"
				style="max-width: 800px"
				v-for="aula in $store.state.aulas"
				:key="aula.id"
				@click="$router.push(`/aula/${aula.id}`)"
			>
				<div class="d-flex flex-column ga-3">
					<h3>Aula {{ aula.name }}</h3>
					<div class="d-flex align-items-center ga-2 justify-end">
						<div
							class="d-flex align-center"
							v-if="aula.has_negatoscope"
						>
							<v-icon
								size="large"
								icon="mdi-radiology-box"
							></v-icon>
						</div>
						<div class="d-flex align-center" v-if="aula.has_screen">
							<v-icon icon="mdi-projector-screen"></v-icon>
						</div>
						<div class="d-flex align-center">
							<v-icon icon="mdi-account"></v-icon>
							<p
								class="text-subtitle-1"
								style="
									vertical-align: middle;
									line-height: 100%;
								"
							>
								{{ aula.max_capacity }}
							</p>
						</div>
					</div>
				</div>
			</v-card>
		</div>
	</div>
</template>

<script>
export default {
	name: "HomeView",
	components: {},
	mounted() {
		document.title = "Inicio";
	},
};
</script>

<style scoped>
.aulasWrapper {
	width: 85%;
	gap: 5vw;
	display: flex;
	flex-wrap: wrap;
	margin: 4vw 2vw;
	justify-content: center;
}
.aula {
	width: 45%;
	border-radius: 20px;
}
.aulaAvailable {
	border: 1px solid blue;
}
.aulaNotAvailable {
	background-color: red;
	color: white;
}
@media screen and (max-width: 550px) {
	.aulasWrapper {
		justify-content: center;
	}
	.aula {
		width: 90%;
	}
}
@media screen and (min-width: 870px) {
	.aulasWrapper {
		max-width: 70vw;
		gap: 2vw;
	}
}
</style>
