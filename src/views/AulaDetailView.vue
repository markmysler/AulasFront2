<template>
	<div class="columnItemsCenter my-4 w-100">
		<div class="d-flex w-100">
			<v-btn
				class="text-xs-caption text-subtitle-1 mt-2"
				prepend-icon="mdi-chevron-left"
				variant="text"
				@click="this.$router.push('/inicio/')"
				>Volver a inicio</v-btn
			>
		</div>
		<div v-if="aulaData" class="w-75">
			<div class="w-100 mt-3 d-flex flex-column align-center ga-2">
				<h3 class="text-h4 text-center">Aula {{ aulaData.name }}</h3>
				<div
					class="d-flex align-items-center ga-2 justify-center rounded-xl elevation-3 px-4 mb-2 py-1"
				>
					<div
						class="d-flex align-center"
						v-if="aulaData.has_negatoscope"
					>
						<v-icon size="large" icon="mdi-radiology-box"></v-icon>
					</div>
					<div class="d-flex align-center" v-if="aulaData.has_screen">
						<v-icon icon="mdi-projector-screen"></v-icon>
					</div>
					<div class="d-flex align-center">
						<v-icon icon="mdi-account"></v-icon>
						<p
							class="text-subtitle-1"
							style="vertical-align: middle; line-height: 100%"
						>
							{{ aulaData.max_capacity }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div v-if="timeblocks" class="d-flex flex-column align-center ga-3">
			<v-date-picker
				title="Seleccionar fecha"
				:min="yesterday"
				v-model="selectedDate"
				show-adjacent-months
			>
			</v-date-picker>
			<h3 class="mb-2 text-center">Bloques disponibles</h3>
			<div class="d-flex flex-wrap px-5 justify-center ga-5 px-6">
				<div
					v-for="block in availableTimes"
					:key="block"
					style="width: 40%; max-width: 250px"
					class="px-2 py-1 rounded-lg d-flex flex-column align-center justify-center"
					:class="
						filteredBlocks.findIndex(
							(b) => b.timeblock === block
						) === -1
							? 'bg-green'
							: 'bg-red'
					"
				>
					<p class="p-0 text-subtitle-1 text-center">
						{{ block.length > 2 ? block : `${block}:00` }}
					</p>
					<p
						v-if="
							filteredBlocks.findIndex(
								(b) => b.timeblock === block
							) !== -1
						"
						class="p-0 text-caption text-center"
					>
						{{
							filteredBlocks.find((b) => b.timeblock === block)
								.reservation_title
						}}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "AulaDetailView",
	data() {
		return {
			aulaData: null,
			aulaId: "",
			timeblocks: null,
			yesterday: new Date(),
			selectedDate: new Date(),
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
		};
	},
	methods: {
		async getAulaData(id) {
			await axios
				.get(`/api/v1/aulas/${id}/`, {
					headers: {
						Authorization: `Token ${this.$store.state.token}`,
					},
					withCredentials: true,
				})
				.then((response) => {
					this.aulaData = response.data.aula;
					this.timeblocks = response.data.calendar_blocks;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	mounted() {
		this.aulaId = this.$route.params.id;
		this.getAulaData(this.aulaId);
		this.yesterday.setDate(this.yesterday.getDate() - 1);
	},
	computed: {
		formatedSelectedDate() {
			const formatedDate = `${
				this.selectedDate.getMonth() + 1
			}-${this.selectedDate.getDate()}`;
			return formatedDate;
		},
		filteredBlocks() {
			let filtered = this.timeblocks.filter(
				(e) =>
					e.date_num ==
						parseInt(this.formatedSelectedDate.split("-")[1], 10) &&
					e.month ==
						parseInt(this.formatedSelectedDate.split("-")[0], 10)
			);
			return filtered;
		},
	},
};
</script>
