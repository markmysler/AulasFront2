<template>
	<h2>Mis reservas</h2>
	<div
		class="columnItemsCenter w-75 ga-4 mb-4"
		v-if="reservations.length !== 0"
	>
		<v-btn
			@click="$router.push('/reservar')"
			elevation="5"
			class="bg-blue text-white my-3 px-10 px-lg-16 text-lg-h6 py-3 h-auto rounded-pill"
			append-icon="mdi-plus"
			>Reservar aula</v-btn
		>

		<v-card
			class="bg-blue-darken-1 w-100 px-5 py-2 rounded-xl"
			v-for="reservation in reservations"
			:key="reservation.id"
			@click="seeReservation(reservation)"
		>
			<h3>{{ reservation.title }}</h3>
			<p>
				Aula
				{{
					$store.state.aulas.find((a) => a.id === reservation.aula_id)
						.name
				}}
			</p>
			<p>Numero de reserva: {{ reservation.id }}</p>
			<p>
				Inicio: {{ formatDate(reservation.start_date.split("T")[0]) }}
			</p>
			<p>Fin: {{ formatDate(reservation.end_date.split("T")[0]) }}</p>
		</v-card>
	</div>
	<div class="columnItemsCenter w-75 ga-4 mb-4" v-else>
		<v-btn
			@click="$router.push('/reservar')"
			elevation="3"
			class="bg-blue text-white my-2 px-8 py-2"
			append-icon="mdi-plus"
			>Reservar aula</v-btn
		>
		<p>Todavia no tenes reservas.</p>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "MyReservationsView",
	data() {
		return {
			reservations: [],
		};
	},
	methods: {
		async getMyReservations() {
			await axios
				.get(`api/v1/my-reservations/${this.$store.state.user.id}/`, {
					headers: {
						Authorization: `Token ${this.$store.state.token}`,
					},
					withCredentials: true,
				})
				.then((response) => {
					this.reservations = response.data.reverse();
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async seeReservation(reservation) {
			this.$router.push(`/reserva/${reservation.id}`);
		},
		formatDate(dateStr) {
			let date = new Date(dateStr);
			date.setDate(date.getDate() + 1);
			return `${
				this.$store.state.days[date.getDay()]
			} ${date.getDate()} de ${
				this.$store.state.months[date.getMonth()]
			}`;
		},
	},
	mounted() {
		(document.title = "Mis reservas"), this.getMyReservations();
	},
};
</script>
<style scoped>
.v-btn__content {
	display: flex;
	flex-direction: column;
}
.v-btn.v-btn--density-default {
	height: auto;
}
</style>
