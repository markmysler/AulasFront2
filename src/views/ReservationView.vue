<template>
	<h2>Reservar un Aula</h2>
	<!-- Características del Aula -->
	<div
		class="w-75 columnItemsCenter ga-3 elevation-5 rounded-xl pt-5 mb-8 mt-3 wrapper"
		v-if="page === ''"
	>
		<div class="columnItemsCenter ga-3">
			<label for="aulaCapacity" class="text-center"
				>¿Qué capacidad tiene que tener el Aula?</label
			>
			<v-text-field
				id="aulaCapacity"
				class="inputWidth"
				placeholder="Capacidad del Aula"
				type="number"
				v-model="reservationData.capacity"
				mandatory
				suffix="personas"
			>
			</v-text-field>
		</div>
		<div class="columnItemsCenter ga-3">
			<p class="text-center px-4">
				Seleccione solo la categoría que corresponde a su reserva:
			</p>
			<v-select
				class="inputWidth"
				label="Seleccionar"
				:items="categories"
				v-model="reservationData.user_category"
			>
			</v-select>
		</div>
		<div class="columnItemsCenter ga-3">
			<label for="aulaTitle" class="text-center"
				>Ingrese un titulo para la reserva</label
			>
			<v-text-field
				id="aulaTitle"
				class="inputWidth"
				placeholder="Nombre descriptivo"
				type="text"
				v-model="reservationData.title"
				mandatory
			>
			</v-text-field>
		</div>
		<div class="columnItemsCenter ga-3">
			<p>¿Necesitas Pantalla?</p>
			<v-btn-toggle
				variant="outlined"
				v-model="reservationData.has_screen"
				mandatory
			>
				<v-btn :value="true">
					<v-icon icon="mdi-check"></v-icon>
				</v-btn>
				<v-btn :value="false">
					<v-icon icon="mdi-close"></v-icon>
				</v-btn>
			</v-btn-toggle>
		</div>
		<div class="columnItemsCenter ga-3">
			<p>¿Necesitas Negatoscopio?</p>
			<v-btn-toggle
				variant="outlined"
				v-model="reservationData.has_negatoscope"
				mandatory
			>
				<v-btn :value="true">
					<v-icon icon="mdi-check"></v-icon>
				</v-btn>
				<v-btn :value="false">
					<v-icon icon="mdi-close"></v-icon>
				</v-btn>
			</v-btn-toggle>
		</div>

		<v-btn
			elevation="5"
			class="bg-blue text-white my-3 px-10 px-lg-16 text-lg-h6 py-3 h-auto rounded-pill"
			:disabled="
				reservationData.capacity <= 0 ||
				reservationData.user_category === '' ||
				reservationData.title === ''
			"
			@click="movePage('datesFrequency')"
			>Continuar</v-btn
		>
	</div>
	<!-- Fecha Inicio - Frecuencia - Fecha Fin -->
	<div
		class="w-75 columnItemsCenter ga-3 elevation-5 rounded-xl mb-5 wrapper"
		v-if="page === 'datesFrequency'"
	>
		<v-btn
			variant="text"
			prepend-icon="mdi-chevron-left"
			@click="movePage('')"
			class="align-self-start mt-5"
		>
			Atrás
		</v-btn>
		<div class="w-75 columnItemsCenter ga-3">
			<div class="columnItemsCenter ga-2">
				<p class="text-center">
					¿Cuál es la fecha de inicio de la reserva?
				</p>

				<v-text-field
					v-model="start_date"
					class="inputWidth"
					:min="today"
					type="date"
					label="Inicio"
				></v-text-field>
			</div>
			<div class="columnItemsCenter ga-2">
				<p class="text-center">¿Con qué frequencia se repite?</p>
				<v-select
					class="inputWidth"
					label="Frecuencia"
					:items="frequencies"
					item-title="label"
					item-value="value"
					v-model="reservationData.frequency"
				>
				</v-select>
			</div>
			<div
				class="columnItemsCenter ga-2"
				v-if="reservationData.frequency !== 'none'"
			>
				<p class="text-center">
					¿Cuál es la fecha de finalización de la reserva?
				</p>
				<v-text-field
					v-model="end_date"
					type="date"
					:min="tomorrow"
					label="Fin"
					class="inputWidth"
				></v-text-field>
			</div>

			<v-btn
				:disabled="
					start_date === null ||
					(reservationData.frequency !== 'none' && end_date === null)
				"
				elevation="5"
				class="bg-blue text-white my-3 px-10 px-lg-16 text-lg-h6 py-3 h-auto rounded-pill"
				@click="movePage('times')"
				>Continuar</v-btn
			>
		</div>
	</div>
	<div
		v-if="page === 'times'"
		class="w-75 columnItemsCenter elevation-5 rounded-xl mb-5 wrapper"
	>
		<v-btn
			variant="text"
			prepend-icon="mdi-chevron-left"
			@click="movePage('datesFrequency')"
			class="align-self-start mt-5"
		>
			Atrás
		</v-btn>
		<p class="text-center my-3">
			Seleccione los bloques horarios a reservar
		</p>
		<div class="w-75 mt-5 columnItemsCenter">
			<v-range-slider
				v-model="times"
				thumb-label="always"
				class="w-100"
				:step="0.5"
				:min="7"
				:max="19.5"
			>
				<template v-slot:thumb-label="{ modelValue }">
					<!-- <v-icon :icon="season(modelValue)" theme="dark"></v-icon> -->
					<p>{{ getText(modelValue) }}</p>
				</template>
			</v-range-slider>
		</div>
		<!-- <div
			class="d-flex flex-wrap align-center justify-center ga-2 w-75 my-5"
		>
			<v-btn
				class="timeBlockBtn h-auto rounded-pill py-2"
				v-for="time in availableTimes"
				:key="time"
				@click="selectTime(time)"
				:class="{
					'bg-green': times.findIndex((i) => i === time) !== -1,
					'bg-grey': times.findIndex((i) => i === time) === -1,
				}"
			>
				{{ time.length >= 3 ? time : `${time}:00` }}
			</v-btn>
		</div> -->
		<v-btn
			elevation="5"
			class="bg-blue text-white my-3 px-10 px-lg-16 text-lg-h6 py-3 h-auto rounded-pill"
			@click="submitReservationData"
			:disabled="times.length === 0"
			:loading="isLoading"
		>
			Buscar aulas disponibles</v-btn
		>
	</div>
	<div
		v-if="page === 'aulaOptions'"
		class="d-flex flex-wrap w-50 ga-5 justify-space-evenly wrapper mt-5"
	>
		<div
			v-if="aulaOptions.length === 0"
			class="d-flex flex-column align-items-center justify-content-evenly ga-5 mt-5"
		>
			<p class="w-100 text-center">
				No se encontraron resultados para la busqueda
			</p>
			<v-btn class="bg-blue" @click="restartForm()">Continuar</v-btn>
		</div>
		<v-card
			v-for="aula in aulaOptions"
			:key="aula.id"
			class="pa-5 d-flex flex-column elevation-3 rounded-lg mb-2"
		>
			<div
				class="text-center mb-2 d-flex flex-column align-items-center ga-3"
			>
				<h3>Aula {{ aula.name }}</h3>

				<div class="d-flex align-items-center ga-2 justify-center">
					<div
						class="d-flex align-center"
						v-if="aula.has_negatoscope"
					>
						<v-icon
							size="large"
							icon="mdi-radiology-box-outline"
						></v-icon>
					</div>
					<div class="d-flex align-center" v-if="aula.has_screen">
						<v-icon icon="mdi-projector-screen"></v-icon>
					</div>
					<div class="d-flex align-center">
						<v-icon icon="mdi-account"></v-icon>
						<p
							class="text-subtitle-2"
							style="vertical-align: middle; line-height: 100%"
						>
							{{ aula.max_capacity }}
						</p>
					</div>
				</div>
			</div>
			<v-btn
				class="px-14 h-auto rounded-pill py-2"
				color="blue"
				@click="reserveAula(aula.id)"
			>
				Reservar
			</v-btn>
		</v-card>
	</div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
	name: "ReservationView",
	data() {
		return {
			page: "",
			today: null,
			start_date: null,
			end_date: null,
			times: [7, 9],
			reservationData: {
				capacity: 0,
				has_screen: false,
				has_negatoscope: false,
				start_date: null,
				end_date: null,
				frequency: "none",
				start_time: null,
				end_time: null,
				user_category: "",
				title: "",
			},
			categories: [
				"Curso / Actividad / Capacitación avalada por la Dirección Hospital y/o CODEI HGAJAF",
				"Ateneo o reunión científica de división o departamento",
				"Capacitación / Actividad Residencia HGAJAF",
				"UBA",
				"Universidad Privada",
				"Tecnicatura cursada en HGAJAF",
				"Capacitación presentada a DIRCAP",
				"Capacitación otra organización autorizada",
			],
			aulaOptions: [],
			availableTimes: [
				"7",
				"7:30",
				"8",
				"8:30",
				"9",
				"9:30",
				"10",
				"10:30",
				"11",
				"11:30",
				"12",
				"12:30",
				"13",
				"13:30",
				"14",
				"14:30",
				"15",
				"15:30",
				"16",
				"16:30",
				"17",
				"17:30",
				"18",
				"18:30",
				"19",
			],
			frequencies: [
				{
					label: "No se repite",
					value: "none",
				},
				{
					label: "Diariamente",
					value: "daily",
				},
				{
					label: "Semanalmente",
					value: "weekly",
				},
				{
					label: "Mensualmente",
					value: "monthly",
				},
			],
			isLoading: false,
		};
	},
	mounted() {
		document.title = "Reservar un aula";
		const date = new Date();

		let month = "" + (date.getMonth() + 1),
			day = "" + date.getDate(),
			year = date.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		this.today = [year, month, day].join("-");
	},
	methods: {
		getText(value) {
			let output = "";
			if (value % 1 === 0) {
				output = `${value}:00`;
			} else {
				output = `${Math.floor(value)}:30`;
			}
			if (value < 10) {
				output = `0${output}`;
			}
			return output;
		},
		selectTime(timeStr) {
			if (this.times.findIndex((i) => i === timeStr) !== -1) {
				const index = this.times.findIndex((i) => i === timeStr);
				this.times.splice(index, 1);
			} else {
				this.times.push(timeStr);
			}
		},
		movePage(pagina) {
			this.page = pagina;
		},
		async submitReservationData() {
			this.isLoading = true;
			this.reservationData.start_date = this.formattedStart;
			if (this.reservationData.frequency === "none") {
				this.reservationData.end_date = this.formattedStart;
			} else {
				this.reservationData.end_date = this.formattedEnd;
			}
			this.reservationData.capacity = parseInt(
				this.reservationData.capacity
			);
			this.reservationData.start_time = this.getText(this.times[0]);
			this.reservationData.end_time = this.getText(this.times[1]);
			await axios
				.get("/api/v1/get-matching-aulas/", {
					params: this.reservationData,
					headers: {
						Authorization: `Token ${this.$store.state.token}`,
					},
					withCredentials: true,
				})
				.then((response) => {
					this.aulaOptions = response.data;
					this.aulaOptionsTime = new Date().getTime();
					this.movePage("aulaOptions");
				})
				.catch((error) => {
					console.log(error);
				});
			this.isLoading = false;
		},
		async reserveAula(id) {
			if (this.canSendRequest()) {
				let csrfToken = document.cookie.split("=")[1];
				await axios
					.post(
						"/api/v1/reservations/",
						{
							aula_id: id,
							user_id: this.$store.state.user.id,
							user_category: this.reservationData.user_category,
							start_date: this.reservationData.start_date,
							end_date: this.reservationData.end_date,
							start_time: this.reservationData.start_time,
							end_time: this.reservationData.end_time,
							frequency: this.reservationData.frequency,
							title: this.reservationData.title,
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
						this.$router.push("/mis-reservas");
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				Swal.fire({
					title: "La busqueda expiro",
					text: "Tiempo maximo: 5 minutos.",
					icon: "error",
					confirmButtonColor: "#3085d6",
					confirmButtonText: "Volver a intentar",
				}).then((result) => {
					if (result.isConfirmed) {
						this.restartForm();
					}
				});
			}
		},
		canSendRequest() {
			const fiveMinutesLater = this.aulaOptionsTime + 5 * 60 * 1000; // 5 minutes in milliseconds
			return new Date().getTime() <= fiveMinutesLater;
		},
		restartForm() {
			this.page = "";
			this.today = null;
			this.start_date = null;
			this.end_date = null;
			this.times = [];
			this.reservationData = {
				capacity: 0,
				has_screen: false,
				has_negatoscope: false,
				start_date: null,
				end_date: null,
				frequency: "none",
				times: [],
				user_category: "",
				title: "",
			};
		},
	},
	computed: {
		formattedStart() {
			if (!this.start_date) return null;

			const d = new Date(this.start_date);
			let month = "" + (d.getMonth() + 1);
			let day = "" + (d.getDate() + 1);
			const year = d.getFullYear();

			if (month.length < 2) month = "0" + month;
			if (day.length < 2) day = "0" + day;
			return [year, month, day].join("-");
		},
		formattedEnd() {
			if (!this.end_date) return null;
			const d = new Date(this.end_date);
			let month = "" + (d.getMonth() + 1);
			let day = "" + (d.getDate() + 1);
			const year = d.getFullYear();

			if (month.length < 2) month = "0" + month;
			if (day.length < 2) day = "0" + day;

			return [year, month, day].join("-");
		},
		tomorrow() {
			let date;
			if (this.formattedStart) {
				date = new Date(this.formattedStart);
				date.setDate(date.getDate() + 1);
			}
			return date ? date.toISOString().split("T")[0] : null;
		},
	},
};
</script>

<style scoped>
.timeBlockBtn {
	width: 45%;
}

@media screen and (min-width: 720px) {
	.wrapper {
		max-width: 60vw;
	}
}
</style>
