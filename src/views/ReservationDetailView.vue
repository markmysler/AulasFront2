<template>
	<div class="columnItemsCenter my-4 w-100">
		<div class="d-flex w-100 mb-2">
			<v-btn
				variant="text"
				class="text-caption text-sm-subtitle-2 mt-2"
				prepend-icon="mdi-chevron-left"
				@click="this.$router.push('/mis-reservas/')"
				>Volver a mis reservas</v-btn
			>
		</div>
		<div v-if="reservationData" class="px-5 w-100" style="max-width: 600px">
			<div class="elevation-3 rounded-xl pa-4 w-100">
				<h3>{{ reservationData.title }}</h3>
				<p>
					Aula
					{{
						this.$store.state.aulas.find(
							(a) => a.id === reservationData.aula_id
						).name
					}}
				</p>
				<p>Numero de reserva: {{ reservationData.id }}</p>
				<p>Categoría: {{ reservationData.user_category }}</p>
				<p>Frequencia: {{ frequencyMap[reservationData.frequency] }}</p>
				<p>
					Inicio:
					{{
						formatDate(reservationData.start_date.split("T")[0], 1)
					}}
				</p>
				<p>
					Fin:
					{{ formatDate(reservationData.end_date.split("T")[0], 1) }}
				</p>
			</div>
			<div class="pa-2">
				<h4 class="mt-2">Bloques reservados</h4>
				<div class="d-flex ga-2 py-3 flex-wrap">
					<p
						v-for="time in reservationData.times.split(',')"
						:key="time"
						class="text-center bg-blue rounded-pill py-2 px-4"
					>
						{{ time.length >= 3 ? time : `${time}:00` }}
					</p>
				</div>
			</div>

			<div
				v-if="reservationDays !== null && reservationDays.length !== 0"
				class="d-flex flex-column ga-2"
			>
				<h4 class="my-2">Proximas Fechas</h4>
				<div
					v-for="(dayTimes, index) in reservationDays"
					:key="dayTimes.day"
					class="px-2 py-1 rounded-lg elevation-2 d-flex justify-space-between ga-3"
				>
					<p class="text-subtitle">
						<b>{{ index + 1 }}.</b>
						{{ formatDate(dayTimes.day, 0) }}
					</p>
					<v-btn
						variant="tonal"
						size="sm"
						class="text-caption pa-1"
						@click="confirmDeletePartial(dayTimes.day)"
						>Eliminar fecha</v-btn
					>
				</div>
			</div>
		</div>
		<v-btn
			class="mt-5"
			variant="tonal"
			prepend-icon="mdi-delete"
			@click="confirmDeleteReservation()"
			>Elminar reserva</v-btn
		>
	</div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
	name: "ReservationDetailView",
	data() {
		return {
			reservationData: null,
			reservationId: "",
			calendarBlocks: null,
			reservationDays: null,
			frequencyMap: {
				none: "Ninguna",
				daily: "Diaria",
				weekly: "Semanal",
				monthly: "Mensual",
			},
		};
	},
	methods: {
		async getReservationData(id) {
			await axios
				.get(`/api/v1/reservations/${id}/`, {
					headers: {
						Authorization: `Token ${this.$store.state.token}`,
					},
					withCredentials: true,
				})
				.then((response) => {
					this.reservationData = response.data.reservation;
					this.calendarBlocks = response.data.calendar_blocks;
					this.reservationDays = this.getReservationDays(
						this.calendarBlocks
					);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		getReservationDays(inputArray) {
			let outputArray = [];

			inputArray.forEach((item) => {
				let found = false;

				// Check if the date already exists in the output array
				for (let i = 0; i < outputArray.length; i++) {
					if (
						outputArray[i].day.getFullYear() ===
							new Date().getFullYear() &&
						outputArray[i].day.getMonth() === item.month - 1 &&
						outputArray[i].day.getDate() === item.date_num
					) {
						// If it does, continue to the next item
						found = true;
						break;
					}
				}

				// If the date doesn't exist in the output array, create a new entry
				if (!found) {
					let date = new Date();
					date.setFullYear(new Date().getFullYear());
					date.setMonth(item.month - 1);
					date.setDate(item.date_num);

					outputArray.push({
						day: date,
					});
				}
			});

			return outputArray;
		},
		async partialDelete(date) {
			// Retrieve the CSRF token from the cookie
			let csrfToken = document.cookie.split("=")[1];

			await axios
				.post(
					`/api/v1/reservations/${this.reservationId}/partial_delete/`,
					{
						date_num: date.getDate(),
						month: date.getMonth() + 1,
					},
					{
						headers: {
							"X-CSRFToken": csrfToken,
							Authorization: `Token ${this.$store.state.token}`,
						},
						withCredentials: true,
					}
				)
				.then((response) => {
					console.log(response);
					const deletedIndex = this.reservationDays.findIndex(
						(element) =>
							element.day.getDate() === date.getDate() &&
							element.day.getMonth() === date.getMonth()
					);
					this.reservationDays.splice(deletedIndex, 1);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		confirmDeletePartial(date) {
			Swal.fire({
				title: `Eliminar ${this.formatDate(date, 0)}?`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Si, eliminar",
				cancelButtonText: "Cancelar",
			}).then((result) => {
				if (result.isConfirmed) {
					this.partialDelete(date);
				}
			});
		},
		confirmDeleteReservation() {
			Swal.fire({
				title: "Eliminar la reserva?",
				text: "Esta accion es permanente",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Si, eliminar",
				cancelButtonText: "Cancelar",
			}).then((result) => {
				if (result.isConfirmed) {
					this.deleteReservation();
				}
			});
		},
		async deleteReservation() {
			let csrfToken = document.cookie.split("=")[1];
			await axios
				.delete(`/api/v1/reservations/${this.reservationId}/`, {
					headers: {
						"X-CSRFToken": csrfToken,
						Authorization: `Token ${this.$store.state.token}`,
					},
					withCredentials: true,
				})
				.then((response) => {
					this.$router.push("/mis-reservas/");
				})
				.catch((error) => {
					console.log(error);
				});
		},
		formatDate(dateStr, number) {
			let date = new Date(dateStr);
			if (number === 1) {
				date.setDate(date.getDate() + 1);
			}
			return `${
				this.$store.state.days[date.getDay()]
			} ${date.getDate()} de ${
				this.$store.state.months[date.getMonth()]
			}`;
		},
	},
	mounted() {
		this.reservationId = this.$route.params.id;
		this.getReservationData(this.reservationId);
	},
};
</script>

<style lang="scss" scoped>
.reservationDataContainer {
	width: 100;
}
</style>
